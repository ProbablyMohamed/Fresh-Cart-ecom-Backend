import mongoose from "mongoose";


const connectDB = async () => {

    await mongoose.connect('mongodb+srv://mohamed:yKd3HtfjGav6Ff6A@cluster0.4wusi.mongodb.net/E-commerce').then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    })
}


export default connectDB