import mongoose from "mongoose";


const toppingsSchema = new mongoose.Schema({
  toppingName: {
    type: String,
    require: true,
  },  
  toppingPrice: {
    type: Number,
    required:true,
  },
}, {
  timestamps: false,
  versionKey: false,
  collection: "Toppings"
});

const Toppings = mongoose.model("Toppings", toppingsSchema);
export default Toppings;