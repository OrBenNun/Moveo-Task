import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from "react";
import NavBar from './NavBar';
import LobbyPage from './LobbyPage';
import CodeBlockPage from './CodeBlockPage';




function App() {

  const [selectedQuestion, setSelectedQuestion] = useState(false);

  const handleQuestionSelected = (flag) => {
    setSelectedQuestion(flag);
  };

  return (
    // <Router>
        <div className="content">
          <NavBar />
          <LobbyPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} />
          <CodeBlockPage selectedQuestion={selectedQuestion} onQuestionSelected={handleQuestionSelected} />
        </div>
      // </Router>
  );
}

export default App;
