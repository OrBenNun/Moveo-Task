import Editor from "@monaco-editor/react";
import Reward from "./Reward";
import { useState } from "react";


const Student = ({textBoxValue,handleEditorChange, question}) => {

    const [solved,setSolved] = useState(false);

    const checkSolution = (solution) =>{
        const fixedSolution = solution.replace(/\r\n/g, '\n');
        let fixedQuestionSolution = question.solution.replace(/\r\n/g, '\n');

        if (fixedSolution === fixedQuestionSolution ){
            console.log('solution is good');
            setSolved(true);
            return true;
        }
        console.log('solution is wrong');
        return false;
    }
    return (  

            <div className="student-context">
                <h1>Student mode</h1>
                            {/* <p>Code page</p> */}
                            {/* <input 
                                    type="text" 
                                    value={textBoxValue} 
                                    onChange={handleEditorChange} 
                                    placeholder="Type something..." 
                                /> */}

                            {/* <p>You typed: {textBoxValue}</p> */}
                            {/* {!isMentor &&
                            <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>
                            } */}
                            {/* {isMentor &&<button >Show solution</button>} */}
                            {/* <button >Show solution</button> */}
                            {/* <p>{flag && question.name}</p>
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

                            {solved && <Reward />}

                            {/* !(typeof(socket) === undefined ) && !solved && <Editor */}
                            {!solved &&            <div>         <Editor
                                    height="50vh"
                                    width="100vh"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={textBoxValue}
                                    onChange={handleEditorChange}
                                    // options={{readOnly:false}}
                                    options={{ readOnly: false,
                                    }}
                                    
                                     
                                    
                                                                        
                                    // readOnly={false}
                                    // readOnly={isMentor}
                                /> 
                                <div className="submit-button">
                                    <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>
                                </div>
                                </div>
                            
                            // <Editor
                            //         height="50vh"
                            //         width="100vh"
                            //         language="javascript"
                            //         theme="vs-dark"
                            //         value={textBoxValue}
                            //         onChange={handleEditorChange}
                            //         // options={{readOnly:false}}
                            //         options={{ readOnly: false,
                            //         }}
                                    
                                     
                                    
                                                                        
                            //         // readOnly={false}
                            //         // readOnly={isMentor}
                            //     /> 
                                } 

                    {/* <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button> */}
                    {/* <Reward /> */}

            </div>
    );
}
 
export default Student;