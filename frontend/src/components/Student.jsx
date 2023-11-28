import Editor from "@monaco-editor/react";
import Reward from "./Reward";
import { useState } from "react";
import '../css/student.css';

const Student = ({textBoxValue,handleEditorChange, question}) => {

    // Boolean to reveal the reward.
    const [solved,setSolved] = useState(false);

    // Check if the code is correct.
    const checkSolution = (solution) =>{
        // Deaing with space/tabs and etc...
        const fixedSolution = solution.replace(/\r\n/g, '\n');
        let fixedQuestionSolution = question.solution.replace(/\r\n/g, '\n');

        if (fixedSolution === fixedQuestionSolution ){
            console.log('Solution is good');
            setSolved(true);
            return true;
        }
        console.log('Solution is wrong');
        return false;
    }

    return (  

            <div className="student-context">
                <h1>Student mode</h1>

                {solved && <Reward />}

                {!solved &&            
                <div> 
                    <Editor
                        height="50vh"
                        width="100vh"
                        language="javascript"
                        theme="vs-dark"
                        value={textBoxValue}
                        onChange={handleEditorChange}
                        options={{ readOnly: false,
                        }}
                        
                    /> 
                    <div className="submit-button">
                        <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>
                </div>
            </div>} 
        </div>
    );
}
 
export default Student;