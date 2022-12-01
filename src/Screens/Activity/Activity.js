import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
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
import ActivityQuestions from './ActivityQuestions';
const Activity = () => {
  const [dense, setDense] = React.useState(false);
  const [ActivityName, setActivityName] = useState('')
  const [NOQuestion, setNOQuestion] = useState(0)
  const [Question, setQuestion] = useState("")
  const [QuesOption1, setQuesOption1] = useState("")
  const [QuesOption2, setQuesOption2] = useState("")
  const [QuesOption3, setQuesOption3] = useState("")
  const [QuesOption4, setQuesOption4] = useState("")
  const [SelectedTech] = useState([])
  const [orderDetail, setOrderDetail] = useState([]);
  const [assignedID, setassignedID] = useState("")
  const [secondary, setSecondary] = React.useState(false);

  const d = new Date("2022-03-25")
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  useEffect(() => {
    getOrderData();
  }, [])
  const getOrderData = async () => {
    let resultArray = [];
    const docRef = collection(db, "Quiz");
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

  const DeleteActivity = async (item) => {
    console.log(item.id)
    try {
      const docref = doc(db, "Quiz", item.id);
      await deleteDoc(docref);
      console.log("delete successfully")
      getOrderData();
    } catch (error) {
      console.log(error)
    }
  }
  const setnumques=(num)=>{
    if(num.target.value>5){
      alert("MAximum 5 questions are allow");
      return;
    }
    setNOQuestion(num.target.value)
  }
  return (
    <div style={{
      display:"flex",
      width:"100%",
      justifyContent: 'space-around',
    }}>
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

          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Name" onChange={(event) => setActivityName(event.target.value)} />

          <TextField InputProps={{ inputProps: { min: 1 } }} sx={{ width: 350 }} margin="normal" type={'number'} variant="outlined" placeholder="Number Of Question" 
            onChange={(event) => setnumques(event)} />
          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Assign to" />
          <Grid container spacing={2} alignContent="center">

            <Grid item xs={12} md={6}  >
              <Typography sx={{ mt: 4, mb: 2, }} variant="h6" component="div" marginLeft={7}>
                Quiz List
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
                              <DeleteIcon onClick={() => DeleteActivity(item)} />
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
                              primary={item.ActivityName}
                              secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemText

                              primary={item.id}
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
        </Box>
      </form>
      {
        NOQuestion===0?null:
        <ActivityQuestions
          numofQues={NOQuestion}
          activityName={ActivityName}
        />
      }
    </div>
  );
};

export default Activity;
