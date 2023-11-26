import { useState, useEffect } from "react";

const LobbyPage = ({selectedQuestion, onQuestionSelected }) => {
    // const [isPressed,setIsPressed] = useState(false);
    const questions = 
    [
        { name:"Hello world!"},
        { name:"5+5"},
        { name:"Sort array"},
    ];

    // const handleQuestionClick = (itemName) =>{
    //     // setIsPressed(true);
    //     onQuestionSelected(true);
    // }

    // const handleBackClick = (itemName) =>{
    //     setIsPressed(false);
    // }

    return (  
        <div className="lobby-page">
            {/* <p>Lobby Page</p> */}

            {!selectedQuestion ? (
                
                        <div>
                            <p>Lobby Page</p>
                        {questions.map((question) => (
                        <div className="question-holder" key={question.id}>
                            <ul>
                                {/* <li onClick={() => handleQuestionClick(question.name)}>{question.name}</li> */}
                                <li onClick={() => onQuestionSelected(true)}>{question.name}</li>
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