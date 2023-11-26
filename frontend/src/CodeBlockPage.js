import { useState, useEffect } from "react";

const CodeBlockPage = ({selectedQuestion, onQuestionSelected }) => {
    const [textBoxValue, setTextBoxValue] = useState('');
    const handleTextBoxChange = (event) => {
        setTextBoxValue(event.target.value);
    }

    return (  
        <div className="code-block-page">
            {/* <p>Lobby Page</p> */}

            {selectedQuestion ? (
                
                        <div className="code-block-page-content">
                            <p>Code page</p>
                            <input 
                                    type="text" 
                                    value={textBoxValue} 
                                    onChange={handleTextBoxChange} 
                                    placeholder="Type something..." 
                                />

                            {/* <p>You typed: {textBoxValue}</p> */}
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
