import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  fetchOneEmployee,
  updateEmployee,
} from "../controllers/employees.controller";
const router = Router();

const employeeSchema = z.object({
  prefix: z.string().max(10).optional(),
  first_name: z.string().max(45),
  mid_initial: z.string().max(5),
  last_name: z.string().max(45),
  suffix: z.string().max(10).optional(),
  job_title: z.string().max(45),
});

const validateInputs = validateFormInput(employeeSchema);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchEmployees();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOneEmployee(id);
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
    try {
      const { prefix, first_name, mid_initial, last_name, suffix, job_title } =
        req.body;
      const result = await createEmployee({
        prefix,
        first_name,
        mid_initial,
        last_name,
        suffix,
        job_title,
      });
      return res.status(201).json({
        status: "success",
        message: "Employee has been created.",
        data: result,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.patch(
  "/:employeeId",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prefix, first_name, mid_initial, last_name, suffix, job_title } =
        req.body;
      const { employeeId } = req.params;
      const id = parseInt(employeeId);
      const result = await updateEmployee({
        prefix,
        first_name,
        mid_initial,
        last_name,
        suffix,
        job_title,
        id,
      });
      return res.status(200).json({
        status: "success",
        message: "Employee has been updated.",
        data: result,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await deleteEmployee(id);
      return res.status(200).json({
        status: "success",
        message: "Employee has been deleted.",
        data: result,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
