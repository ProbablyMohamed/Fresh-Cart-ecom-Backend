import dbConnection from "../DB/connection.js";
import dotenv from 'dotenv'
import categoryRouter from './modules/category/category.routes.js'
import brandRouter from './modules/brand/brands.routes.js'
import subCategoryRouter from './modules/subcategory/subcategory.routes.js'
import productRouter from './modules/product/product.routes.js'
import userRouter from './modules/user/user.routes.js'
import authRouter from './modules/auth/auth.routes.js'
import reviewRouter from './modules/reviews/review.routes.js'
import wishlistRouter from './modules/wishlist/wishlist.routes.js'
import addressRouter from './modules/address/address.routes.js'
import couponRouter from './modules/coupon/coupon.routes.js'
import cartRouter from './modules/cart/cart.routes.js'
import orderRouter from "./modules/order/order.routes.js";
const bootstrap=(app,express)=>{
    const baseURL = 'https://fresh-cart-ecom-backend.vercel.app/'
    dbConnection();
    dotenv.config();
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));

    app.use(`${baseURL}/categories`,categoryRouter)
    app.use(`${baseURL}/brands`,brandRouter)
    app.use(`${baseURL}/subCategories`,subCategoryRouter)
    app.use(`${baseURL}/products`,productRouter)
     app.use(`${baseURL}/users`,userRouter)
     app.use(`${baseURL}/auth`,authRouter)
     app.use(`${baseURL}/reviews`,reviewRouter)
     app.use(`${baseURL}/wishlist`,wishlistRouter)
     app.use(`${baseURL}/address`,addressRouter)
     app.use(`${baseURL}/coupons`,couponRouter)
     app.use(`${baseURL}/cart`,cartRouter)
     app.use(`${baseURL}/order`, orderRouter)
    app.use('*',(req,res)=>{
    return res.json({message: 'Not Found'})
    })
   
}
export default bootstrap