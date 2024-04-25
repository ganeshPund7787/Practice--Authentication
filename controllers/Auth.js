import { User } from "../models/models.user.js";
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error.handler.js";

export const isAutheticated = async (req, res, next) => {
    const { token } = req.cookies;
    try {
        if (!token) return next(errorHandler(400, "You should login first"))

        const data = jwt.verify(token, process.env.JWT_PASSWORD_KEY);
        req.user = await User.findById({ _id: data.id });
    } catch (error) {
        next(error);
    }

    next();
}