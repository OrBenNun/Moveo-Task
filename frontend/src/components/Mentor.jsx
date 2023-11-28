import Editor from "@monaco-editor/react";
import '../css/mentor.css';

const Mentor = ({textBoxValue,handleEditorChange}) => {
    return (  

            <div className="mentor-context">
                <h1>Mentor mode</h1>
                        

                            {!(typeof(socket) === undefined ) && <Editor
                                    height="50vh"
                                    width="100vh"
                                    language="javascript"
                                    theme="hc-ligh"
                                    value={textBoxValue}
                                    onChange={handleEditorChange}
                                    
                                    options={{readOnly:true}}

                                /> } 
            </div>
    );
}
 
export default Mentor;