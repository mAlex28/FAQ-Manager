const Question = require("../models/Question")

// add a question
const addQuestion = async (req, res) => {
  const newQuestion = new Question({ ...req.body })

  try {
    const saveQuestion = await newQuestion.save()

    res.status(201).json(saveQuestion)
  } catch (err) {
    res.status(409).json({ message: err.message })
  }
}

module.exports = { addQuestion }

// view
// update
// delete
// deactivate
// publish or draft
// search
// pagination
