import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from './components/NavBar';
import LobbyPage from './components/LobbyPage';
import CodeBlockPage from './components/CodeBlockPage';
import io from 'socket.io-client';

function App() {

  // Boolean flag for enabling question selection.
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isMentor, setIsMentor] = useState(false);
  const [questions,setQuestions] = useState([]);

  const URL = 'https://live-session-backend.onrender.com:5000/allcodequestion';
  const socketPath = 'https://live-session-backend.onrender.com:5000';

  // Getting the Question from the DB.
  const getQuestionFromDB = (url) =>{
      fetch(url).then(response => response.json()).then(data => {setQuestions(data)})
      .catch(error => console.error(error));
  }

  // Setting the question and role on app loading.
  useEffect(() => {
    getQuestionFromDB(URL);
    const newSocket = io(socketPath);
    setSocket(newSocket);

    newSocket.on('identification', (data) =>{
      if(data.isMentor === true){
          setIsMentor(true);
          console.log('You are mentor now');
      } else {
          console.log('You are a student');
      }})

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
          </Routes>
        </div>
       </Router>
  );
}

export default App;
