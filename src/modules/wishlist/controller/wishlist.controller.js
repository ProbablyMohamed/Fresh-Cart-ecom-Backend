import AppError from "../../../utils/AppError.js";
import User from "../../../../DB/models/User.js";




export const addWishlist = async (req, res, next) => {
    try {
       const wishlist = await User.findByIdAndUpdate(req.user.id, {
       $addToSet: { wishlist: req.body.product }

       },{new:true});

wishlist|| next(new AppError("wishlist is empty", 404));
!wishlist||  res.status(200).json({ message: 'Success', wishlist: wishlist.wishlist, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};

export const RemoveFromWishlist = async (req, res, next) => {
    try {
       const wishlist = await User.findByIdAndUpdate(req.user.id, {
       $pull: { wishlist: req.params.id }

       },{new:true});

wishlist|| next(new AppError("wishlist is empty", 404));
!wishlist||  res.status(200).json({ message: 'Success', wishlist: wishlist.wishlist, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};



export const getUserWishlist = async (req, res, next) => {
    try {
       const wishlist = await User.findById(req.user.id).populate('wishlist');

wishlist|| next(new AppError("wishlist is empty", 404));
!wishlist||  res.status(200).json({ message: 'Success', wishlist: wishlist.wishlist, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};



