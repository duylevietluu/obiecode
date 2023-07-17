import mongoose, {Schema, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 6,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
})

const User = models.User || model('User', userSchema);

export default User;