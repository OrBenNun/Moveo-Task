import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Mentor from "./Mentor";
import Student from "./Student";
import '../css/codepage.css';

const CodeBlockPage = ({selectedQuestion, onQuestionSelected, socket, isMentor ,questions}) => {
    const [textBoxValue, setTextBoxValue] = useState('');
    const [flag,setFlag] = useState(false);
    const [question,setQuestion] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleBack = () =>{
        onQuestionSelected(false);
        navigate('/');
    }

    // Find the question using ID.
    const findQuestion = (id) =>{
        for (let index in questions){
            if (questions[index]._id === id){
                setFlag(true);
                setQuestion(questions[index]);
                return questions[index];
            }
        }
        return null;
    }

    // Socket code change between users.
    useEffect(()=>{
        socket.on('code-change',(data) =>{
            setTextBoxValue(data);
        })

    },[socket]);

    // On page load getting the question using the id prop.
    useEffect(()=>{
        findQuestion(parseInt(id));
    },[]);

    // Sending the code change from the user back the backend server.
    const handleEditorChange = (event) => {
        try{    
        socket.emit('code-change', event);
        setTextBoxValue(event);
        } catch (error) {
            console.error('Socket emit error:', error);
        }
    }

    return (  
        <div className="code-block-page">
            {selectedQuestion ? (
                
                <div className="code-block-page-content">

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
                <div/>
                
            )
        }
        </div>
    );
}
 
export default CodeBlockPage
