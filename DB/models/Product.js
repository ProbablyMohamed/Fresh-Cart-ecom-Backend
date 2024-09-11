
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter Product name"],
        trim: true,
        minLength: [3, "Product name should be at least 3 characters"],
        maxLength: [25, "Product name should not be more than 25 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter Product description "],
        trim: true,
        minLength: [3, "Product description should be at least 3 characters"],
        maxLength: [1500, "Product description should not be more than 1500 characters"]
    },
    slug: {
        type: String,
        required: [true, "Please enter product name"],
        lowercase: true,
    },
    mainImage: String,
    coverImage: [String],
    price: {
        type: Number,
        required: [true, "Please enter price"],
        min: [0, "Price can not be negative"]
        
    },
    priceAfterDiscount: {
        type: Number,
       
        min: [0, "Price can not be negative"]

    }, stock: {
        type: Number,
        required: [true, "Please enter stock quantity"],
        min: [0, "stock can not be negative"]
        
    },
    sold: {
        type: Number,
        min: [0, "sold can not be negative"],
        default: 0

    },
    
    rateCount: {
        type: Number,
        min: [0, "rate can not be negative"],
        default: 0

    },
    rateAverage: {
        type: Number,
        min: [0, " average rate can not be negative"],
        default: 0

    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        //required: [true, "Please provide user"],
        // ref: "User"
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //required: [true, "Please provide category"],
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        //required: [true, "Please provide sub-category"],
        ref: "SubCategory"
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        //required: [true, "Please provide brand"],
        ref: "Brand"
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
});
productSchema.post('init',(doc)=>{

    if(doc?.mainImage){
    
        doc.mainImage='http://localhost:3000/uploads/product/'+ doc?.mainImage
    }
    
    if(doc?.coverImage?.length){

        doc.coverImage=doc?.coverImage.map(element=> 'http://localhost:3000/uploads/product/'+element)
    }
    
      
    });
    productSchema.pre(/^find/, function () {
        this.populate('reviews');
    })
    

productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id',
    })


const Product = mongoose.model('Product', productSchema);

export default Product;
