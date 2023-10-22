import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  }

})

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
    unique: true,
  },
  price: {
    type: Number,
    required:true,
  },
  sale_price: {
    type: Number,
    required:true,
  },
  description: {
    type: String,
    required:true,
  },
  images: [
    {
      type: String,
    }
  ],
  id_category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Caregories'
    }
  ]
}, {
  timestamps: false,
  versionKey: false,
  collection: "Products"
});

const Products = mongoose.model("Products", productsSchema);
export default Products;