import Users from "../Models/Users.js";
import bcryptjs from 'bcryptjs';
import { userValid } from "../Validations/users.js";


export const getAll = async (req, res) => {
    try {
      const users = await Users.find();
      if(!users && users.length === 0) {
        return res.status(404).json({
          message: "Không tìm thấy dữ liệu!"
        })
      }
  
      return res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: users,
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
    const user = await Users.findById(req.params.id)
    if(!user) {
      return res.status(404).json({
        message: "Không tìm thấy tài khoản!",
      });
    }
    return res.status(200).json({
      message: "Lấy tài khoản thành công!",
      data: user,
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
    const { error } = userValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    let data = {...req.body};

    const userExists = await Users.findOne({ account: data.account });
    if(userExists) {
      return res.status(404).json({
        message: 'Tài khoản đã tồn tại!',
      });
    }

    const userExistsPhone = await Users.findOne({ phoneNumber: data.phoneNumber });
    if(userExistsPhone) {
      return res.status(404).json({
        message: 'Số điện thoại đã được đăng ký!',
      });
    }

    // mã hoá password
    const hashedPassword = await bcryptjs.hash(data.password, 10)

    const user = await Users.create({...data, password: hashedPassword});
    if(!user) {
      return res.status(404).json({
        message: 'Tạo tài khoản thất bại!'
      })
    }

    return res.status(200).json({
      message: "Tạo tài khoản thành công!",
      data: user,
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
    const { error } = userValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    let data = {...req.body};

    const userExists = await Users.findOne({ account: data.account, _id: { $ne: req.params.id} });
    if(userExists) {
      return res.status(404).json({
        message: 'Tài khoản đã tồn tại!',
      });
    }

    const userExistsPhone = await Users.findOne({ phoneNumber: data.phoneNumber, _id: { $ne: req.params.id} });
    if(userExistsPhone) {
      return res.status(404).json({
        message: 'Số điện thoại đã được đăng ký!',
      });
    }

    // mã hoá password
    const hashedPassword = await bcryptjs.hash(data.password, 10)

    const user = await Users.findByIdAndUpdate( req.params.id, {...data, password: hashedPassword}, { new: true });
    if(!user) {
      return res.status(404).json({
        message: 'Cập nhật tài khoản thất bại!'
      })
    }

    return res.status(200).json({
      message: "Cập nhật tài khoản thành công!",
      data: user,
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
    const data = await Users.findByIdAndDelete(req.params.id);
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