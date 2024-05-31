import { NextFunction, Request, Response, Router } from "express";
import {
  createPap,
  deletePap,
  fetchOnePap,
  fetchPaps,
  updatePap,
} from "../controllers/pap.controller";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await fetchPaps();
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await fetchOnePap(id);
    return res.send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createPap(req.body);
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
      const result = await updatePap({ ...req.body, id });
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
      const result = await deletePap(id);
      return res.status(200).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
