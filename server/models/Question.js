const mongoose = require("mongoose")
const Schema = mongoose.Schema

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
)


module.exports = mongoose.model("Question", questionSchema)
