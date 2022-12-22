import { useState } from "react"

import { Box, Typography, Button } from "@mui/material"
import { styled } from '@mui/material/styles'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'

import QuestionModal from "./QuestionModal"

const CustomButton = styled(Button) ({
  backgroundColor: '#8c9ef',
  textTransform: 'capitalize',
  border: 'none',
    '&:hover': {
    backgroundColor: '#0069d9',
  },
})

export default function TopBar({ currentId, setCurrentId }) {
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#000",
        }}
      >
        FAQ Manager - iLabs
      </Typography>
      <CustomButton
        variant="contained"
        size="small"
        startIcon={<AddCircleOutlinedIcon />}
        onClick={handleOpen}
      >
        Add New Question
      </CustomButton>
      <QuestionModal
        handleClose={handleClose}
        setOpenModal={setOpenModal}
        openModal={openModal}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
    </Box>
  )
}
