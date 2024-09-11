
import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
comment:{
    type:String,
 
},
product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
},
rating:{
    type:Number,
    min:0,
    max:5
}


},
   {
    timestamps: true,
    versionKey: false} 
) 
const Review = mongoose.model('Review', reviewSchema);

export default Review;
