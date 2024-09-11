import joi from "joi";
export const addProductSchema=joi.object({
    title: joi.string().min(3).max(25).trim().required(),
    description: joi.string().min(3).max(1500).trim().required(),
    price: joi.number().positive().required(),
 priceAfterDiscount: joi.number().positive(),
 stock: joi.number().positive().required(),
    category: joi.string().required(),
    subCategory: joi.string().required(),
    brand: joi.string().required(),
    
    files:joi.object({
        mainImage:joi.array().items( joi.object({
                size:joi.number().positive().required(),
                    path:joi.string().required(),
                    filename:joi.string().required(),
                    destination:joi.string().required(),
                    mimetype:joi.string().required(),
                    encoding:joi.string().required(),
                    originalname:joi.string().required(),
                  fieldname:joi.string().required()
                
            })),
        coverImage:joi.array().items( joi.object({
                size:joi.number().positive().required(),
                    path:joi.string().required(),
                    filename:joi.string().required(),
                    destination:joi.string().required(),
                    mimetype:joi.string().required(),
                    encoding:joi.string().required(),
                    originalname:joi.string().required(),
                  fieldname:joi.string().required()
                
            }))
        })
    }).required()