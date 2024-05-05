import { Router } from "express";
import {
  fetchByAllotmentClassesId,
  fetchOne,
  index,
  insert,
  remove,
  update,
} from "../controllers/chartOfAccounts.controller";

const router = Router();

router.get("/", index);
router.get(
  "/allotment-classes/a/:allotmentClassesId",
  fetchByAllotmentClassesId
);
router.get("/:id", fetchOne);
router.post("/", insert);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
