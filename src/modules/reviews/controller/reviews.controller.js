import Review from "../../../../DB/models/Review.js";
import AppError from "../../../utils/AppError.js";

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find().populate('product');
        return reviews.length==0?
        next(new AppError('No review found', 404)):
        res.status(200).json({ message: 'Success', reviews, status: 200 });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

export const addReview = async (req, res, next) => {
    try {
        req.body.user=req.user._id
    const isExist = await Review.findOne({ user: req.user._id, product: req.body.product });
if (isExist) {
    return next(new AppError("You already reviewed this product", 409));
}

       const review= await Review.create(req.body);
       return res.status(201).json({ message: 'Success', review, status: 201 });
    } catch (error) {
      next(new AppError(error.message, 500));

    }
}

export const getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id).populate('product');
        return !review
            ? next(new AppError('No review found', 404))
            : res.status(200).json({ message: 'Success', review, status: 200 });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


export const updateReview = async (req, res, next) => {
    try {
const review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id}, req.body, {new:true});
return !review
?next(new AppError('No review found Or you are not authorized', 404))
:res.status(200).json({ message: 'Success', review, status: 200 });


    }
    catch (error) {
        next(new AppError(error.message, 500));}}



export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id},  {new:true});     
           return !review
            ? next(new AppError('No review found Or you are not authorized', 404)):
            res.status(200).json({ message: 'Success', review, status: 200 });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}