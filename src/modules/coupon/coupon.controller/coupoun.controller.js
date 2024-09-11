import Coupon from "../../../../DB/models/Coupon.js";
import AppError from "../../../utils/AppError.js";

export const getCoupons = async (req, res, next) => {
 try{
    const coupons = await Coupon.find()
   return coupons.length==0
   ? next(new AppError("No coupon found", 404))
   :res.status(200).json({message:"Success",coupons,status:200})



 }
 catch(error){

 }
}



export const addCoupon = async (req, res, next) => {
    try {
        const exist = await Coupon.findOne({ code: req.body.code });
        if (exist)
            return next(new AppError("Coupon already exists", 409));

        const coupon = await Coupon.create(req.body);
        return res.status(201).json({ message: "Success", coupon, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500));
        
    }
}

export const updateCoupon = async (req, res, next) => {
try {
    const coupon= await Coupon.findByIdAndUpdate(req.params.id,req.body,{new:true})
return !coupon?
next(new AppError("Coupon not found", 404))
:res.status(200).json({message:"Success",coupon,status:200})


} catch (error) {
    next(new AppError(error.message, 500));
}
}
export const deleteCoupon = async (req, res, next) => {
try {
    const coupon= await Coupon.findByIdAndDelete(req.params.id)
return !coupon?
next(new AppError("Coupon not found", 404))
:res.status(200).json({message:"Success",coupon,status:200})


} catch (error) {
    next(new AppError(error.message, 500));
}
}










