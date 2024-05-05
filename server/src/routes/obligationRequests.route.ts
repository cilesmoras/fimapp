import { Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  fetchOne,
  index,
  insert,
  remove,
  update,
} from "../controllers/obligationRequests.controller";
const router = Router();

const obligationRequestsSchema = z.object({
  serial_no: z.string().max(45),
  fund_cluster: z.string().max(10),
  payee: z.string().max(200),
  payee_office: z.string().max(200),
  payee_office_address: z.string().max(200),
  particulars: z.string().max(400),
  date: z.coerce.date(),
});

const validateInputs = validateFormInput(obligationRequestsSchema);

router.get("/", index);
router.get("/:id", fetchOne);
router.post("/", validateInputs, insert);
router.patch("/:id", validateInputs, update);
router.delete("/:id", remove);

export default router;
