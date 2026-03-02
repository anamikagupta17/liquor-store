const mongoose=require("../config/db");

const categorySchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    status:{default:1,type:Number}
},{timestamps:true}
)


module.exports = mongoose.model("Category",categorySchema);