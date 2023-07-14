import mongoose, {Schema, model, models } from "mongoose";

const bestGradeSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  result: { type: Number, required: true },
});

const BestGrade = models.BestGrade || model('BestGrade', bestGradeSchema);

export default BestGrade;
