import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Game.css';
import ChessBoard from "../ChessBoard/ChessBoard";
import {fetchGame, postMove} from "../FetchTasks";

//handles game logic
function Game(){
    const { gameId, initialBoard, user, timer, figure } = useLocation().state;
    const navigate = useNavigate();
    const [_game, setGame] = useState(gameGetter);
    const [board, setBoard] = useState(initialBoard);
    const [ticker, setTicker] = useState(timer);
    const [moves, setMoves] = useState([]);

    const gameGetter = async() => {
        let game = await fetchGame(gameId);
        setGame(game);
    }

    //is used to fetch game object every 0.1 seconds
    useEffect(() => {
        let bool = false;
        const interval = setInterval(async () => {
            bool = await getGame(interval, bool);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => tick(), 1000);
        return() => clearInterval(interval);
    }, [ticker])
    
    //fetches game
    const getGame = async (interval, bool) =>{
        let game = await fetchGame(gameId);
        setGame(game);
        if(game !== undefined)
        {
            if(game.winningPlayer === undefined)
            {
                if(bool === true)
                    {
                        setBoard(game.board.squares);
                        setTicker(game.maxTurnTime);
                        return false;
                    }
                    if(game.players[game.turnPlayer].id !== user)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
            }
            else
            {
                clearInterval(interval);
                navigate("/finishedgame", 
                    {
                        state:
                        {
                            winner:game.players[game.winningPlayer].name, 
                            creatorId:game.players[0].id, 
                            userId:user, 
                            initialBoard:initialBoard, 
                            secondPlayer:game.players[1].id, 
                            turnTime:timer
                        }
                    });
                    return false;
            }
        }
    }

    const tick = () => {
        setTicker(ticker - 1000);
    }

    //should move selected figure to destined position
    const movePlayer = (from, to) =>{
        let temp = board;
        let value = board[from[0]][from[1]];
        temp[from[0]][from[1]] = -1;
        temp[to[0]][to[1]] = value;
        setBoard(temp);
        setMoves([from, to]);
    }

    //should shoot arrow
    const setArrow = (to) =>{
        let temp = board;
        temp[to[0]][to[1]] = -1;
        postMove(user, gameId, moves[0], moves[1], to);
    }

    return(
        _game !== undefined ?
            <div className="Game_screen">
                <h1>{_game.players[_game.turnPlayer] === undefined ? "" : _game.players[_game.turnPlayer].name}</h1>
                <ChessBoard board={board} movePlayer={movePlayer} setArrow={setArrow} figure={figure}/>
                <p>
                    {ticker/1000}
                </p>
            </div>
        :
            <></>
        )
}

export default Game;
