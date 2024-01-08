import { asyncError } from "../middlewares/errorMiddleware.js";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";
import ErrorHandler from "../utils/ErrorHandler.js";


export const myProfile = (req, res, next) => {

    try {
        res.status(200).json({
            status: true,
            user: req.user,
        })
        
    } catch (error) {
        return next(new ErrorHandler("Not Logged In", 401));
    }
    

}

export const logout = (req, res, next) => {

    req.session.destroy((err) => {

        if (err) return next(err);

        res.clearCookie("connect.sid", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        });
        res.status(200).json({
            message: "Logged Out Successfully",
        })
    })

}


export const getAdminUsers = asyncError(async (req, res, next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})



export const getAdminStats = asyncError(async (req, res, next) => {

    const usersCount = await User.countDocuments();
    const orders = await Order.find({});

    const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing");
    const shippedOrders = orders.filter((i) => i.orderStatus === "Shipped");
    const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered");

    let totalIncome = 0;
    orders.forEach((i) => {
        totalIncome += i.totalAmount
    })


    res.status(200).json({
        success: true,
        usersCount,
        ordersCount: {
            total: orders.length,
            preparing: preparingOrders.length,
            shipped: shippedOrders.length,
            delivered: deliveredOrders.length,
        },
        totalIncome
    })
})