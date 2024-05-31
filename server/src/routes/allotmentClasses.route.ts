import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import { validateFormInput } from "../../middlewares/validateFormInput";
import {
  createAllotmentClass,
  deleteAllotmentClass,
  fetchAllotmentClasses,
  fetchOneAllotmentClass,
  updateAllotmentClass,
} from "../controllers/allotmentClasses.controller";
const router = Router();

const schema = z.object({
  acronym: z.string().min(1).max(5),
  name: z.string().min(1).max(99),
});

const validateInputs = validateFormInput(schema);

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
router.post(
  "/",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { acronym, name } = req.body;
      const result = await createAllotmentClass({ acronym, name });
      return res.status(201).send(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.patch(
  "/:allotmentClassesId",
  validateInputs,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { allotmentClassesId } = req.params;
      const id = parseInt(allotmentClassesId);
      const { acronym, name } = req.body;
      const result = await updateAllotmentClass({ acronym, name, id });
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
