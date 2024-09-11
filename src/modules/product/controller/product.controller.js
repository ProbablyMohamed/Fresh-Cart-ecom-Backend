import slugify from "slugify";
import Product from "../../../../DB/models/Product.js";
import mongoose from "mongoose";
import AppError from "../../../utils/AppError.js";
import ApiFeatures from "../../../utils/apiFeatures.js";


export const getProducts = async (req, res, next) => {
   try {

let ApiFeature = new ApiFeatures(Product.find(),req.query)
ApiFeature=ApiFeature.pagination().sort().fields().search().filter()
const page=ApiFeature.page
const limit=ApiFeature.limit

        const products = await ApiFeature.mongooseQuery.populate(
            [
                { path: 'category',
        
                 },
                { path: 'subCategory',  },
                { path: 'brand',},
            ]
        );

       return products.length>0
        ?  res.status(200).json({ message: 'Success',pageNumber:page,size:limit, products, status: 200 })
         :next(new AppError('No product found', 404)); 
   } catch (error) {
       next(error); 
   }
};

export const getProduct = async (req, res, next) => {
   try {
      const _id = req.params._id.trim(); 

      if (!mongoose.Types.ObjectId.isValid(_id)) {
          return res.status(400).json({ message: 'Invalid product ID', status: 400 });
      }

      const product = await Product.findById(_id).populate([
        { path: 'category',  },
        { path: 'subCategory',  },
        { path: 'brand',},
    ]);;
      if (product) {
          return res.status(200).json({ message: 'Success', product, status: 200 });
      }
      return res.status(404).json({ message: 'No product found', status: 404 });
  } catch (error) {
      next(error); 
  }
};

export const addProduct = async (req, res, next) => {
    try {
      
        req.body.mainImage = req.files.mainImage[0].filename
      req.body.coverImage=(req.files.coverImage.map(element=>element.filename))
     
req.body.slug = slugify(req.body.title)
        const product = await Product.create(req.body);
       return res.status(201).json({ message: 'Success', product, status: 201 });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
if(req.files?.mainImage?.length){
    req.body.mainImage = req.files?.mainImage[0]?.filename

}
        req.body.coverImage=(req.files?.coverImage?.map(element=>element.filename))
       
       const _id = req.params._id.trim(); 

       if (!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(400).json({ message: 'Invalid product ID', status: 400 });
       }
       req.body.slug = slugify(req.body.title)
       const product = await Product.findByIdAndUpdate(_id, req.body, { new: true });
       if (product) {
           return res.status(200).json({ message: 'Success', product, status: 200 });
       }
       return res.status(404).json({ message: 'No product found', status: 404 });
   } catch (error) {
       next(error); 
   }
};

export const deleteProduct = async (req, res, next) => {
    try {
       const _id = req.params._id.trim(); 

       if (!mongoose.Types.ObjectId.isValid(_id)) {
           return res.status(400).json({ message: 'Invalid product ID', status: 400 });
       }

       const product = await Product.findByIdAndDelete(_id);
       if (product) {
           return res.status(200).json({ message: 'Success', product, status: 200 });
       }
       return res.status(404).json({ message: 'No product found', status: 404 });
   } catch (error) {
       next(error); 
   }
};
