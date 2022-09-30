import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Help from '../Help/Help.js';
import StartPage from "../StartPage/StartPage";
import LaunchGame from "../LaunchGame/LaunchGame";
import CustomizeGame from "../CustomizeGame/CustomizeGame";
import NotFound from "../NotFound/NotFound";
import Game from "../Game/Game";
import StatusBoard from "../StatusBoard/StatusBoard";
import FinishedGame from "../FinishedGame/FinishedGame";

function App() {

    return(
      <Router>
        <Routes>
          <Route path="https://m4x5ch3.github.io/Abschlussprojekt/" element={<StartPage/>}/>
          <Route exact path="https://m4x5ch3.github.io/Abschlussprojekt/help" element={<Help/>}/>
          <Route exact path="https://m4x5ch3.github.io/Abschlussprojekt/launchgame" element={<LaunchGame userId={0}/>}/>
          <Route exact path="https://m4x5ch3.github.io/Abschlussprojekt/customizegame" element={<CustomizeGame/>}/>
          <Route exact path="https://m4x5ch3.github.io/Abschlussprojekt/game" element={<Game/>}/>
          <Route path="https://m4x5ch3.github.io/Abschlussprojekt/statusboard" element={<StatusBoard/>}/>
          <Route exact path="https://m4x5ch3.github.io/Abschlussprojekt/finishedgame" element={<FinishedGame/>}/>
        </Routes>
      </Router>
    )
}

export default App;