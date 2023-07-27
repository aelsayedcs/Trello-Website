

export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return res.json({message:error.message,error,stack:error.stack})
        })
    }
}

export const globalErrorHandling=(error, req, res, next) => {
    return res.status(error.cause).json({ message: "Global Error", msgError: error.message, stack: error.stack })
}