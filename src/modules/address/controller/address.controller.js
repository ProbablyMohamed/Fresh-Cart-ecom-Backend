import AppError from "../../../utils/AppError.js";
import User from "../../../../DB/models/User.js";




export const addAddress = async (req, res, next) => {
    try {
      
        const address = await User.findByIdAndUpdate(
            req.user.id,
            { $addToSet: { addresses: req.body } },
            { new: true, projection: { addresses: 1 } } 
        );

        if (!address) {
            return next(new AppError("Address is empty", 404));
        }

        res.status(201).json({ message: 'Success', address: address.addresses });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};



export const RemoveAddress = async (req, res, next) => {
    try {
       const address = await User.findByIdAndUpdate(req.user.id, {
       $pull: { addresses: { _id: req.params.id} }

       },{new:true});

address|| next(new AppError("address is empty", 404));
!address||  res.status(200).json({ message: 'Success', address: address.addresses, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};



export const getUserAddress = async (req, res, next) => {
    try {
       const address = await User.findById(req.user.id);

address|| next(new AppError("address is empty", 404));
!address||  res.status(200).json({ message: 'Success', address: address.addresses, status: 201 });
    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};



