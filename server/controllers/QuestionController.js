const { default: mongoose } = require("mongoose")
const Question = require("../models/Question")

// TODO: check if the status codes are correct
// TODO: create pagination from nodejs

// add a question
const addQuestion = async (req, res) => {
  const newQuestion = new Question({ ...req.body })

  try {
    const saveQuestion = await newQuestion.save()

    res.status(201).json(saveQuestion)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

// view all questions
const getAllQuestions = async (req, res) => {
  try {
    const allQuestions = await Question.find()
    res.json({ data: allQuestions })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// view a question 
const getQuestion = async (req, res) => {
   const { id } = req.params;
  try {
    const question = await Question.findById(id)
    res.status(200).json(question)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// update question
const updateQuestion = async (req, res) => {
  const { id } = req.params
  const updatedQuestion = req.body

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)
   
    await Question.findByIdAndUpdate(id, updatedQuestion, { new: true })
    res.status(200).json(updatedQuestion)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// delete question
const deleteQuestion = async (req, res) => {
  const { id } = req.params

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)

   await Question.findByIdAndRemove(id)

    res.json({ message: "Question deleted" })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// publish question
// By default question publication is DRAFT 
const publishQuestion = async (req, res) => {
  const { id } = req.params

  try {
    // verify if the question exists
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Cannot find a question with id: ${id}`)

    // update the publish field
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
  getQuestion,
  updateQuestion,
  deleteQuestion,
  publishQuestion,
  toogleActivation,
  searchQuestion,

}
