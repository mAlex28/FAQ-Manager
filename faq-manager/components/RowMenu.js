import { useState } from "react"
import { useDispatch } from "react-redux"

import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"

import VisibilityIcon from "@mui/icons-material/Visibility"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import DeleteIcon from "@mui/icons-material/Delete"

import QuestionModal from "./QuestionModal"
import { deleteQuestion } from "../redux/actions/questionActions"

export default function RowMenu({ row, setCurrentId }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const openMenu = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleOpen = (id) => {
    setCurrentId(id)
    setOpenModal(true)
  }

  const handleClose = () => setOpenModal(false)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openMenu ? "long-menu" : undefined}
        aria-expanded={openMenu ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        elevation={2}
      >
        <MenuList sx={{ width: 220 }}>
          <MenuItem onClick={() => handleOpen(row._id)}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => console.log(row._id)}>
            <ListItemIcon>
              <CheckCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {row.isActive ? "Deactivate" : "Activate"}
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteQuestion(row._id))
              handleMenuClose()
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
      <QuestionModal
        handleClose={handleClose}
        setOpenModal={setOpenModal}
        openModal={openModal}
        currentId={row._id}
        // setCurrentId={setCurrentId}
      />
    </div>
  )
}
