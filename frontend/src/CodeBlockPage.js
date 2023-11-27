import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
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

    const findQuestion = (id) =>{
        console.log('here');
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

    const handleTextBoxChange = (event) => {
        setTextBoxValue(event.target.value);
        socket.emit('code-change',event.target.value)
    }

    const checkSolution = (solution) =>{
        if (solution === question.solution ){
            console.log('solution is good');
            return true;
        }
        console.log('solution is wrong');
        return false;
    }


    useEffect(()=>{
        socket.on('code-change',(data) =>{
            setTextBoxValue(data);
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

    return (  
        <div className="code-block-page">
            {/* <p>Lobby Page</p> */}
            {/* {socket.emit('identification')} */}
            {selectedQuestion ? (
                
                        <div className="code-block-page-content">
                            {isMentor ? <h1>Mentor mode</h1>:<h1>Student mode</h1>}
                            <p>Code page</p>
                            <input 
                                    type="text" 
                                    value={textBoxValue} 
                                    onChange={handleTextBoxChange} 
                                    placeholder="Type something..." 
                                    readOnly={isMentor}
                                />

                            <p>You typed: {textBoxValue}</p>
                            <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>

                            <p>{flag && question.name}</p>
                            <p>{id}</p>
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
