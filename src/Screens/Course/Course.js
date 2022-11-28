import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
const Course = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
{/* mui list code */}


      <Grid container spacing={2} alignContent="center">
      
        <Grid item xs={12} md={6}  >
          <Typography sx={{ mt: 4, mb: 2 ,}} variant="h6" component="div" marginLeft={7}>
            Course List
          </Typography>
          <Demo sx={{ m: 1}}>
            <List dense={dense} >
              {generate(
                <ListItem sx={{ m: 3,width: 300 }}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar   >
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Digital-Marketing"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
              )}
            </List>
          </Demo>
        </Grid>
      </Grid>

{/* mui list code */}
         

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
