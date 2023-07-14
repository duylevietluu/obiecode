import mongoose, {Schema, model, models } from "mongoose";

const postSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  results: {
    type: [
      {
        success: Boolean,
        message: String,
      }
    ],
    required: true,
  },
  grade: {
    type: Number,
    require: true,
  },
});

const Post = models.Post || model('Post', postSchema);

export default Post;