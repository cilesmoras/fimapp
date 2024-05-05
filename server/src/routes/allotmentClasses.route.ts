import { Router } from "express";
import {
  fetchOne,
  index,
  insert,
  remove,
  update,
} from "../controllers/allotmentClasses.controller";
const router = Router();

router.get("/", index);
router.get("/:id", fetchOne);
router.post("/", insert);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;
