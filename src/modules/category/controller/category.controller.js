import slugify from "slugify"
import Category from "../../../../DB/models/Category.js"
import mongoose from "mongoose"
import AppError from "../../../utils/AppError.js"
import fs from 'fs';
import path from 'path';
import ApiFeatures from "../../../utils/apiFeatures.js";

export const getCategories = async (req, res, next) => {
   try {
    let ApiFeature = new ApiFeatures(Category.find(),req.query)
    ApiFeature=ApiFeature.pagination().sort().fields().search().filter()
    const page=ApiFeature.page
    const limit=ApiFeature.limit
    
            const categories = await ApiFeature.mongooseQuery
        
       
       return categories.length ?
           res.status(200).json({ message: 'Success',pageNumber:page,size:limit, categories, status: 200 }) :
           next(new AppError('No category found', 404)); 
   } catch ( error) {
       next(error); 
   }
};


export const getCategory = async (req, res, next) => {
   try {
      const _id = req.params._id.trim(); 

      
      if (!mongoose.Types.ObjectId.isValid(_id)) {
          return res.status(400).json({ message: 'Invalid category ID', status: 400 });
      }

      const category = await Category.findById(_id);
      if (category) {
          return res.status(200).json({ message: 'Success', category, status: 200 });
      }
      return res.status(404).json({ message: 'No category found', status: 404 });
  } catch (error) {
      next(error); 
  }
};


export const addCategory =async (req, res, next) => {

try{
    const{name} = req.body


   const slug = slugify(name)

const category = await  Category.create( {name,slug,image:req.file?.filename})

return res.status(201).json({message: ' success',category,status:201})
}catch(error){
    next(new AppError('category already exist',400))

}
}







export const updateCategory = async (req, res, next) => {
    try {
       const _id = req.params._id.trim(); 
 
       
       if (!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(400).json({ message: 'Invalid category ID', status: 400 });
       }
 const{name} = req.body
 const slug = slugify(name)

       const category = await Category.findByIdAndUpdate(_id,{name,slug,image:req.file?.filename}, {new:true});
       if (category) {
           return res.status(200).json({ message: 'Success', category, status: 200 });
       }
       return res.status(404).json({ message: 'No category found', status: 404 });
   } catch (error) {
       next(error); 
   }
 };

export const deleteCategory = async (req, res, next) => {
    try {
       const _id = req.params._id.trim(); 
 
       
       if (!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(400).json({ message: 'Invalid category ID', status: 400 });
       }
 

       const category = await Category.findByIdAndDelete(_id);
       if (category) {
           return res.status(200).json({ message: 'Success', category, status: 200 });
       }
       return res.status(404).json({ message: 'No category found', status: 404 });
   } catch (error) {
       next(error); 
   }
 };
 
 