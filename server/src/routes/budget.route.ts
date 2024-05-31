import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  createBudget,
  deleteBudget,
  fetchBudget,
  fetchOneBudget,
  updateBudget,
} from "../controllers/budget.controller";
const router = Router();

const budgetSchema = z.object({
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: z.number(),
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

const validateInputs = validateFormInput(budgetSchema);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchBudget();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOneBudget(id);
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
      const result = await createBudget(req.body);
      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.patch(
  "/:id",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await updateBudget({ ...req.body, id });
      return res.status(200).send(result);
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
      const result = await deleteBudget(id);
      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
