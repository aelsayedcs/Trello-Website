import { Router } from "express"
import * as userController from "./controller/user.js"
import { auth, logout } from "../../middleware/authentication.js"

const router = Router()

router.get('/', userController.getUsers)
router.get('/userId',auth, userController.getUserbyId)
router.patch('/',auth,userController.changePassword)
router.put('/',auth,userController.updateUser)
router.delete('/',auth,userController.deleteUser)

export default router