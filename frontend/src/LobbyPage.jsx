import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LobbyPage = ({selectedQuestion, onQuestionSelected, socket, questions }) => {
    const navagite = useNavigate(); 
    // const [isPressed,setIsPressed] = useState(false);
    const [isMentor,setIsMentor] = useState(false);

    // const questions = 
    // [
    //     { name:"Hello world!",_id:1},
    //     { name:"5+5",_id:2},
    //     { name:"Sort array",_id:3},
    // ];

    // useEffect(()=>{
    //     socket.on('identification', (data) =>{
    //         console.log('here2');
    //         console.log(data);
    //         console.log(data.isMentor);
    //         // let jsonData = JSON.parse(data);
    //         if(data.isMentor){
    //             setIsMentor(true);
    //             console.log('You are mentor now!');
    //         }
    //     });
    // },[socket])

    const handleQuestionClick = (_id) =>{
        socket.emit('identification');
        socket.emit('joinRoom', 'study-room');
        onQuestionSelected(true);
        navagite(`/codeblock/${_id}`);
    }

    // const handleBackClick = (itemName) =>{
    //     setIsPressed(false);
    // }

    return (  
        <div className="lobby-page">
            {/* <p>Lobby Page</p> */}

            {!selectedQuestion ? (
                
                        <div>
                            {/* <p>Lobby Page</p> */}
                        {questions.map((question) => (
                        <div className="question-holder" key={question._id}>
                            <ul>
                                {/* <li onClick={() => handleQuestionClick(question.name)}>{question.name}</li> */}
                                {/* <li onClick={() => onQuestionSelected(true)}>{question.name}</li> */}
                                <li onClick={() => {handleQuestionClick(question._id) 
                                    onQuestionSelected(true)}
                                    }>{question.name}</li>
                            </ul>
                        </div>
                    ))}
                      </div>
            ) : (
                <div>
                    <button onClick={() => onQuestionSelected(false)}>Back</button>
                </div>
                
            )
        }



        </div>
    );
}
 
export default LobbyPage


{/* <div className="lobby-page">
<p>Lobby Page</p>

{questions.map((question) => (
    <div className="question-holder" key={question.id}>
        <ul>
            <li onClick={() => handleClick(question.name)}>{question.name}</li>
        </ul>
    </div>
))}
</div> */}