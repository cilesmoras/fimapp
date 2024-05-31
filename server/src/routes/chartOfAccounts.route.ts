import { NextFunction, Request, Response, Router } from "express";
import {
  createChartOfAccount,
  deleteChartOfAccount,
  fetchChartOfAcccountsByAllotmentClassesId,
  fetchChartOfAccounts,
  fetchOneChartOfAccount,
  updateChartOfAccount,
} from "../controllers/chartOfAccounts.controller";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchChartOfAccounts();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get(
  "/allotment-classes/a/:allotmentClassesId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { allotmentClassesId } = req.params;
      const result = await fetchChartOfAcccountsByAllotmentClassesId(
        allotmentClassesId
      );
      return res.send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOneChartOfAccount(id);
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { allotment_classes_id, code, name } = req.body;
    const result = await createChartOfAccount({
      allotment_classes_id,
      code,
      name,
    });
    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch(
  "/:chartId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { chartId } = req.params;
      const id = parseInt(chartId);
      const { allotment_classes_id, code, name } = req.body;
      const result = await updateChartOfAccount({
        allotment_classes_id,
        code,
        name,
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
      const result = await deleteChartOfAccount(id);
      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
