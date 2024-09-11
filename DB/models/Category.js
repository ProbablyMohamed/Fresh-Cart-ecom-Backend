import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        trim: true,
        unique: [true, "Category name should be unique"],
        minLength: [3, "Category name should be at least 3 characters"],
        maxLength: [25, "Category name should not be more than 25 characters"]
    },
    slug: {
        type: String,
        required: [true, "Please enter category name"],
       lowercase: true,
    },
   image: String,
createdBy: {
    //type: Types.ObjectId,
    //required: [true, "Please provide user"],
   // ref: "User"
},
updatedBy: {
    //type: Types.ObjectId,

   // ref: "User"
}
},
{
    timestamps: true,
    versionKey: false
})

categorySchema.post('init',(doc)=>{

if(doc.image){

    doc.image='http://localhost:3000/uploads/category/'+ doc.image
}

  
})

const Category = mongoose.model('Category', categorySchema);

export default Category;