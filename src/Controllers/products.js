import slugify from "slugify";
import Categories from "../Models/Categories.js";
import Products from "../Models/Products.js";
import { productValid } from "../Validations/products.js";


export const getAll = async (req, res) => {
    try {
      
      const categorySlug = req.query.category;
      const search = req.query.search;
      let products = []
      if(categorySlug) {
        const category = await Categories.findOne({categorySlug: categorySlug})
        products = await Products.find({id_category: { $in: category._id}});
      }
      else if(search) {
        products = await Products.find({productName: { $regex: search, $options: 'i'}});
      }
      else {
        products = await Products.find();
      }
      if(!products && products.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy dữ liệu!"
        })
      }
  
      return res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: products,
      })
    }
    catch (err) {
      res.status(500).json({
        message: "Lỗi trong quá trình lấy dữ liệu!",
        name: err.name,
        message: err.message,
      })
      
    }
  }

export const getDetail = async (req, res) => {
  try {
    let product = await Products.findOne({ slug: req.params.slug}).populate({
      path: "id_category",
      select: "_id categoryName",
      model: "Categories"
    })
    if(!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm!",
      });
    }

    return res.status(200).json({
      message: "Lấy sản phẩm thành công!",
      data: product,
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
    const { error } = productValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(error => error.message),
      })
    }

    let data = {...req.body};
    data.slug = slugify(data.productName, { lower: true })

    const productExists = await Products.findOne({ slug: data.slug });
    if(productExists) {
      return res.status(404).json({
        message: "Sản phẩm đã tồn tại",
      });
    }

    const product = await Products.create(data);
    if(!product) {
      return res.status(404).json({
        message: 'Tạo sản phẩm thất bại'
      })
    }

    return res.status(200).json({
      message: "Tạo sản phẩm thành công",
      data: product,
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
    const { error } = productValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(error => error.message),
      })
    }

    let data = {...req.body};
    data.slug = slugify(data.productName, { lower: true })

    const productExists = await Products.findOne({ slug: data.slug, _id: { $ne: req.params.id} });
    if(productExists) {
      return res.status(404).json({
        message: "Sản phẩm đã tồn tại",
      });
    }

    const product = await Products.findByIdAndUpdate( req.params.id, data, { new: true });
    if(!product) {
      return res.status(404).json({
        message: 'Cập nhật sản phẩm thất bại'
      })
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      data: product,
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
    const data = await Products.findByIdAndDelete(req.params.id);
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
