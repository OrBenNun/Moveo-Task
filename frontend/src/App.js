// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import LobbyPage from './LobbyPage';
import CodeBlockPage from './CodeBlockPage';
import io from 'socket.io-client';





function App() {

  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isMentor, setIsMentor] = useState(false);
  const [questions,setQuestions] = useState([]);

  const URL = 'http://localhost:5000/allcodequestion';

  const getQuestionFromDB = (url) =>{
      fetch(url).then(response => response.json()).then(data => {setQuestions(data)})
      .catch(error => console.error(error));

      console.log('got questions');
      console.log(questions);
  }

  useEffect(() => {
    getQuestionFromDB(URL);
    const newSocket = io(`http://localhost:5000`);
    setSocket(newSocket);

    newSocket.on('identification', (data) =>{
      // console.log(data);
      if(data.isMentor === true){
          setIsMentor(true);
          console.log('You are mentor now');
      } else {
          console.log('You are a student');
      }})

    //   newSocket.on('code-change',(data) =>{
    //     console.log('hereeee');
    //     // setTextBoxValue(data.value);
    // })
    // socket.emit('identification');
    return () => newSocket.close();
  }, []);
  const handleQuestionSelected = (flag) => {
    setSelectedQuestion(flag);
  };

  return (
    <Router>
        <div className="content">
          <NavBar />
          <Routes>
            <Route path="/" element={<LobbyPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} socket={socket} questions={questions}/>} />
            <Route path="/codeblock/:id" element={<CodeBlockPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} socket={socket} isMentor={isMentor} questions={questions}/>} />
            {/* <LobbyPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} /> */}
          </Routes>
          {/* <CodeBlockPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} /> */}
        </div>
       </Router>
  );
}

export default App;
