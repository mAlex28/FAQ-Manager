import React from 'react';
import Box from "@mui/material/Box"
import { Grid } from '@mui/material';
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"


export default function Footer(props) {
  return (
    <footer>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        columns={{ xs: 12, md: 12 }}
        
      >
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{
            xs: "center",
            md: "flex-start",
          }}
        >
          <Typography
            color="textSecondary"
            component="p"
            variant="caption"
            gutterBottom={false}
          >
            copyright &#169; iLabs. All Rights Reserved{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent={{
            xs: "center",
            md: "flex-end",
          }}
        >
          <Box component="nav">
            <Link href="#" variant="caption" color="textPrimary">
              Privacy Policy
            </Link>
            <Link href="#" variant="caption" color="textPrimary">
              Terms of Service
            </Link>
            <Link href="#" variant="caption" color="textPrimary">
              Help Center
            </Link>
          </Box>
        </Grid>
      </Grid>
     
    </footer>
  )
}