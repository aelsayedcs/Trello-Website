import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import bcrypt from 'bcryptjs'
import mongooseDelete from "mongoose-delete"

export const getUsers = asyncHandler(
    async (req, res, next) => {
        const users = await userModel.find()
        return res.json({ message: "Done", users })
    }
)
export const getUserbyId = asyncHandler(
    async (req, res, next) => {
        const user = await userModel.findById(req.user._id).select(`email password userName`)
        return res.json({ message: "Done", user: user })
    }
)

export const changePassword = asyncHandler(
    async (req, res, next) => {
        const { newPassword } = req.body;
        const hashPassword = bcrypt.hashSync(newPassword, 7)
        const user = await userModel.findByIdAndUpdate(req.user._id, { password: hashPassword })
        return res.status(200).json({ message: "Changed Successfully", user })

    }
)

export const updateUser = asyncHandler(
    async (req, res, next) => {
        const { age, userName } = req.body;
        const user = await userModel.findByIdAndUpdate(req.user._id, { age, userName })
        return res.status(200).json({ message: "Updated Successfully", user })
    }
)

export const deleteUser = asyncHandler(
    async (req, res, next) => {
        const { isDeleted } = req.body
        if (!isDeleted) {
            const userCheck = await userModel.findById(req.user._id)
            return res.status(200).json({ message: "Soft Deleted", userCheck })
        }
        const user = await userModel.findByIdAndDelete(req.user._id)
        return res.status(200).json({ message: "Deleted Successfully", user })
    }
)

