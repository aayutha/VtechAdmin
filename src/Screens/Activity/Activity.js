import React, { useState, useEffect } from "react";
import { Box,  TextField, Typography } from "@mui/material";
import { db } from "../../firebase";
import { addDoc, collection, } from "firebase/firestore";
import { styled } from '@mui/material/styles';
import ActivityQuestions from './ActivityQuestions';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import './Activity.css';
const Activity = () => {
  const [ActivityName, setActivityName] = useState('')
  const [NOQuestion, setNOQuestion] = useState('')

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const setnumques=(num)=>{
    if(num.target.value>5){
      alert("MAximum 5 questions are allow");
      return;
    }
    setNOQuestion(num.target.value)
  }
  const uploadToFireBase=(updatedQuizFormat)=>{
    try {
        addDoc(collection(db, "Quiz"), {
            ActivityName: ActivityName,
            NOQues: NOQuestion,
            QuesArray: updatedQuizFormat,
        }).then((docRef) => {
           console.log("Quiz added");
        }).catch((error) => {
            console.log(error.code)
            console.log(error.message)  
        });
    } catch (error) {
        console.log(error);
    }
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
          <Typography 
            variant="h5" 
            padding={3} 
            textAlign="center">
            Activity
          </Typography>

          <TextField 
            sx={{ width: 350 }} 
            margin="normal" 
            type={'text'} 
            variant="outlined" 
            placeholder="Activity Name" 
            onChange={(event) => setActivityName(event.target.value)} 
          />
          <TextField 
              InputProps={{ inputProps: { min: 1 } }} sx={{ width: 350 }} 
              margin="normal" type={'number'} 
              variant="outlined" 
              placeholder="Number Of Question" 
              onChange={(event) => setnumques(event)} 
            />
          <button className="buttonDivList">
            <Link
              style={{
                textDecoration:'none',
                color:"white"
              }}
              to="listactivity">Go To List</Link>
          </button>
        </Box>
      </form>
      {
        NOQuestion===''?null:
        <ActivityQuestions
          numofQues={NOQuestion}
          uploadFunction={uploadToFireBase}
          title="Post Quiz"
          alreadyUploadedQuiiz={null}
          message={"Created"}
        />
      }
    </div>
  );
};

export default Activity;
