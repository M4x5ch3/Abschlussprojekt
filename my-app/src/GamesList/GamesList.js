import React, { useState } from "react";
import {fetchGames, fetchGame} from "../FetchTasks";
import { useNavigate } from "react-router-dom";
import "./GamesList.css";

function GamesList(props){
    const navigate = useNavigate();
    const [games, setGames] = useState(
        async() =>{
            let game = await fetchGames();
            setGames(game.games);
        });

    const getGameStatus = async (id) => {
        window.open("/statusboard?id=" + id, "_blank");
    }

    const joinGame = async(id) => {
        let game = await fetchGame(id);
        navigate("/game", {state:{gameId:id, initialBoard:game.board.squares, user:props.player, timer:game.remainingTurnTime, figure:1}});
    }

    return(
        <div className="gameslist_container">
            <div className="gameslist_caption">
                <h3>
                    Aktuelle Spiele:
                </h3>
            </div>
            <ul className="gameslist">
                {games.length === 0 ? <div>Keine Spiele gefunden.</div> :
                    Array.from(games).map(game =>
                        <li key={game.id} trigger={"Spiel " + game.id} className="gameslist_item">
                            <p className="player">
                                Spieler 1: {game.players[0].name}
                            </p>
                            <p className="player">
                                Spieler 2: {game.players[1].name}
                            </p>
                            <div className="gameslist_button_area">
                                <button onClick={() => {getGameStatus(game.id);}} className="gameslist_button">
                                    Status abfragen
                                </button>
                                {game.players[1].id === props.player ? <button className="gameslist_button" onClick={() => {joinGame(game.id);}}>Spiel beitreten</button> : <></>}
                            </div>
                        </li>
                    )
                }
            </ul>
            <div className="reload_button_container">
                <button className="reload_button" onClick={async() =>{let games = await fetchGames(); setGames(games.games);}}>Laden</button>
            </div>
        </div>
    )
}

export default GamesList;