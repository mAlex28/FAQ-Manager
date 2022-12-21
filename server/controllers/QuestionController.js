const { default: mongoose } = require("mongoose")
const Question = require("../models/Question")

// TODO: apply correct status codes

// add a question
// TODO: try to use Create function
const addQuestion = async (req, res) => {
  const newQuestion = new Question({ ...req.body })

  try {
    const saveQuestion = await newQuestion.save()

    res.status(201).json(saveQuestion)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// view question
// TODO: (Add pagination)
const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find()
    res.json({ data: allQuestions })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// update question
// TODO: use spreader in updatequestion object
const updateQuestion = async (req, res) => {
  const { id } = req.params
  const { quID, question, category, isPublished, isActive } = req.body

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)

    const updatedQuestion = {
      quID,
      question,
      category,
      isPublished,
      isActive,
      _id: id,
    }

    await Question.findByIdAndUpdate(id, updatedQuestion, { new: true })
    res.json(updatedQuestion)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete question
const deleteQuestion = async (req, res) => {
  const { id } = req.params

  // verify if the question exists
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`Cannot find a question with id: ${id}`)

  await Question.findByIdAndRemove(id)

  res.json({ message: "Question deleted" })
}

// publish question
// By default question publication is DRAFT (isPublished = false)
const publishQuestion = async (req, res) => {
  const { id } = req.params

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )

    res.json(updatedQuestion)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// deactive question
// Assumed that a question needs to be published to be deactivated
const toogleActivation = async (req, res) => {
  const { id } = req.params

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)

    // check if the question is published
    const findIsPublished = await Question.findOne({ _id: id })

    if (findIsPublished.isPublished == false) {
      return res.status(404).send(`The question is not published`)
    } else {
      const updatedQuestion = await Question.findOneAndUpdate({ _id: id }, [
        { $set: { isActive: { $eq: [false, "$isActive"] } } },
      ])
      res.json(updatedQuestion)
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// search question
const searchQuestion = async (req, res) => {
  const { query } = req.query

  try {
    const questionQuery = new RegExp(query, "i") // make case insensitive
    const questions = await Question.find({
      question: { $regex: questionQuery },
    })

    res.json({ data: questions })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = {
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  publishQuestion,
  toogleActivation,
  searchQuestion,
}
