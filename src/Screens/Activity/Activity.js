import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import Checkbox from "@material-ui/core/Checkbox";

const Activity = () => {
  return (
    <div>
      <form>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems={"center"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h5" padding={3} textAlign="center">Activity</Typography>

          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Name" />

          <TextField InputProps={{ inputProps: { min: 1 } }} sx={{ width: 350 }} margin="normal" type={'number'} variant="outlined" placeholder="Number Of Question" />
          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Enter Question" />

          <Typography >
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 1" />
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 2" />

          </Typography>
          <Typography >
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 3" />
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 4" />
          </Typography>

          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Assign to" />

          <Button
            sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
            variant="contained"
            color="warning"

          >Add</Button>


        </Box>
      </form>
    </div>
  );
};

export default Activity;
