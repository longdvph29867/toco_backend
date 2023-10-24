import mongoose from "mongoose";


const commentsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  id_product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  replies: {
    type: [
      {  
        fullName: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        likes: {
          type: Number,
          default: 0
        },
        createAt: {
          type: Date,
          default: Date.now
        },
      }
    ],
    default: []
  },
}, {
  timestamps: false,
  versionKey: false,
  collection: "Comments"
});

const Comments = mongoose.model("Comments", commentsSchema);
export default Comments;