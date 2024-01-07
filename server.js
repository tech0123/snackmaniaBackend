import app from './app.js'
import { connectToMongo } from './config/db.js';
import Razorpay from "razorpay";

connectToMongo();

export const instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_API_SECRET })

app.get("/", (req, res, next) => {
    res.send("Working");
})

app.listen(process.env.PORT, () => console.log(`Server is Working on PORT: ${process.env.PORT}, IN ${process.env.NODE_ENV} MODE`));