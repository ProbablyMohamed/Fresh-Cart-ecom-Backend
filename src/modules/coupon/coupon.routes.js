import { Router } from "express";
import * as couponController from "../coupon/coupon.controller/coupoun.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const router = Router();

router.get("/", protectedRoutes,  couponController.getCoupons)
    .post("/", protectedRoutes,allowedTo('admin') ,  couponController.addCoupon)
    .put("/:id", protectedRoutes,allowedTo('admin') , couponController.updateCoupon)
    .delete("/:id", protectedRoutes,allowedTo('admin') , couponController.deleteCoupon);

export default router