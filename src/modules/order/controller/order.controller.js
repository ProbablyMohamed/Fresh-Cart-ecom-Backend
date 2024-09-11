import AppError from "../../../utils/AppError.js";
import User from "../../../../DB/models/User.js";
import { Cart } from "../../../../DB/models/Cart.js";
import Product from "../../../../DB/models/Product.js";
import Coupon from "../../../../DB/models/Coupon.js";
import { Order } from "../../../../DB/models/Order.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PxweoG9uriXVRF0qgFFtIyarUzSSNzx3ezgZuyWbwxzAa0Fp5xBqY4PI36e6M0myqBYBU3eO9EBqRXLhYX3Pci600p8MTAUyf');


export const createCashOrder = async (req, res, next) => {
    try {
const cart= await Cart.findById(req.params.id);
if(!cart) return next(new AppError("Cart is empty",404));
const totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;
const order= new Order({
  user:req.user._id,
  orderItems:cart.cartItems,
  shippingAddress:req.body.shippingAddress,
  totalOrderPrice,
})


await order.save();


const options= cart.cartItems.map((prod)=>{

return( 
    {
    updateOne:{
        "filter":{_id:prod.product},
        "update":{$inc:{sold:prod.quantity,stock:-prod.quantity}}
    }
}
)

})


await Product.bulkWrite(options)

await Cart.findByIdAndDelete(cart._id)




res.status(201).json({ message: 'Order created successfully',order, status: 201});




    } catch (error) {
        next(new AppError(error.message, 500));
    }
};




export const getUserOrders = async (req, res, next) => {
    try {
const order = await Order.findOne({ user: req.user._id }).populate('orderItems.product');

res.status(200).json({ message: 'Success', order, status: 200 });



    } catch (error) {
        next(new AppError(error.message, 500));
    }
};
export const getAllOrders = async (req, res, next) => {
    try {
const order = await Order.find({});

res.status(200).json({ message: 'Success', order, status: 200 });



    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

export const createCheckoutSession = async (req, res, next) => {
    try {

const cart= await Cart.findById(req.params.id);
if(!cart) return next(new AppError("Cart is empty",404));
const totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice;

const session= await stripe.checkout.sessions.create({
line_items:[{
    price_data:{
currency:'egp',
unit_amount:totalOrderPrice*100,
product_data:{
    name:req.user.name
}
},
quantity:1
},
],

mode:'payment',
success_url:"https://fresh-cart-taupe.vercel.app/allorders",
cancel_url:"https://fresh-cart-taupe.vercel.app/cart",
customer_email:req.user.email,
client_reference_id:req.params.id,
metadata:req.body.shippingAddress,


})

res.json({message:'Success',session,status:200})
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};




