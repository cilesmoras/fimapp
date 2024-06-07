import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  createObligationAccounts,
  deleteObligationAccountsByObligationRequestId,
} from "../controllers/obligationAccounts.controller";
import {
  createObligationRequest,
  deleteObligationRequest,
  fetchObligationRequests,
  fetchOneObligationRequest,
  updateObligationRequest,
} from "../controllers/obligationRequests.controller";
import {
  createUtilizationStatus,
  deleteUtilizationStatusByObligationRequestId,
} from "../controllers/obligationUtilizationStatus.controller";
import connection from "../mysqlConnection";
import { ObligationAccounts } from "../types/obligationAccounts.types";
import { UtilizationStatus } from "../types/utilizationStatus.types";
const router = Router();

const obligationAccountsSchema = z.object({
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: z.coerce.number(),
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

const utilizationStatusSchema = z.object({
  date: z.string().min(1, { message: "Required" }),
  particulars: z.string().min(1, { message: "Required" }),
  ref_no: z.string().min(1, { message: "Required" }),
  utilization_amount: z.coerce.number({
    invalid_type_error: "Amount must be a number",
  }),
  payable: z.coerce.number({ invalid_type_error: "Payable must be a number" }),
  payment: z.coerce.number({ invalid_type_error: "Payment must be a number" }),
});

const obligationRequestSchema = z.object({
  serial_no: z.string().min(1).max(45),
  fund_cluster: z.string().min(1).max(10),
  payee: z.string().min(1).max(200),
  payee_office: z.string().min(1).max(200),
  payee_office_address: z.string().max(200),
  particulars: z.string().min(1).max(400),
  date: z.string(),
  obligation_accounts: z.array(obligationAccountsSchema).nonempty(),
  utilization_status: z.array(utilizationStatusSchema).nonempty(),
});

const validateInputs = validateFormInput(obligationRequestSchema);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchObligationRequests();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOneObligationRequest(id);
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// create obligation request
router.post(
  "/",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    const pool = await connection.getConnection();
    try {
      const {
        serial_no,
        fund_cluster,
        payee,
        payee_office,
        payee_office_address,
        particulars,
        date,
        obligation_accounts,
        utilization_status,
      } = req.body;
      // begin the transaction
      pool.beginTransaction();
      // insert the obligation quest
      const resultObligationRequest = await createObligationRequest(
        {
          serial_no,
          fund_cluster,
          payee,
          payee_office,
          payee_office_address,
          particulars,
          date,
        },
        pool
      );

      // inserting the obligation accounts
      let resultObligationAccounts = {};
      obligation_accounts.forEach(async (data: ObligationAccounts) => {
        resultObligationAccounts = await createObligationAccounts(
          data,
          pool,
          resultObligationRequest.insertId
        );
      });
      // insert the utilization status
      let resultUtilizationStatus = {};
      utilization_status.forEach(async (data: UtilizationStatus) => {
        resultUtilizationStatus = await createUtilizationStatus(
          data,
          pool,
          resultObligationRequest.insertId
        );
      });

      pool.commit();
      res.status(201).json({
        status: "success",
        message: "ORS has been created",
        data: {
          resultObligationRequest,
          resultObligationAccounts,
          resultUtilizationStatus,
        },
      });
    } catch (error) {
      pool.rollback();
      console.error("Query error:", error);
      next(error);
    } finally {
      connection.releaseConnection(pool);
    }
  }
);

// update obligation request
router.patch(
  "/:obligationRequestId",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    const pool = await connection.getConnection();

    try {
      const { obligationRequestId } = req.params;
      const id = parseInt(obligationRequestId);
      const {
        serial_no,
        fund_cluster,
        payee,
        payee_office,
        payee_office_address,
        particulars,
        date,
        obligation_accounts,
        utilization_status,
      } = req.body;

      // begin the transaction
      pool.beginTransaction();
      // update the obligation quest
      const resultObligationRequest = await updateObligationRequest(
        {
          serial_no,
          fund_cluster,
          payee,
          payee_office,
          payee_office_address,
          particulars,
          date,
          id,
        },
        pool
      );

      // deleting all obligation accounts by obligation request id
      await deleteObligationAccountsByObligationRequestId(id);
      // insert again the new data
      let resultObligationAccounts = {};
      obligation_accounts.forEach(async (data: ObligationAccounts) => {
        resultObligationAccounts = await createObligationAccounts(
          data,
          pool,
          id
        );
      });

      // deleting all utilization status first and insert
      await deleteUtilizationStatusByObligationRequestId(id);
      // insert the utilization status
      let resultUtilizationStatus = {};
      utilization_status.forEach(async (data: UtilizationStatus) => {
        resultUtilizationStatus = await createUtilizationStatus(data, pool, id);
      });

      pool.commit();
      res.status(200).json({
        status: "success",
        message: "ORAS has been updated",
        data: {
          resultObligationRequest,
          resultObligationAccounts,
          resultUtilizationStatus,
        },
      });
    } catch (error) {
      pool.rollback();
      console.error("Query error:", error);
      next(error);
    } finally {
      connection.releaseConnection(pool);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await deleteObligationRequest(Number(id));
      if (!result) {
        res
          .status(404)
          .json({ status: "error", message: "Resource not found." });
      }

      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
