import mongoose from "mongoose";
import roles from "../../src/types/roles.js";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({

name:{
    type:String,
    required:[true,"Please enter your name"],
    minLenght:[2,"Name should be at least 2 characters"],   
    maxLenght:[25,"Name should not be more than 25 characters"]
},

email:{
    type:String,
    required:[true,"Please enter your email"],
    unique:true,

},
password:{
    type:String,
    required:[true,"Please enter your password"],
    minLenght:[6,"Password should be at least 6 characters"],   
    maxLenght:[25,"Password should not be more than 25 characters"]
},
isBlocked:{
    type:Boolean,
    default:false
},
confirmEmail:{
    type:Boolean,
    default:false
},



role:{
    type:String,
    enum:Object.values(roles),
    default:roles.user
},

passwordChangedAt:Date,
wishlist:[{ type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
addresses:[ {
    street: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true }, 
}]



},
{
timestamps:true,
versionKey:false
}
);




userSchema.pre('save', function() {
   this.password= bcrypt.hashSync(this.password, 8);
})

userSchema.pre('findOneAndUpdate', function() {
  if (this._update.password) this._update.password= bcrypt.hashSync(this._update.password, 8);

})




const User = mongoose.model('User', userSchema);





export default User;