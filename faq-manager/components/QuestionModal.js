import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"

import { addQuestion } from "../redux/actions/questionActions"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
}

export default function QuestionModal({
  openModal,
  handleClose,
  setOpenModal,
  currentId, setCurrentId
}) {
  const [questionData, setQuestionData] = useState({
    question: "",
    category: "",
    isPublished: false,
    isActive: false,
  })
  const [questionErrorText, setQuestionErrorText] = useState("")
  const question = useSelector((state) => currentId ? state.questions.questions.find((qu) => qu._id === currentId): null)
  const dispatch = useDispatch()

  const clear = () => {
    setQuestionData({
      question: "",
      category: "",
      isPublished: false,
      isActive: false,
    })
  }

  useEffect(() => {
    if (question) setQuestionData(question)
    // setQuestionData({ ...questionData, isActive: questionData.isPublished })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!questionData.question || !questionData.category) {
      setQuestionErrorText("Fields cannot be empty")
    } else {
      dispatch(addQuestion({ ...questionData }))

      clear()
      setOpenModal(false)
    }
  }

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", color: "#000" }}
          >
            Add a new question
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="question"
                  required
                  fullWidth
                  label="Question"
                  error={!!questionErrorText}
                  value={questionData.question}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      question: e.target.value,
                    })
                  }
                  autoFocus
                  helperText="Please write your question"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="category"
                  error={!!questionErrorText}
                  value={questionData.category}
                  label="Question Category"
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      category: e.target.value,
                    })
                  }
                  helperText="Enter your question category"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked={false} />}
                  label="Publish"
                  name="isPublished"
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      isPublished: e.target.checked,
                    })
                  }
                />
                <br />
                <Typography component="span" sx={{ fontSize: "12px" }}>
                  If you don't publish a question, it'll be saved as draft
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Question
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  )
}
