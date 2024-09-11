import slugify from "slugify";
import SubCategory from "../../../../DB/models/SubCategory.js";
import mongoose from "mongoose";
import AppError from "../../../utils/AppError.js";

export const getSubCategories = async (req, res, next) => {
    try {

        
        const subCategories = await SubCategory.find({category:req.params._id}).populate('category');
        
        if (!subCategories.length) {
            return next(new AppError('No sub-category found', 404));
        }
        
        return res.status(200).json({ message: 'Success', subCategories, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const getSubCategory = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid sub-category ID', status: 400 });
        }

        const subCategory = await SubCategory.findById(_id.trim()).populate('category');
        if (!subCategory) {
            return res.status(404).json({ message: 'No sub-category found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', subCategory, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const addSubCategory = async (req, res, next) => {
    try {
        const { name,category } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: 'Sub-category name and category is required', status: 400 });
        }

        const slug = slugify(name);
        const subCategory = await SubCategory.create({ name, slug , category });

        return res.status(201).json({ message: 'Success', subCategory, status: 201 });
    } catch (error) {
        next(error); 
    }
};

export const updateSubCategory = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { name } = req.body;  


        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid sub-category ID', status: 400 });
        }

        if (!name) {
            return res.status(400).json({ message: 'Sub-category name is required', status: 400 });
        }

        req.body.slug = slugify(name);
        const subCategory = await SubCategory.findByIdAndUpdate(_id.trim(), req.body, { new: true });

        if (!subCategory) {
            return res.status(404).json({ message: 'No sub-category found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', subCategory, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const deleteSubCategory = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid sub-category ID', status: 400 });
        }

        const subCategory = await SubCategory.findByIdAndDelete(_id.trim());

        if (!subCategory) {
            return res.status(404).json({ message: 'No sub-category found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', subCategory, status: 200 });
    } catch (error) {
        next(error); 
    }
};
