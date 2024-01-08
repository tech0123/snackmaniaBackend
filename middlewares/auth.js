import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {

    const token = req.cookies['connect.sid'];

    if (!token) {
        return next(new ErrorHandler("Not Logged In", 401));
    }
    console.log(req.user._id)


    next();
}

export const authorizeAdmin = (req, res, next) => {

    console.log(req.user._id)
    if (req.user.role !== "admin") {
        return next(new ErrorHandler("Only Admin Allowed", 405));
    }

    next();
}
