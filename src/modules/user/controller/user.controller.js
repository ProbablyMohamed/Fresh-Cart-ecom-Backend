import AppError from "../../../utils/AppError.js";
import User from"../../../../DB/models/User.js"




const addUser = async (req, res, next) => {
    try {
       let user= new User(req.body);
       await user.save();
       res.json({message :"User created successfully",user})

    } catch (error) {
        next(new AppError("User not found", 404));
    }
};

const allUsers=async(req,res,next)=>{
    try {
        const users=await User.find();
        res.json({message:"All users",users})
    } catch (error) {
        next( new AppError("User not found", 404));
    }
}



const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
       user|| next(new AppError("User not found", 404));
       !user|| res.json({message:"User found",user})
    } catch (error) {
        next(error);
    }
};


const updateUser = async (req, res, next) => {
    try {
   let user = await User.findByIdAndUpdate(req.params.id,req.body ,{new:true});
   user|| next(new AppError("User not found", 404));
   !user|| res.json({message:"User updated successfully",user})
    } catch (error) {
        next(error);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);               
        user|| next(new AppError("User not found", 404));
        !user|| res.json({message:"User deleted successfully",user})
    } catch (error) {
        next(error);
    }
};
export { addUser,allUsers,getUser,updateUser,deleteUser }