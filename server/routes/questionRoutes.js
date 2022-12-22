const express = require("express")
const router = express.Router()

const QuestionController = require("../controllers/QuestionController")

router.get("/", QuestionController.getAllQuestions)
router.get("/:id", QuestionController.getQuestion)
router.get("/search", QuestionController.searchQuestion)
router.post("/", QuestionController.addQuestion)
router.put("/:id", QuestionController.updateQuestion)
router.patch("/cpublish/:id", QuestionController.publishQuestion)
router.patch("/tactive/:id", QuestionController.toogleActivation)
router.delete("/:id", QuestionController.deleteQuestion)

module.exports = router
