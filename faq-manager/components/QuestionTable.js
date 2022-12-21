import { useState } from "react"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'number', label: '#', minWidth: 50 },
  { id: 'question', label: 'Question', minWidth: 170 },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align:"left"
  },
   {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
];


export default function QuestionTable({result}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] =useState(10);

  const [anchorEl, setAnchorEl] =useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 5 }}>
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
            {result.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow key={row._id}>
                    <TableCell scope="row">{row.quID}</TableCell>
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
                          <MenuList sx={{ width: 220 }} >
                            <MenuItem onClick={handleMenuClose}>
                              <ListItemIcon>
                                <VisibilityIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>View</ListItemText>
                            </MenuItem>
                            <MenuItem>
                              <ListItemIcon>
                                <CheckCircleOutlineIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>
                                {" "}
                                {row.isActive ? "Deactivate" : "Activate"}
                              </ListItemText>
                            </MenuItem>
                            <MenuItem>
                              <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Delete</ListItemText>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </div>
                    </TableCell>
                  </TableRow>
                  //   <TableRow hover  tabIndex={-1} key={row.quID}>
                  //     {columns.map((column) => {
                  //       const value = row[column.id];
                  //       return (
                  //         <TableCell key={column.id} align={column.align}>
                  //           {column.format && typeof value === 'number'
                  //             ? column.format(value)
                  //             : value}
                  //         </TableCell>
                  //       );
                  //     })}
                  //   </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={result.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}