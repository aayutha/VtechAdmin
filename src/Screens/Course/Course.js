import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import Checkbox from "@material-ui/core/Checkbox";
const Course = () => {
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
          <Typography variant="h5" padding={3} textAlign="center">Course</Typography>

          <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Name" />
          <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Detail" />
          <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Price" />

          <Button
            sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
            variant="contained"
            color="warning"

          >Add</Button>


        </Box>
      </form>
      <div>

      </div>
    </div>
  );
};

export default Course;
