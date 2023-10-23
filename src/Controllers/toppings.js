import Toppings from "../Models/Toppings.js";
import { toppingValid } from "../Validations/toppings.js";

export const getAll = async (req, res) => {
  try {
    const toppings = await Toppings.find();
    if(!toppings && toppings.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy dữ liệu!"
      })
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: toppings,
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
    const topping = await Toppings.findById(req.params.id)
    if(!topping) {
      return res.status(404).json({
        message: "Không tìm thấy topping!",
      });
    }
    return res.status(200).json({
      message: "Lấy topping thành công!",
      data: topping,
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
    const { error } = toppingValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    let data = {...req.body};

    const toppingExists = await Toppings.findOne({ toppingName: data.toppingName });
    if(toppingExists) {
      return res.status(404).json({
        message: "Topping đã tồn tại",
      });
    }

    const topping = await Toppings.create(data);
    if(!topping) {
      return res.status(404).json({
        message: 'Tạo topping thất bại'
      })
    }

    return res.status(200).json({
      message: "Tạo topping thành công",
      data: topping,
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
    const { error } = toppingValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    let data = {...req.body};

    const toppingExists = await Toppings.findOne({ toppingName: data.toppingName , _id: { $ne: req.params.id}});
    if(toppingExists) {
      return res.status(404).json({
        message: "Topping đã tồn tại",
      });
    }

    const topping = await Toppings.findByIdAndUpdate( req.params.id, data, { new: true });
    if(!topping) {
      return res.status(404).json({
        message: 'Cập nhật topping thất bại'
      })
    }

    return res.status(200).json({
      message: "Cập nhật topping thành công",
      data: topping,
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
    const data = await Toppings.findByIdAndDelete(req.params.id);
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