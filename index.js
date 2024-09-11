import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bootstrap from './src/bootstrap.js'
import globalError from "./src/middleware/globalError.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PxweoG9uriXVRF0qgFFtIyarUzSSNzx3ezgZuyWbwxzAa0Fp5xBqY4PI36e6M0myqBYBU3eO9EBqRXLhYX3Pci600p8MTAUyf');


const app = express();
const port = process.env.PORT ||3000; 
app.post('/api/webhook', (req, res) => {
try {
    const sig=req.headers['stripe-signature'].toString();
    let event=stripe.webhooks.constructEvent(request.body,sig,"whsec_srEs1LU52PqwKOenM8OTISBbKJz96xM5");
    let checkout
if(event.type==='checkout.session.completed'){
 checkout=event.data.object;
}


res.json({message:"success",checkout})



} catch (error) {
    new AppError(error.message, 500);
}



})







app.use(cors());
bootstrap(app, express);
app.get("/", (req, res) => {
    res.send("Hello World!");
}); 
app.use(globalError)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})