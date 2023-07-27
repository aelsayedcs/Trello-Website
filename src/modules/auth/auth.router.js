
import * as authController from './controller/auth.js'

import { Router } from "express";

const router = Router();

router.post("/signup",authController.signup)
router.get("/login",authController.login)

export default router;