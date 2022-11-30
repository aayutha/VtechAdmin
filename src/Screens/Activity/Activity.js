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

  const AddActivity = async () => {
    console.log(ActivityName)
    console.log(NOQuestion)
    console.log(d)
    try {
      await addDoc(collection(db, "Quiz"), {
        ActivityName: ActivityName,
        NOQues: NOQuestion,
        QuesArray: SelectedTech,
        PostDate: d
      }).then((docRef) => {
        console.log(docRef.id)
      }).catch((error) => {
        console.log(error.code)
        console.log(error.message)
      });
    } catch (error) {
      console.log(error);
    }

  }
  const SetOption = () => {
    SelectedTech.push(QuesOption1)
    SelectedTech.push(QuesOption2)
    SelectedTech.push(QuesOption3)
    SelectedTech.push(QuesOption4)
    console.log("language array", SelectedTech)
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

          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Name" onChange={(event) => setActivityName(event.target.value)} />

          <TextField InputProps={{ inputProps: { min: 1 } }} sx={{ width: 350 }} margin="normal" type={'number'} variant="outlined" placeholder="Number Of Question" onChange={(event) => setNOQuestion(event.target.value)} />
          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Enter Question" onChange={(event) => setQuestion(event.target.value)} />

          <Typography >
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 1" onChange={(event) => setQuesOption1(event.target.value)} />
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 2" onChange={(event) => setQuesOption2(event.target.value)} />

          </Typography>
          <Typography >
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 3" onChange={(event) => setQuesOption3(event.target.value)} />
            <TextField style={{ marginRight: '.5rem' }} InputProps={{ sx: { height: 40 } }} sx={{ width: 160 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 4" onChange={(event) => setQuesOption4(event.target.value)} />
          </Typography>
          <Button
            sx={{ marginTop: 3, borderRadius: 1, width: 150 }}
            variant="contained"
            color="warning"
            onClick={SetOption}

          >SetOption</Button>
          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Activity Assign to" />

          <Button
            sx={{ marginTop: 3, borderRadius: 3, width: 220 }}
            variant="contained"
            color="warning"
            onClick={AddActivity}

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
    </div>
  );
};

export default Activity;
