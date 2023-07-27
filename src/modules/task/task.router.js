

import { auth } from "../../middleware/authentication.js";
import * as taskController from "./controller/task.js"

import { Router } from "express";

const router = Router();

router.get("/", taskController.getTask)
router.get("/specUser", auth,taskController.getSpecUserTasks)
router.get("/getUserTasks",auth, taskController.getUserTasks)

router.post("/", auth, taskController.addTask)
router.put("/:taskId", auth,taskController.updateTask)
router.delete("/:taskId", auth,taskController.deletePost)

export default router;