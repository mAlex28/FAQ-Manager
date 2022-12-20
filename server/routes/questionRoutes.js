const express = require("express")
const router = express.Router()

const QuestionController = require("../controllers/QuestionController")

router.post("/new", QuestionController.addQuestion)

module.exports = router
