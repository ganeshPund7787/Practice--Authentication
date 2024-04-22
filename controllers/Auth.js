import { User } from "../models/models.user.js";
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return res.json({ success: false, message: "you should login first" })

    const data = jwt.verify(token, process.env.JWT_PASSWORD_KEY);
    req.user = await User.findById({ _id: data.id });

    next();
}