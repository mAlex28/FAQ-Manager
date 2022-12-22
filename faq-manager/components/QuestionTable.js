import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import Button from "@mui/material/Button"

import RowMenu from "./RowMenu"

const columns = [
  { id: "number", label: "#", minWidth: 50 },
  { id: "question", label: "Question", minWidth: 170 },
  {
    id: "category",
    label: "Category",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 100,
  },
]

export default function QuestionTable({setCurrentId}) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const { questions } = useSelector((state) => state.questions)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {questions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow id={row._id}>
                    <TableCell scope="row">1</TableCell>
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      {row.isPublished ? (
                        <Button
                          disableElevation
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#6ab04c",
                            "&:hover": {
                              backgroundColor: "#6ab04c",
                            },
                          }}
                        >
                          Published
                        </Button>
                      ) : (
                        <Button
                          disableElevation
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: "#bdc3c7",
                            "&:hover": {
                              backgroundColor: "#6ab04c",
                            },
                          }}
                        >
                          Draft
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <RowMenu row={row} setCurrentId={setCurrentId}/>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={questions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
