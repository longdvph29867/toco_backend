import Products from "../Models/Products.js";


export const getAll = async (req, res) => {
    try {
      const products = await Products.find();
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
        message: "Lỗi trong quá trình lấy dữ liệu!"
      })
      
    }
  }

export const getDetail = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug})
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