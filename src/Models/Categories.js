import mongoose from "mongoose";


const categoriesSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true,
    unique: true,
    defaultValue: "Uncategorized"
  },
  categorySlug: {
    type: String,
    require: true,
    unique: false,
    defaultValue: "Uncategorized"
  }
}, {
  timestamps: false,
  versionKey: false,
  collection: "Categories"
});

const Categories = mongoose.model("Categories", categoriesSchema);
export default Categories;