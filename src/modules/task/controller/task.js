
import taskModel from '../../../../DB/model/Task.model.js';
import userModel from '../../../../DB/model/User.model.js';
import { asyncHandler } from '../../../utils/errorHandling.js'

export const getTask = asyncHandler(
    async (req, res, next) => {
        const task = await taskModel.find().populate([
            {
                path: "assignTo",
                select: "email userName"
            },
            {
                path: "userId",
                select: "email userName"
            }
        ]);
        return res.status(200).json({ message: "Done", task })
    }
)

export const getSpecUserTasks = asyncHandler(
    async (req, res, next) => {
        const task = await taskModel.find({ assignTo: req.user.id }).populate([
            {
                path: "userId",
                select: "email userName"
            },
            {
                path: "assignTo",
                select: "email userName"
            }
        ]).select(`-_id title description status createdAt`)
        return res.status(200).json({ message: "Done", task })
    }
)

export const getUserTasks = asyncHandler(
    async (req, res, next) => {
        const { assignTo } = req.body;

        const task = await taskModel.find({ assignTo }).populate([
            {
                path: "userId",
                select: "email userName"
            },
            {
                path: "assignTo",
                select: "email userName"
            }
        ]).select(`-_id title description status createdAt`)
        return res.status(200).json({ message: "Done", task })
    }
)
export const addTask = asyncHandler(
    async (req, res, next) => {
        const { title, description, status, assignTo, deadline } = req.body;
        const userCheck = await userModel.findById({ _id: assignTo }).select(`userName email`);
        if (!userCheck) {
            return next(new Error(`User not found`, { cause: 404 }))
        }
        const task = await taskModel.create({ title, description, status, userId: req.user.id, assignTo, deadline })
        return res.status(201).json({ message: "Done", taskDetails: task, assignUser: userCheck })
    }
)
export const updateTask = asyncHandler(
    async (req, res, next) => {
        const { taskId } = req.params;
        const { title, description, status, assignTo } = req.body;
        const taskCheck = await taskModel.findOne({ userId: req.user.id })
        if (!taskCheck) {
            return next(new Error(`You aren't authorize to update`, { cause: 403 }))
        }
        const taskIdCheck = await taskModel.findById(taskId);
        if (!taskIdCheck) {
            return next(new Error(`Incorrect Post ID`, { cause: 404 }))
        }
        const task = await taskModel.findByIdAndUpdate(taskId, { title, description, status, assignTo })
        return res.status(200).json({ message: "Done", task })

    }
)

export const deletePost = asyncHandler(
    async (req, res, next) => {
        const { taskId } = req.params;
        const taskCheck = await taskModel.findOne({ userId: req.user.id })
        if (!taskCheck) {
            return next(new Error(`You aren't authorize to delete`, { cause: 403 }))
        }
        const task = await taskModel.findByIdAndDelete(taskId)
        return !task ? res.json({ message: "Post Not Found" }) : res.status(200).json({ message: "Done", task })

    }
)

