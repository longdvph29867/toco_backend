import Categories from "../Models/Categories.js"
import slugify from "slugify";
import { categoryValid } from "../Validations/categories.js";

export const getAll = async (req, res) => {
  try {
    const categories = await Categories.aggregate([
      {
        $lookup: {
          from: 'Products',
          localField: '_id',
          foreignField: 'id_category',
          as: 'products',
        },
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          categorySlug: 1,
          productCount: { $size: '$products' },
        },
      },
  ]);;
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
    // validation
    const { error } = categoryValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details[0].message,
      })
    }

    let data = {...req.body};
    data.categorySlug = slugify(data.categoryName, { lower: true })

    const categoryExists = await Categories.findOne({ categorySlug: data.categorySlug });
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

export const update = async (req, res) => {
  try {
    // validation
    const { error } = categoryValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details[0].message,
      })
    }

    let data = {...req.body};
    data.categorySlug = slugify(data.categoryName, { lower: true })

    const categoryExists = await Categories.findOne({ categorySlug: data.categorySlug, _id: { $ne: req.params.id} });
    if(categoryExists) {
      return res.status(404).json({
        message: "Danh mục đã tồn tại",
      });
    }

    const category = await Categories.findByIdAndUpdate( req.params.id, data, { new: true });
    if(!category) {
      return res.status(404).json({
        message: 'Cập nhật danh mục thất bại'
      })
    }

    return res.status(200).json({
      message: "Cập nhật danh mục thành công",
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

export const remove = async (req, res) => {
  try {
    const data = await Categories.findByIdAndDelete(req.params.id);
    if(!data) {
      return res.status(400).json({
        message: "Xoá thất bại!"
      })
    }
    return res.status(200).json({
      messgae: "Xoá thành công!",
      data: data
    })
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message
    })
  }
}