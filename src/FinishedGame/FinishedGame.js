import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postGame, fetchGames, fetchGame } from "../FetchTasks";
import "./FinishedGame.css";

function FinishedGame(){
    const { winner, creatorId, userId, initialBoard, secondPlayer, turnTime } = useLocation().state;
    const navigate = useNavigate();

    const startNewGame = () => {
        navigate("/launchgame", {state:{userId:userId}});
    }

    const joinGame = async () => {
        let games = await fetchGames();
        for(let i = 0; i < games.games.length; i++)
        {
            if(games.games[i].players[0].id === creatorId && games.games[i].players[1].id === userId && games.games[i].winningPlayer === undefined)
            {
                let join = await fetchGame(games.games[i].id);
                navigate("/game", {state:{gameId:join.id, initialBoard:join.board.squares, user:userId, timer:join.turnTime, figure:1}});
            }
        }
        window.alert("Host hat kein Spiel gestartet.");
    }

    const restartGame = async() => {
        let game = await postGame(turnTime, [creatorId, secondPlayer], initialBoard.length, initialBoard[0].length, initialBoard);
        navigate("/game", {state:{gameId:game.id, initialBoard:initialBoard, user:userId, timer:turnTime, figure:0}});
    }

    return(
        <div className="finished_container">
            <h1>
                Spiel beendet!
            </h1>
            <h2>
                "{winner}" hat das Spiel gewonnen.
            </h2>
            <div className="finished_button_container">
                {creatorId === userId ? 
                    <button onClick={() => {restartGame()}} className="finished_button">
                        Spiel erneut starten
                    </button> 
                    : 
                    <button onClick={() => {joinGame()}} className="finished_button">
                        Rematch beitreten
                    </button>
                }
                <button onClick={() => {startNewGame()}} className="finished_button">
                    Neues Spiel starten
                </button>
            </div>
        </div>
    );
}

export default FinishedGame;