import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"


export default function Footer() {
  return (
    <footer>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          padding: " 2rem 4rem",
        }}
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
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Link href="#" variant="caption" color="textPrimary">
              Privacy Policy
            </Link>
            <Link href="#" variant="caption" color="textPrimary">
              Terms of Service
            </Link>
            <Link href="#" variant="caption" color="textPrimary">
              Help Center
            </Link>
          </Stack>
          
        </Grid>
      </Grid>
    </footer>
  )
}