import { Router } from "express";
import { fetchByObligationRequestId } from "../controllers/obligationAccounts.controller";
const router = Router();

router.get(
  "/obligation-request/:obligation_request_id",
  fetchByObligationRequestId
);

export default router;
