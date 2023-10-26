import Carts from "../Models/Cats.js";
import { cartsValid } from "../Validations/carts.js";

export const getAllByAccount = async (req, res) => {
  try {
    const products = await Carts.find({account: req.params.account}).populate({
      path: "id_product",
      select: "_id productName slug images price sale_price",
      model: "Products"
    }).populate({
      path: "id_topping",
      select: "_id toppingName toppingPrice",
      model: "Toppings"
    }).select('-account');
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
      message: "Lỗi trong quá trình lấy dữ liệu!!!"
    })
    
  }
}

export const create = async (req, res) => {
    try {
      // validation
      const { error } = cartsValid.validate(req.body);
      if(error) {
        return res.status(400).json({
          message: error.details[0].message,
        })
      }
  
      let data = {...req.body};
  
      const cartExists = await Carts.findOne({ 
        account: data.account,
        id_product: data.id_product,
        id_topping: {
          $all: data.id_topping,
          $size: data.id_topping.length
        }
      });
      if(cartExists) {
        cartExists.quantity += Number(data.quantity)
        const newCart = await Carts.findByIdAndUpdate( cartExists._id, cartExists, { new: true });
        return res.status(200).json({
          message: "Thêm sản phẩm thành công",
          data: newCart,
        });
      }
  
      const cart = await Carts.create(data);
      if(!cart) {
        return res.status(404).json({
          message: 'Thêm sản phẩm thất bại'
        })
      }
  
      return res.status(200).json({
        message: "Thêm sản phẩm thành công",
        data: cart,
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
    const data = await Carts.findByIdAndDelete(req.params.id);
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