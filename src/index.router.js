import userRouter from "./modules/user/user.routing.js";
import taskRouter from "./modules/task/task.router.js";
import authRouter from "./modules/auth/auth.router.js";
import connectDB from "../DB/connection.js";
import { globalErrorHandling } from "./utils/errorHandling.js";


const bootstrap = (app, express) => {
    connectDB();

    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/task', taskRouter);
    app.use('*', (req, res) => res.json({ message: "Invalid Routing" }))
    app.use(globalErrorHandling)

}


export default bootstrap;