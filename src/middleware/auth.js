
import AppError from "../utils/AppError.js"
import jwt from "jsonwebtoken"
import roles from "../types/roles.js"
export const authentication = (req, res, next) => {
const auth=req.headers.authorization
if(!auth){
    return next(new AppError("Unauthorized",401))
}
const token=auth.split(' ')[1]
const decoded=jwt.verify(token,process.env.KEY)
if(!decoded){
    return next(new AppError("Unauthorized",401))
}

req.user=decoded;
next()



}
export const authorization = (requiredRoles) => {
    return (req, res, next) => {
        // Ensure req.user is defined
        if (!req.user) {
            return next(new AppError("Unauthorized", 401));
        }
        // Check if user's role is in the allowed roles
        if (!requiredRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden", 403));
        }
        next();
    };
};