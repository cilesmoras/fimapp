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
      const { mfo_paps_id, chart_of_accounts_id, amount } = req.body;
      const result = await createBudget({
        mfo_paps_id,
        chart_of_accounts_id,
        amount,
      });
      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.patch(
  "/:budgetId",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { budgetId } = req.params;
      const id = parseInt(budgetId);
      const { mfo_paps_id, chart_of_accounts_id, amount } = req.body;
      const result = await updateBudget({
        mfo_paps_id,
        chart_of_accounts_id,
        amount,
        id,
      });
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
