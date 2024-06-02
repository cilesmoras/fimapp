import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import { createObligationAccounts } from "../controllers/obligationAccounts.controller";
import {
  createObligationRequest,
  fetchObligationRequests,
  fetchOneObligationRequest,
} from "../controllers/obligationRequests.controller";
import { createUtilizationStatus } from "../controllers/obligationUtilizationStatus.controller";
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
      const obligationRequestId = await createObligationRequest(
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
      obligation_accounts.forEach(async (data: ObligationAccounts) => {
        await createObligationAccounts(data, pool, obligationRequestId);
      });
      // insert the utilization status
      utilization_status.forEach(async (data: UtilizationStatus) => {
        await createUtilizationStatus(data, pool, obligationRequestId);
      });

      pool.commit();
      // add the obligation account and utilization status insert function
    } catch (error) {
      pool.rollback();
      console.error("Query error:", error);
      next(error);
    } finally {
      connection.releaseConnection(pool);
    }
  }
);

// router.patch("/:id", validateInputs, update);

// router.delete("/:id", remove);

export default router;
