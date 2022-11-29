import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import Checkbox from "@material-ui/core/Checkbox";

const Activity = () => {
  const [ActivityName, setActivityName] = useState('')
  const [NOQuestion, setNOQuestion] = useState(0)
  const [Question, setQuestion] = useState("")
  const [QuesOption1, setQuesOption1] = useState("")
  const [QuesOption2, setQuesOption2] = useState("")
  const [QuesOption3, setQuesOption3] = useState("")
  const [QuesOption4, setQuesOption4] = useState("")
  const [SelectedTech] = useState([])


  const [assignedID, setassignedID] = useState("")
  const d = new Date("2022-03-25")
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


        </Box>
      </form>
    </div>
  );
};

export default Activity;
