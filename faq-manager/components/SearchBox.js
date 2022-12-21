import { TextField, IconButton, Paper, Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
export default function SearchBox() {
    return (
      <Paper sx={{ mt: 4, padding: "10px 10px" }}>
        <form>
          <Grid container>
            <Grid item xs={9}>
              <TextField
                id="search-bar"
                className="text"
                fullWidth
                // onInput={(e) => {
                //   setSearchQuery(e.target.value)
                // }}
                variant="outlined"
                placeholder="Search..."
                size="small"
              />
            </Grid>
            <Grid item xs={3} sx={{
                padding: "0px 10px"
            }}>
              <Button type="submit" aria-label="search" variant="contained" size="small" sx={{
                width: "100%",
                height: "100%",
              }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
}

