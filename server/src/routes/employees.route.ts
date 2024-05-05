import { Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  fetchOne,
  index,
  insert,
  remove,
  update,
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

router.get("/", index);
router.get("/:id", fetchOne);
router.post("/", validateInputs, insert);
router.patch("/:id", validateInputs, update);
router.delete("/:id", remove);

export default router;
