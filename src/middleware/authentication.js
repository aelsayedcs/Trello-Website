import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";


export const auth = asyncHandler(
    async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization) {
            return next(new Error(`authorization is required`, { cause: 401 }))
        }
        const decoded = jwt.verify(authorization, "ahmedcs99")
        if (!decoded.userId) {
            return next(new Error("In-valid token payload", { cause: 400 }))
        }
        const user = await userModel.findById(decoded.userId)
        if (!user) {
            return next(new Error("Not register account", { cause: 404 }))
        }
        req.user = user
        return next()
    }
)

export const logout = asyncHandler(
    
)

