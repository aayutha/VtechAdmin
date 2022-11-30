import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { DataGrid } from '@mui/x-data-grid';

import Checkbox from "@material-ui/core/Checkbox";

const Feedback = () => {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [ReviewName, setReviewName] = useState("")
  const [QuizID, setQuizID] = useState('')
  const [UserID, setUserID] = useState('')
  const [Feedback, setFeedback] = useState("")
  const [orderDetail, setOrderDetail] = useState([]);

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "UserPerformance");
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
      const docref = doc(db, "UserPerformance", item.id);
      await deleteDoc(docref);
      console.log("delete successfully")
    } catch (error) {
      console.log(error)
    }
  }
  const SubmitFeedback = async () => {
    try {
      await addDoc(collection(db, "UserPerformance"), {
        AdminFeedback: Feedback,
        quizID: QuizID,
        UserID: UserID,
        ReviewerName: ReviewName
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
            <Typography variant="h5" padding={3} textAlign="center">Feedback Form</Typography>

            <TextField sx={{ width: 350 }} InputProps={{ sx: { height: 180 } }} margin="normal" type={'text'} variant="outlined" placeholder="Feedback" onChange={(event) => setFeedback(event.target.value)} />

            <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Reviewer Name" onChange={(event) => setReviewName(event.target.value)} />
            <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Quiz ID" onChange={(event) => setQuizID(event.target.value)} />
            <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="UserID" onChange={(event) => setUserID(event.target.value)} />

            <Button
              sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
              variant="contained"
              color="warning"
              onClick={SubmitFeedback}
            >Submit</Button>
            {/* <Grid container spacing={2} alignContent="center">

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
                                primary={item.ReviewerName}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                              <ListItemText

                                primary={item.AdminFeedback}
                                secondary={secondary ? 'Secondary text' : null}
                              />
                            </div>
                          </ListItem>
                        ))
                    }
                  </List>
                </Demo>
              </Grid>
            </Grid> */}

          </Box>
        </form>
      </div>
      <div style={{ height: "305px", margin: "auto", width: "auto", marginTop: "30px", marginBottom: "10%", borderRadius: "35px", }}>
        <h1>Feedback on assignment</h1>

        <DataGrid
          rows={
            orderDetail.map((item, index) => (
              { id: item.id, Description: item.AdminFeedback, Name: item.ReviewerName, UserID: item.UserID }
            ))}
          columns={[
            { field: 'id', headerName: 'ID', width: 260 },
            { field: 'Name', headerName: 'Name', width: 200 },
            { field: 'Feedback', headerName: 'Feedback', width: 300 },
            { field: 'UserID', headerName: 'UserID', width: 70 },

          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          style={{ margin: "auto", width: "auto", borderRadius: "5px", BorderColor: "black", width: "70%", border: "1px solid black" }}
        />


      </div>    </>
  );
};

export default Feedback;
