const mongoose = require("../config/db");

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category:{type:String,required:true,type: mongoose.Schema.Types.ObjectId,
    ref: "Category"},
    status: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);


module.exports=mongoose.model("Brand", brandSchema);