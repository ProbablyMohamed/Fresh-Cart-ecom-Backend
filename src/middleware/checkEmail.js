import User from "../../DB/models/User.js";
import AppError from "../utils/AppError.js";

export const checkEmail = async (req, res, next) => {
    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) 
        return next(new AppError("Email already exists", 409));
        next()
    ;
}