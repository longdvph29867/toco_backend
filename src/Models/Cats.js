import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  account: {
    type: String,
    require: true,
  },
  id_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  id_topping: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Toppings'
    }
  ],
}, {
  timestamps: false,
  versionKey: false,
  collection: "Carts"
});

const Carts = mongoose.model("Carts", cartsSchema);
export default Carts;