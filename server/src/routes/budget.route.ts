import { Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  fetchOne,
  index,
  insert,
  remove,
  update,
} from "../controllers/budget.controller";
const router = Router();

const budgetSchema = z.object({
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: z.number(),
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

const validateInputs = validateFormInput(budgetSchema);

router.get("/", index);
router.get("/:id", fetchOne);
router.post("/", validateInputs, insert);
router.patch("/:id", validateInputs, update);
router.delete("/:id", remove);

export default router;
