import { NextFunction, Request, Response, Router } from "express";
import {
  createAllotmentClass,
  deleteAllotmentClass,
  fetchAllotmentClasses,
  fetchOneAllotmentClass,
  updateAllotmentClass,
} from "../controllers/allotmentClasses.controller";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchAllotmentClasses();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOneAllotmentClass(id);
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createAllotmentClass(req.body);
    return res.status(201).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.patch(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await updateAllotmentClass({ ...req.body, id });
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
      const result = await deleteAllotmentClass(id);
      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
