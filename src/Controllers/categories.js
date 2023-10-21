import Categories from "../Models/Categories.js"
import slugify from "slugify";

export const getAll = async (req, res) => {
  try {
    const categories = await Categories.find();
    if(!categories && categories.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy dữ liệu!"
      })
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: categories,
    })
  }
  catch (err) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu!"
    })
    
  }
}

export const getDetail = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id)
    if(!category) {
      return res.status(404).json({
        message: "Không tìm thấy danh mục!",
      });
    }
    return res.status(200).json({
      message: "Lấy danh mục thành công!",
      data: category,
    });
  }
  catch (err) {
    res.status(500).json({
      message: "Lỗi trong quá trình lấy dữ liệu!"
    })
  }
}

export const create = async (req, res) => {
  try {
    let data = {...req.body};
    data.categorySlug = slugify(data.categoryName, { lower: true })

    const categoryExists = await Categories.findOne({ slug: data.categorySlug});
    if(categoryExists) {
      return res.status(404).json({
        message: "Danh mục đã tồn tại",
      });
    }

    const category = await Categories.create(data);
    if(!category) {
      return res.status(404).json({
        message: 'Tạo danh mục thất bại'
      })
    }

    return res.status(200).json({
      message: "Tạo danh mục thành công",
      data: category,
    });
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message,
    })
  }
}