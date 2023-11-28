import Editor from "@monaco-editor/react";

const Mentor = ({textBoxValue,handleEditorChange}) => {
    return (  

            <div className="mentor-context">
                <h1>Mentor mode</h1>
                            {/* <p>Code page</p> */}
                            {/* <input 
                                    type="text" 
                                    value={textBoxValue} 
                                    onChange={handleEditorChange} 
                                    placeholder="Type something..." 
                                    readOnly={true}
                                /> */}

                            {/* <p>You typed: {textBoxValue}</p> */}
                            {/* {!isMentor &&
                            <button onClick={() => checkSolution(textBoxValue)}>Sumbit</button>
                            } */}

                            {/* {isMentor &&<button >Show solution</button>} */}
                            {/* <button >Show solution</button> */}
                            {/* <p>{flag && question.name}</p> */}
                            {/* <p>{id}</p> */}

                            {/* <SyntaxHighlighter language="javascript" style={atomDark}
                            customStyle={{
                                width:"1000px",
                                height: "500px",
                                padding:"25px",
                            }}
>
                                {textBoxValue}
                            </SyntaxHighlighter> */}

                            {!(typeof(socket) === undefined ) && <Editor
                                    height="50vh"
                                    width="100vh"
                                    language="javascript"
                                    theme="hc-ligh"
                                    value={textBoxValue}
                                    onChange={handleEditorChange}
                                    
                                    options={{readOnly:true}}
                                    // options={{readOnlyMessage:true}}
                                    
                                    
                                    // readOnly={false}
                                    // readOnly={isMentor}
                                /> } 
            </div>
    );
}
 
export default Mentor;