import jwt from "jsonwebtoken";
import User from "../../../DB/models/User.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt"
const signup = async (req, res, next) => {
try{
    let user = new User(req.body);
    await user.save();
   let token=jwt.sign({id:user._id},process.env.KEY);
    res.json({message:"User created successfully",token});
}catch( error){
    next(error);
}

}
const signin = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(new AppError("Invalid email or password", 401)); 
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return next(new AppError("Invalid email or password", 401)); 
        }

        let token = jwt.sign({ id: user._id }, process.env.KEY);
        return res.json({ message: "User signed in successfully", token });

    } catch (error) {
        return next(error); 
    }
};

const changeUserPassword = async (req, res, next) => {

try{
let user = await User.findOne({ email: req.body.email });
if(user && bcrypt.compareSync(req.body.oldPassword, user.password)){
    await User.findOneAndUpdate({ email: req.body.email },{password:req.body.newPassword,passwordChangedAt:Date.now()});
    let token = jwt.sign({ id: user._id }, process.env.KEY);
    return res.json({ message: "Password changed successfully", token });
}



}
catch (error) {
        return next(error); 
    }
}




const protectedRoutes = async (req, res, next) => {

    try{
   let {token}=req.headers
   let userPayload=null
   if(!token) return next(new AppError("Please provide Token", 401));
   jwt.verify(token,process.env.KEY,(err,payload)=>{
if (err) return next(new AppError(err, 401));
userPayload=payload
   })
 let user= await User.findById(userPayload.id)
 if(!user) return next(new AppError("User not found", 404));

if(user.passwordChangedAt){

let time=parseInt(user.passwordChangedAt.getTime()/1000)
if(time>userPayload.iat) return next(new AppError(" invalid token please login again", 401));
    }
req.user=user

next()


} catch (error) {
            return next(error); 
        }
    }
    const allowedTo = (...roles) => {
        return async (req, res, next) => {
          try {
            // Check if the user's role is included in the allowed roles
            if (roles.includes(req.user.role)) {
              return next(); // Proceed to the next middleware if the role is allowed
            }
            
            // Return a forbidden error if the user's role is not allowed
            return next(new AppError("Forbidden", 403)); // Status code for forbidden is usually 403
          } catch (error) {
            return next(error); // Pass any errors to the global error handler
          }
        };
      };
      






export {signup,signin,changeUserPassword,protectedRoutes,allowedTo}