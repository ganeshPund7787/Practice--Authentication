import { User } from "../models/models.user.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken"


export const resisteruser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const isExist = await User.findOne({ email })

        if (isExist) return next(errorHandler(404, "User already Exist"));

        const hashPassword = bcryptjs.hashSync(password, 10);

        await User.create({ name, email, password: hashPassword });

        res.status(201).json({
            message: "user Resister successfuly"
        })
    } catch (error) {
        next(error);
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return next(errorHandler(400, "user is not exist"));

        const isPasswordMatch = bcryptjs.compareSync(password, user.password);

        if (!isPasswordMatch) return next(errorHandler(404, "Wrong Password"));
        // cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_PASSWORD_KEY);

        res.cookie('token', token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
            .json({
                message: "User login successfuly"
            })

    } catch (error) {
        next(error);
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token").json({
            message: "User logout successfuly"
        });
    } catch (error) {
        next(error)
    }
}

export const getProfile = (req, res) => {

    const { user } = req

    const { password, ...rest } = user._doc;
    console.log(rest);

    res.status(200).json(rest)
}


export const updateUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) {
        return next(errorHandler(400, "You can update only your account"))
    }
    try {
        const { id } = req.params
        if (req.body.email) {
            const user = await User.findOne({ email: req.body.email })
            if (user)
                return next(errorHandler(400, "email already taken"))
        }

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc

        res.status(200).json({ message: "User updated successfully", rest })

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id !== req.user.id) {
        return next(errorHandler(400, "You can delete only your account"))
    }
    try {
        const { id } = req.params
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        next(error)
    }

}


