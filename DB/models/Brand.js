import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter brand name"],
        trim: true,
        unique: [true, "Brand name should be unique"],
        minLength: [3, "Brand name should be at least 3 characters"],
        maxLength: [25, "Brand name should not be more than 25 characters"]
    },slug: {
        type: String,
        required: [true, "Please enter category name"],
       lowercase: true,
    },
   image: String,
createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    //required: [true, "Please provide user"],
   // ref: "User"
},
updatedBy: {
        type: mongoose.Schema.Types.ObjectId,


   // ref: "User"
}
},
{
    timestamps: true,
    versionKey: false
})



const Brand = mongoose.model('Brand', brandSchema);

export default Brand;