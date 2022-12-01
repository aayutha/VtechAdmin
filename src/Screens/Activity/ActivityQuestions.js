import React,{useEffect, useState} from 'react';
import { db } from "../../firebase";
import { addDoc, collection, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import {  TextField } from "@mui/material";
import Button from '@mui/material/Button';
import './Activity.css';
const ActivityQuestions=(props)=>{
    const [loading, setLoading] = useState(false);
//ques arrays
    const [quizQues,setQuizQues]=useState([]);
    const [optionsArray,setOptionArray]=useState(["","","",""]);
    const [faculty,setFaculty]=useState(null);
    const [imageUrl,setImageUrl]=useState(null);
    const [noOfQues,setNoOfQues]=useState(2);
    useEffect(()=>{
        const questionsArray=[];
        for (let i = 0; i < props.numofQues; i++) {
            questionsArray.push({
                correctAnswerIndex:-1,
                question:"",
                options:[
                    {_id:1,answer:"",option:"A"},
                    {_id:2,answer:"",option:"B"},
                    {_id:3,answer:"",option:"C"},
                    {_id:4,answer:"",option:"D"},
                ],
                correctOptionDropDowns:[
                    {label: 'A', value: 'A'},
                    {label: 'B', value: 'B'},
                    {label: 'C', value: 'C'},
                    {label: 'D', value: 'D'},
                ]
            })
        }
        setQuizQues(questionsArray);
    },[props.numofQues])

    const handleQuesChange=(ques,selectedIndex)=>{
        setQuizQues((question) =>
            question.map((val,index) => {
                if (index ===selectedIndex) {
                    val.question = ques.target.value
                }
                return val;
            })
        );
    }
    const handleOptions=(options_val,quesindex,optIndex)=>{
            setQuizQues((question) =>
                question.map((val,index) => {
                    if (index ===quesindex) {
                        for (let i = 0; i < val.options.length; i++) {
                            if(i===optIndex){
                                val.options[i].answer=options_val.target.value;
                                val.correctOptionDropDowns[i].label=options_val.target.value;
                            }
                        }
                    }
                    return val;
                })
            );
    }
    const handleCorrectOption=(item,quesindex)=>{
        setQuizQues((question) =>
            question.map((val,index) => {
                if (index === quesindex) {
                    for (let i = 0; i < val.options.length; i++) {
                        if(item===val.options[i].answer){
                            val.correctAnswerIndex=i;
                        }
                    }
                }
                return val;
            })
        );
    }
    const uploadQuizData=()=>{
         if(loading){
            console.log("Please Wait for Adding New Quiz");
            return ;
        }
        try {
            quizQues.forEach(item => {
                if(item.question==="")
                    throw "Please Enter All The Questions";
                if(item.correctAnswerIndex===-1)
                    throw "Please select correct options for question";
                item.options.forEach((optVal)=>{
                    if(optVal==="")
                        throw "Please Enter Options";
                })
            });
            let updatedQuizFormat=changeQuizArrayFormat();
            uploadToFireBase(updatedQuizFormat)
        } catch (error) {
            alert(error)
        }
    }
    const changeQuizArrayFormat=(updatedQuizFormat)=>{
        let updatedQuizQuestionArray=[];
        quizQues.forEach((item)=>{
            updatedQuizQuestionArray.push({
                correctAnswerIndex:item.correctAnswerIndex,
                options:item.options,
                question:item.question
            });
        })
        return updatedQuizQuestionArray;
    }
    const uploadToFireBase=(updatedQuizFormat)=>{
        console.log(updatedQuizFormat,props.activityName,props.numofQues)
        try {
            setLoading(true);
            addDoc(collection(db, "Quiz"), {
                ActivityName: props.activityName,
                NOQues: props.numofQues,
                QuesArray: updatedQuizFormat,
            }).then((docRef) => {
                setLoading(false);
            }).catch((error) => {
                console.log(error.code)
                console.log(error.message)  
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <div className='main-questinos' >
            <h1 style={{padding:10,fontWeight:"bold",fontSize:20}}>Add Questions</h1>
            <div>
                {
                    quizQues.map((item,index)=>(
                        <div style={{
                            width:400,
                            display:"flex",
                            flexDirection: "column",
                            alignItems:"center",
                            marginTop: 10,
                            marginBottom:10
                        }} className="qustion-div">
                            <div style={{width:'100%',}}>
                                <h3 style={{fontWeight:"bold",textAlign:"left",marginLeft:17}}>Question {index+1}</h3>
                                <TextField 
                                    style={{ marginRight: '.5rem',marginLeft:"5px"  }} 
                                    InputProps={{ sx: { height: 40} }} 
                                    sx={{ width: '80%' }} 
                                    margin="normal" 
                                    type={'text'} 
                                    variant="outlined" 
                                    placeholder='Enter question'
                                    onChange={(ques)=>handleQuesChange(ques,index)}
                                />
                                <div style={{display:'flex',flexDirection: 'column',alignItems:"center",width:'100%'}}>
                                    <h3 style={{fontWeight:"bold",textAlign:"left",width:"100%",marginLeft:35}}>Options</h3>
                                    {
                                        optionsArray.map((opt,optIndex)=>(
                                            <TextField 
                                                style={{ marginRight: '.5rem',marginLeft:"5px"  }} 
                                                InputProps={{ sx: { height: 40 } }} 
                                                sx={{ width: '80%' }} 
                                                margin="normal" 
                                                type={'text'} 
                                                variant="outlined" 
                                                placeholder={`Enter option ${optIndex+1}`} 
                                                onChange={(options_val)=>handleOptions(options_val,index,optIndex)}
                                            />
                                        ))
                                    }
                                </div>
                                <h3 style={{fontWeight:"bold"}}>Correct answer</h3>
                                <select  
                                    style={{
                                        width:'80%',
                                        height:40,
                                        margin:10,
                                        textAlign:"left"
                                    }}
                                    onChange={(item)=>handleCorrectOption(item.target.value,index)}>
                                    {
                                        item.correctOptionDropDowns.map((value,selectIndex)=>(
                                            <option style={{marginTop:5}}>{value.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Button 
                variant="contained" 
                sx={{width:"80%"}}
                color="warning"
                onClick={uploadQuizData}>Post Quiz</Button>
        </div>
    )
}
export default ActivityQuestions;