import { Router } from "express";
import {
  deleteUser
} from "../controllers/userController";

const router = Router();


router.delete("/users/:id", deleteUser);

export default router;