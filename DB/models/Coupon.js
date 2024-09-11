
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
code:{
    type:String,
    unique:true
},

discount:{
    type:Number
},
expire:{
    type:Date
},
},
{

    timestamps:true,
    versionKey:false,
}
)
const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon