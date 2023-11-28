import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import io from 'socket.io-client';
import Editor from "@monaco-editor/react";
import Mentor from "./Mentor";
import Student from "./Student";
const socketIOClient = require('socket.io-client');

// const socket = socketIOClient('http://localhost:5000');
// const socket = io.connect('http://localhost:5000');

// import io from 'socket.io-client';



const CodeBlockPage = ({selectedQuestion, onQuestionSelected, socket, isMentor ,questions}) => {
    const [textBoxValue, setTextBoxValue] = useState('');
    const [flag,setFlag] = useState(false);
    const [question,setQuestion] = useState(null);
    // const [isMentor,setIsMentor] = useState(false);
    // const [socket, setSocket] = useState(null);

    const { id } = useParams();

    const navigate = useNavigate();

    const handleBack = () =>{
        onQuestionSelected(false);
        navigate('/');
    }

    const findQuestion = (id) =>{
        console.log('here');
        console.log('id is:',id);
        for (let index in questions){
            if (questions[index]._id === id){
                console.log('found question');
                setFlag(true);
                setQuestion(questions[index]);
                return questions[index];
            }
        }
        return null;
    }

    // const handleTextBoxChange = (event) => {
    //     setTextBoxValue(event.target.value);
    //     socket.emit('code-change',event.target.value)
    // }

    // const handleTextBoxChange = (event) => {
    //     try {
    //         setTextBoxValue(event.target.value);
    //         console.log(socket);
    //         socket.emit('code-change', textBoxValue);
    //     } catch (error) {
    //         console.error('Socket emit error:', error);
    //     }
    // }
    // const checkSolution = (solution) =>{
    //     const fixedSolution = solution.replace(/\r\n/g, '\n');
    //     let fixedQuestionSolution = question.solution.replace(/\r\n/g, '\n');

    //     if (fixedSolution === fixedQuestionSolution ){
    //         console.log('solution is good');
    //         return true;
    //     }
    //     console.log('solution is wrong');
    //     return false;
    // }


    useEffect(()=>{
        socket.on('code-change',(data) =>{
            setTextBoxValue(data);
            // handleTextBoxChange(data);
        })

    },[socket]);

    useEffect(()=>{
        findQuestion(parseInt(id));
    },[]);

    // useEffect(()=>{
    //     // const socket = io.connect('http://localhost:5000');
    //     // setSocket(socket);
    //     socket.emit('identification');

        // socket.on('identification', (data) =>{
        //     // console.log(data);
        //     if(data.isMentor === true){
        //         setIsMentor(true);
        //         console.log('fuck you you are mentor now');
        //     } else {
        //         console.log('You are a student');
        //     }
            
    //     });


    // },[socket]);

    // useEffect(() => {
    //     const newSocket = io(`http://localhost:5000`);
    //     setSocket(newSocket);
    //     // socket.emit('identification');
    //     return () => newSocket.close();
    //   }, []);

    // console.log(socket);

    const handleEditorChange = (event) => {
    try{    
        // console.log('event is',event);
        // console.log(typeof(isMentor));
        // console.log(isMentor);
        socket.emit('code-change', event);
        setTextBoxValue(event);
    } catch (error) {
        console.error('Socket emit error:', error);
    }
    }

    return (  
        <div className="code-block-page">
            {/* <p>Lobby Page</p> */}
            {/* {socket.emit('identification')} */}
            {selectedQuestion ? (
                
                        <div className="code-block-page-content">
                            {/* {isMentor ? <h1>Mentor mode</h1>:<h1>Student mode</h1>} */}
                            {/* <p>Code page</p> */}
                            {/* <input 
                                    type="text" 
                                    value={textBoxValue} 
                                    onChange={handleTextBoxChange} 
                                    placeholder="Type something..." 
                                    readOnly={isMentor}
                                /> */}

                            {/* <p>You typed: {textBoxValue}</p>
                            {!isMentor &&
                            <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>
                            } */}
{/* 
                            {isMentor &&<button >Show solution</button>}
                            <p>{flag && question.name}</p>
                            <p>{id}</p> */}

                            {/* <SyntaxHighlighter language="javascript" style={atomDark}
                            customStyle={{
                                width:"1000px",
                                height: "500px",
                                padding:"25px",
                            }}
>
                                {textBoxValue}
                            </SyntaxHighlighter> */}

                            {/* {!(typeof(socket) === undefined ) && <Editor
                                    height="100vh"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={textBoxValue}
                                    onChange={handleEditorChange}
                                    
                                    options={{readOnly:isMentor}}
                                    
                                    // readOnly={false}
                                    // readOnly={isMentor}
                                /> }  */}

                    {question && 
                    <div className="question-context">
                                
                                <h1>Question name: {question.name}</h1>
                                <p>Description: </p>
                                <pre>{question.description}</pre>
                    </div>
                    }
                    <div className="editor-context">
                            
                                {question && isMentor ? 
                                
                                <Mentor textBoxValue={textBoxValue} 
                                        handleEditorChange={handleEditorChange}/> 
                                : <Student 
                                    textBoxValue={textBoxValue} 
                                    handleEditorChange={handleEditorChange}
                                    question={question} />}

                                    <div className="back-buttom">
                                    <button onClick={handleBack}>Back</button>
                                    </div>
                                    
                      </div>
                      </div>
                    
            ) : (
                <div>
                    {/* <button onClick={() => onQuestionSelected(false)}>Back</button> */}
                </div>
                
            )
        }


        </div>
    );
}
 
export default CodeBlockPage
