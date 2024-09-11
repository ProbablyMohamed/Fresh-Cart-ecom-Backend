import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Sub-category name"],
        trim: true,
        unique: [true, "Sub-category name should be unique"],
        minLength: [3, "Sub-category name should be at least 3 characters"],
        maxLength: [25, "Sub-category name should not be more than 25 characters"]
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
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    //required: [true, "Please provide category"],
    ref: "Category"
}
},
{
    timestamps: true,
    versionKey: false
})



const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;