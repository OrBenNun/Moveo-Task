import { useNavigate } from "react-router-dom";
import '../css/lobbypage.css';

const LobbyPage = ({selectedQuestion, onQuestionSelected, socket, questions }) => {
    const navagite = useNavigate(); 

    // Getting the user role from the backend server and updating the question.
    const handleQuestionClick = (_id) =>{
        socket.emit('identification');
        socket.emit('joinRoom', 'study-room');
        onQuestionSelected(true);
        navagite(`/codeblock/${_id}`);
    }

 

    return (  
        <div className="lobby-page">

            {!selectedQuestion ? (
                
            <div>
                    <h1>Pick a question:</h1>
                {/* Looping the question from the DB */}
                {questions.map((question) => (
                <div className="question-holder" key={question._id}>
                    <ul>
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

