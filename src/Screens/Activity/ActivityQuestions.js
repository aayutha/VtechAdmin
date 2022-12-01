import React,{useEffect, useState} from 'react';
import {  TextField } from "@mui/material";
import Button from '@mui/material/Button';
import './Activity.css';
const ActivityQuestions=(props)=>{
    const [loading, setLoading] = useState(false);
//ques arrays
    const [quizQues,setQuizQues]=useState([]);
    const [optionsArray,setOptionArray]=useState(["","","",""]);
    useEffect(()=>{
        let questionsArray=[];
        if(props.alreadyUploadedQuiiz===null){
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
        }
        else{
            for(let i=0;i<props.numofQues;i++){
                questionsArray.push({
                    correctAnswerIndex:props.alreadyUploadedQuiiz[i].correctAnswerIndex,
                    question:props.alreadyUploadedQuiiz[i].question,
                    options:props.alreadyUploadedQuiiz[i].options,
                    correctOptionDropDowns:[
                        {label: 'A', value: 'A'},
                        {label: 'B', value: 'B'},
                        {label: 'C', value: 'C'},
                        {label: 'D', value: 'D'},
                    ]
                })
            }
            console.log(questionsArray)
            setQuizQues(questionsArray)
        }
    },[props.numofQues,setQuizQues])

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
    const uploadQuizData=async()=>{
         if(loading){
            console.log("Please Wait for Adding New Quiz");
            return ;
        }
        try {
            setLoading(true);
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
            await props.uploadFunction(updatedQuizFormat);
            alert(`Quiz ${props.message}`);
            setLoading(false);
        } catch (error) {
            alert(error)
            setLoading(false);
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
                                    value={item.question}
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
                                                value={opt.answer}
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
                                            <option value={value.label} style={{marginTop:5}}>{value.label}</option>
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
                onClick={uploadQuizData}>
                    {props.title}
            </Button>
        </div>
    )
}
export default ActivityQuestions;