import mongoose from "mongoose";
const shopShema = mongoose.Schema({

    Name:String,
    Price:Number,
    Category:String,
    Img:String,
    Description:String,
    Oldprice:Number,
    Percentoff:String,

})

const Shop=mongoose.model("Shop", shopShema)

export default  Shop;

