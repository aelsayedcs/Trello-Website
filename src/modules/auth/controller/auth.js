import jwt from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import bcrypt from 'bcryptjs'


export const signup = asyncHandler(
    async (req, res, next) => {
        const { userName, email, password, age, gender, phone } = req.body;
        const userCheck = await userModel.findOne({ email })
        if (userCheck) {
            return next(new Error("Email exits", { cause: 400 }))
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = await userModel.create(
            { userName, email, password: hashPassword, age, gender, phone }
        )
        return res.status(201).json({ message: "Done", user })
    }
)

export const login = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select(' email password userName')
        if (user) {
            const matchPassword = bcrypt.compareSync(password, user.password)
            if (matchPassword) {
                const token = jwt.sign(
                    { userName: user.userName, userId: user._id },
                    "ahmedcs99",
                    { expiresIn: 60 * 60 * 24 }
                )
                return res.status(200).json({ message: "Login Successfully", user, tokenNum: { token } })
            }
        }

        return next(new Error(`Email or Password is incorrect`, { cause: 404 }))
    }
)