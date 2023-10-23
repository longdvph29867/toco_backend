import Users from "../Models/Users.js";
import { signInValid, userValid } from "../Validations/users.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;

export const signUp = async (req, res) => {
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
      message: err.message
    })
  }
}

export const signIn = async (req, res) => {
  try {
    // validation
    const { error } = signInValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    let data = {...req.body};

    const user = await Users.findOne({ account: data.account });
    if(!user) {
      return res.status(404).json({
        message: 'Tài khoản chưa được đăng ký!',
      });
    }

    const isMath = await bcryptjs.compare(data.password, user.password)
    if(!isMath) {
      return res.status(404).json({
        message: 'Mật khẩu không đúng!',
      });
    }

    const accessToken = await jwt.sign({ id: user.id}, SECRET_CODE, { expiresIn: '30d' });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: user,
      accessToken
    });
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message
    })
  }
}