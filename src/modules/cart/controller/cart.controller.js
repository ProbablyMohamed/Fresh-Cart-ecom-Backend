import AppError from "../../../utils/AppError.js";
import User from "../../../../DB/models/User.js";
import { Cart } from "../../../../DB/models/Cart.js";
import Product from "../../../../DB/models/Product.js";
import Coupon from "../../../../DB/models/Coupon.js";
function calculateTotalPrice(isCartExist) {
    const totalCartPrice = isCartExist.cartItems.reduce((prev, item) => {
        return prev + item.price * item.quantity;
    }, 0);
    
    isCartExist.totalCartPrice = totalCartPrice;
    if(isCartExist.discount){
    isCartExist.totalCartPriceAfterDiscount= isCartExist.totalCartPrice-(isCartExist.totalCartPrice*isCartExist.discount)/100
    }
}


export const addToCart = async (req, res, next) => {
    try {
const isCartExist = await Cart.findOne({ user: req.user._id });
const product=await Product.findById(req.body.product)
if(!product) return next(new AppError("Product not found",404))

req.body.price=product.price
if(req.body.quantity>product.stock) return next(new AppError(" Available stock is only "+product.stock+" ",400))



if (!isCartExist){
    const cart=new Cart({
        user: req.user._id,
        cartItems:[req.body]
    })
    calculateTotalPrice(cart)
    await cart.save()
    return res.status(201).json({ message: 'Success', cart, status: 201 });
}else{
let existItem=isCartExist.cartItems.find(item=>item.product==req.body.product)
   if(existItem) {existItem.quantity+=req.body.quantity||1
if(existItem.quantity>product.stock) return next(new AppError(" Available stock is only "+product.stock+" ",400))



   }

   if(!existItem) isCartExist.cartItems.push(req.body)

    calculateTotalPrice(isCartExist)


    await isCartExist.save()
 return res.json({message:"success", cart:isCartExist})
}




    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

export const UpdateQuantity = async (req, res, next) => {
    try {
const cart= await Cart.findOne({ user: req.user._id });

 const item= cart.cartItems.find(item=>item.product==req.params.id)
if(!item) return next(new AppError("Item not found",404))

item.quantity=req.body.quantity

calculateTotalPrice(cart)
await cart.save()


return res.json({message:"success", cart})

}




    catch (error) {
        next(new AppError(error.message, 500));
    }
};



export const RemoveItemFromCart = async (req, res, next) => {
    try {
       const cart = await Cart.findOneAndUpdate({user:req.user._id}, {
       $pull: { cartItems: { _id: req.params.id} }

       },{new:true});
calculateTotalPrice(cart)
await cart.save()
cart|| next(new AppError("cart is empty", 404));
!cart||  res.status(200).json({ message: 'Success',cart, status: 200 });

    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};


export const getUserCart = async (req, res, next) => {
    try {
       
        const cart = await Cart.findOne({ user: req.user._id });

        
       
        res.status(200).json({ message: 'Success', cart, status: 200 });
    } catch (error) {
       
        next(new AppError(error.message, 500));
    }
};




export const clearUserCart = async (req, res, next) => {
    try {
       const cart = await Cart.findOneAndDelete({user:req.user._id});
 res.status(200).json({ message: 'Success',cart, status: 200 });

    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};


export const applyCoupon = async (req, res, next) => {
    try {
       const coupon = await Coupon.findOne({code:req.body.code,expires:{$gte:Date.now()}});
if(!coupon) return next(new AppError("Coupon is not valid",404))
const cart = await Cart.findOne({ user: req.user._id });

cart.discount=coupon.discount
await cart.save()

 res.status(200).json({ message: 'Success',cart, status: 200 });

    } catch (error) {
        next(new AppError(error.message, 500)); 
    }
};





