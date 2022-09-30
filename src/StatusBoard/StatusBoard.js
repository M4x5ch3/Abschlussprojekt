import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChessBoard from "../ChessBoard/ChessBoard";
import { fetchGame } from "../FetchTasks";
import "./StatusBoard.css";

function StatusBoard(){
    const gameId = parseInt(useLocation().search.split("=")[1]);
    const [game, setGame] = useState(undefined);

    //gets board every second
    useEffect(() => {
        const interval = setInterval(async () => {
            await getGame(interval);
        }, 1000);
    }, []);

    const getGame = async() => setGame(await fetchGame(gameId));

    return(
        <>
            <div className="StatusBoard">
            {
                game !== undefined ? <ChessBoard board={game.board.squares}/> : <></>
            }
            </div>
        </>
    );
}

export default StatusBoard;