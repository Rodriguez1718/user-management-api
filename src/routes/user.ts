import { Router } from "express";
import {
  deleteUser,
  createUser
} from "../controllers/userController";

const router = Router();


router.delete("/users/:id", deleteUser);

export default router;

router.post("/users", createUser);


export default router;
