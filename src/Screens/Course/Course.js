import React, { useState, useEffect } from "react";
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
import { db } from "../../firebase";
import { addDoc, collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

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
  const [courseName, setcourseName] = useState("")
  const [Cdescription, setCdescription] = useState("")
  const [CImageUrl, setCImageUrl] = useState("")
  const [orderDetail, setOrderDetail] = useState([]);


  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "Courses");
    try {
      const docSnap = await getDocs(docRef);
      docSnap.forEach((item) => {
        resultArray.push({ id: item.id, ...item.data() });
        console.log("hi");
      });
      console.log(resultArray);
      setOrderDetail(resultArray);

    } catch (error) {
      console.log(error)
    }
  }

  const Deletecourse = async (item) => {
    console.log(item.id)
    try {
      const docref = doc(db, "Courses", item.id);
      await deleteDoc(docref);
      console.log("delete successfully")
    } catch (error) {
      console.log(error)
    }
  }
  const SubmitFeedback = async () => {

    console.log(courseName)
    console.log(Cdescription)
    console.log(CImageUrl)
    try {
      await addDoc(collection(db, "Courses"), {
        Name: courseName,
        Description: Cdescription,
        ImageUrl: CImageUrl
      }).then((docRef) => {
        console.log(docRef.id)
        getOrderData();
      }).catch((error) => {
        console.log(error.code)
        console.log(error.message)
      });
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
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

            <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Name" onChange={(event) => setcourseName(event.target.value)} />
            <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course Detail" onChange={(event) => setCdescription(event.target.value)} />
            <TextField sx={{ width: 300 }} margin="normal" type={'text'} variant="outlined" placeholder="Course ImageUrl" onChange={(event) => setCImageUrl(event.target.value)} />
            {/* mui list code */}

            <Button
              sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
              variant="contained"
              color="warning"
              onClick={SubmitFeedback}
            >Add</Button>
            <Grid container spacing={2} alignContent="center">

              <Grid item xs={12} md={6}  >
                <Typography sx={{ mt: 4, mb: 2, }} variant="h6" component="div" marginLeft={7}>
                  Course List
                </Typography>
                <Demo sx={{ m: 1 }}>
                  <List dense={dense} >
                    {
                      orderDetail.length === 0 ? null :
                        orderDetail.map((item, index) => (
                          <ListItem
                            key={index}
                            sx={{ m: 3, width: 300 }}
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                <DeleteIcon onClick={() => Deletecourse(item)} />
                              </IconButton>
                            }
                          >
                            <ListItemAvatar   >
                              <Avatar>
                                <FolderIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <ListItemText
                                primary={item.Name}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                              <ListItemText

                                primary={item.Description}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                            </div>
                          </ListItem>
                        ))
                    }
                  </List>
                </Demo>
              </Grid>
            </Grid>

            {/* mui list code */}



          </Box>
        </form>
      </div>
    </>

  );
};

export default Course;
