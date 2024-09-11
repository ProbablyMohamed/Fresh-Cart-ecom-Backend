
import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({ 

user:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
orderItems:[{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number, 
    price: Number,
}],

totalOrderPrice: Number,
shippingAddress: {
city: String,
street: String,
phone: String,
},

paymentType: {
type: String,
enum:['cash', 'card'],
default: 'cash'
},

isPaid: {
type: Boolean,
default: false
},
paidAt: Date,
isDelivered: {
type: Boolean,
default: false
},
deliveredAt: Date,






}
,{
    timestamps: true,
    versionKey: false
}
)


export const Order = mongoose.model('Order', orderSchema)