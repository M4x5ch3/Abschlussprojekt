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
          <Route path="/" element={<StartPage/>}/>
          <Route exact path="/help" element={<Help/>}/>
          <Route exact path="/launchgame" element={<LaunchGame userId={0}/>}/>
          <Route exact path="/customizegame" element={<CustomizeGame/>}/>
          <Route exact path="/game" element={<Game/>}/>
          <Route path="/statusboard" element={<StatusBoard/>}/>
          <Route exact path="/finishedgame" element={<FinishedGame/>}/>
        </Routes>
      </Router>
    )
}

export default App;