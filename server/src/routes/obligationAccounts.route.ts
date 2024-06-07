import { NextFunction, Request, Response, Router } from "express";
import { fetchByObligationRequestId } from "../controllers/obligationAccounts.controller";
const router = Router();

router.get(
  "/obligation-request/:obligation_request_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { obligation_request_id } = req.params;
      const result = await fetchByObligationRequestId(obligation_request_id);
      res.send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
