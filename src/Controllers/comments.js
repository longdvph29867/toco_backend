import Comments from "../Models/Comments.js";
import { commentReplyValid, commentValid } from "../Validations/comments.js";

export const getAllByProduct = async (req, res) => {
  try {
    const productId = req.query.productId
    const comments = await Comments.find({ id_product: productId});
    if(!comments && comments.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy dữ liệu!"
      })
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công!",
      data: comments,
    })
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
      const { error } = commentValid.validate(req.body);
      if(error) {
        return res.status(400).json({
          message: error.details.map(item => item.message),
        })
      }
  
      let data = {...req.body};

      const comment = await Comments.create(data);
      if(!comment) {
        return res.status(404).json({
          message: 'Bình luận thất bại!'
        })
      }
  
      return res.status(200).json({
        message: "Bình luận thành công!",
        data: comment,
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
    const { error } = commentValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    const commentId = req.params.id;

    let filter = { _id: commentId };
    let data = { text: req.body.text };

    const comment = await Comments.updateOne(filter, data);
    if(!comment) {
      return res.status(404).json({
        message: 'Bình luận thất bại!'
      })
    }

    return res.status(200).json({
      message: "Bình luận thành công!",
      data: comment,
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
    const data = await Comments.findByIdAndDelete(req.params.id);
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

export const createReply = async (req, res) => {
  try {
    // validation
    const { error } = commentReplyValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    const commentId = req.params.commentId;
    if(!commentId) {
      return res.status(404).json({
        message: 'commentId là bắt buộc!'
      })
    }

    const newReply = {...req.body};

    const comment = await Comments.updateOne(
      { _id: commentId }, 
      {$push: { replies: newReply}},
    );
    if(comment.modifiedCount !== 1) {
      return res.status(404).json({
        message: 'Bình luận thất bại'
      })
    }

    return res.status(200).json({
      message: "Bình luận thành công!",
    });
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message,
    })
  }
}


export const removeReply = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    if(!commentId) {
      return res.status(404).json({
        message: 'commentId là bắt buộc!'
      })
    }
    if(!replyId) {
      return res.status(404).json({
        message: 'replyId là bắt buộc!'
      })
    }

    const result = await Comments.updateOne(
      { _id: commentId }, 
      {$pull: { replies: { _id: replyId }}},
    );

    if(result.modifiedCount !== 1) {
      return res.status(400).json({
        message: "Xoá thất bại!",

      })
    }
    return res.status(200).json({
      messgae: "Xoá thành công!",
    })
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message
    })
  }
}

export const updateReply = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    if(!commentId) {
      return res.status(404).json({
        message: 'commentId là bắt buộc!'
      })
    }
    if(!replyId) {
      return res.status(404).json({
        message: 'replyId là bắt buộc!'
      })
    }

    const { error } = commentReplyValid.validate(req.body);
    if(error) {
      return res.status(400).json({
        message: error.details.map(item => item.message),
      })
    }

    const result = await Comments.updateOne(
      { _id: commentId, 'replies._id': replyId }, 
      {$set: { 'replies.$.text': req.body.text}},
    );

    if(result.modifiedCount !== 1) {
      return res.status(400).json({
        message: "Cập nhật thất bại!",

      })
    }
    return res.status(200).json({
      messgae: "Cập nhật thành công!",
    })
  }
  catch (err) {
    res.status(500).json({
      name: err.name,
      message: err.message
    })
  }
}