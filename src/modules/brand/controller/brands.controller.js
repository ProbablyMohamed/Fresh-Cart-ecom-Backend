import slugify from "slugify";
import Brand from "../../../../DB/models/Brand.js";
import mongoose from "mongoose";
import AppError from "../../../utils/AppError.js";

export const getBrands = async (req, res, next) => {
    try {
        const brands = await Brand.find();
        
        if (!brands.length) {
            return next(new AppError('No brand found', 404));
        }
        
        return res.status(200).json({ message: 'Success', brands, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const getBrand = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid brand ID', status: 400 });
        }

        const brand = await Brand.findById(_id.trim());
        if (!brand) {
            return res.status(404).json({ message: 'No brand found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', brand, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const addBrand = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Brand name is required', status: 400 });
        }

        const slug = slugify(name);
        const brand = await Brand.create({ name, slug });

        return res.status(201).json({ message: 'Success', brand, status: 201 });
    } catch (error) {
        next(error); 
    }
};

export const updateBrand = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const { name } = req.body;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid brand ID', status: 400 });
        }

        if (!name) {
            return res.status(400).json({ message: 'Brand name is required', status: 400 });
        }

        const slug = slugify(name);
        const brand = await Brand.findByIdAndUpdate(_id.trim(), { name, slug }, { new: true });

        if (!brand) {
            return res.status(404).json({ message: 'No brand found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', brand, status: 200 });
    } catch (error) {
        next(error); 
    }
};

export const deleteBrand = async (req, res, next) => {
    try {
        const { _id } = req.params;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id.trim())) {
            return res.status(400).json({ message: 'Invalid brand ID', status: 400 });
        }

        const brand = await Brand.findByIdAndDelete(_id.trim());

        if (!brand) {
            return res.status(404).json({ message: 'No brand found', status: 404 });
        }

        return res.status(200).json({ message: 'Success', brand, status: 200 });
    } catch (error) {
        next(error); 
    }
};
