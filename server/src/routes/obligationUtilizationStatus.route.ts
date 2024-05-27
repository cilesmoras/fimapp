import { Router } from "express";
import { fetchByObligationRequestId } from "../controllers/obligationUtilizationStatus.controller";
const router = Router();

router.get(
  "/obligation-request/:obligation_request_id",
  fetchByObligationRequestId
);

export default router;
