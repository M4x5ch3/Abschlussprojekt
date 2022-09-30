import React, {useState} from "react";
import { useNavigate, useLocation } from "react-router";
import {fetchPlayers, postPlayer, postStandardGame} from "../FetchTasks";
import "./LaunchGame.css";

function LaunchGame(props){
    const { userId } = useLocation().state;
    const [secondPlayerId, setSecondPlayerId] = useState(0);
    const [isSecondPlayerAI, setIsSecondPlayerAI] = useState(false);
    const navigate = useNavigate();

    //posts game
    const handleGamePost = async () =>{
        let player;
        if(isSecondPlayerAI)
        {
            player = await postPlayer("COM", false);
        }
        else
        {
            let players = await fetchPlayers();
            for(let i = 0; i < players.players.length; i++)
            {
                let val = players.players[i];
                if(parseInt(val.id) === parseInt(secondPlayerId) && parseInt(val.id) !== parseInt(userId))
                {
                    player = val;
                    break;
                }
            }
            if(player === undefined)
            {
                alert("Spieler konnte nicht gefunden werden!");
                return;
            }
        }
        let game = await postStandardGame([userId, player.id]);
        navigate("/game", {state:{gameId:game.id, initialBoard:[
            [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1]
        ], user:userId, timer:60000, figure:0}});
    }

    const navigateToCustomizedGame = async () => {
        if(isSecondPlayerAI === true)
        {
            let player = await postPlayer("COM", false);
            navigate("/customizegame", {state:{firstPlayer:userId, secondPlayer:player.id}});
        }
        else
        {
            navigate("/customizegame", {state:{firstPlayer:userId, secondPlayer:secondPlayerId}});
        }
    }

    return(
        <div className="Launch_screen">
            <div className="Launch_header">
                <h2>
                    Spiel starten
                </h2>
            </div>
            <div className="Launch_text">
                <p>
                    <span id="bold">
                        Zugzeit:
                    </span> 60s
                </p>
                <p>
                    <span id="bold">
                        Spieler 1:
                    </span> {props.playerId}
                </p>
                <label>
                    <input type="checkBox" checked={isSecondPlayerAI} onChange={() => {setIsSecondPlayerAI(!isSecondPlayerAI)}}/>
                    Spieler vs. COM
                </label>
            </div>
            {
                isSecondPlayerAI ?
                <></>
                :
                <div className="Launch_text">
                    <p>
                        <span id="bold">Spieler 2:</span>
                    </p>
                    <input className="player2_input" type="number" value={secondPlayerId} onChange={(event) => { setSecondPlayerId(event.target.value); }}/>
                </div>
            }
            <div className="Launch_button_container">
                <button onClick={() => { handleGamePost(); }} className="Launch_button">
                    Starte Spiel mit Standard- einstellungen
                </button>
                <button className="Launch_button" type="button" onClick={() => {navigateToCustomizedGame()}}>
                    Starte angepasstes Spiel
                </button>
            </div>
        </div>
    )
}

export default LaunchGame;