import Categories from "../Models/Categories.js"


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