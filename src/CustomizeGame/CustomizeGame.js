import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Playfield from "../PlayField/Playfield";
import "./CustomizeGame.css"
import {postGame} from "../FetchTasks";

function CustomizeGame(){
    const {firstPlayer, secondPlayer} = useLocation().state;
    const [rows, setRows] = useState(10);
    const [columns, setColumns] = useState(10);
    const [turnTime, setTurnTime] = useState(60);
    const [playfield, setPlayfield] = useState([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let board = [];
        let val;
        if(rows & 2 === 0)
        {
            val = rows;
        }
        else
        {
            val = rows - 1;
        }
        for(let i = 0; i < val / 2; i++)
        {
            let row = [];
            for(let j = 0; j < columns; j++)
            {
                row.push(-1);
            }
            board.push(row);
        }
        setPlayfield(board);
      }, [rows, columns]);

    const fieldClicked = (fieldName, fieldId, identVal, row, column) =>{
        let board = playfield;
        if(board[row][column] === -1)
        {
            board[row][column] = 0;
        }
        else
        {
            board[row][column] = -1;
        }
        setPlayfield(board);
        setValue(value + 1);
    }

    const postCustomizedGame = async () => {
        let board = mirrorBoard();
        let game = await postGame(turnTime * 1000, [firstPlayer, secondPlayer], rows, columns, board);
        navigate("/game", {state:{gameId:game.id, initialBoard:board, user:firstPlayer, timer:turnTime * 1000, figure:0}})
    }

    const mirrorBoard = () => {
        let mirror = [];
        let val;
        if(rows % 2 === 0)
        {
            val = rows;
        }
        else
        {
            val = rows - 1;
        }
        for(let i = 0; i < val / 2; i++)
        {
            let row = [];
            for(let j = 0; j < columns; j++)
            {
                row.push(playfield[i][j] === -1 ? -1 : 1);
            }
            mirror.push(row);
        }
        if(rows % 2 !== 0)
        {
            let row = [];
            for(let i = 0; i < columns; i++)
            {
                row.push(-1);
            }
            mirror.push(row);
        }
        mirror.reverse();
        let board = playfield;
        return [...board, ...mirror];
    }

    return(
        <div className="customize_game_area">
            <label className="customize_header">
                Benutzerdefiniertes Spiel
            </label>
            <label className="customize_label">
                Anzahl der Zeilen/Spalten:
                <input className="customize_input" type="numbers" value={rows} onChange={(event) => {setRows(parseInt(event.target.value)); setColumns(parseInt(event.target.value));}}/>
            </label>
            <label className="customize_label">
                Zugzeit:
                <input className="customize_input" type="numbers" value={turnTime} onChange={(event) => {setTurnTime(parseInt(event.target.value))}}/>
            </label>
            <div className="customize_figure_positions_area">
                <label className="customize_label">
                    Spielfiguren setzen:
                </label>
                <div className="customize_board">
                    {
                    playfield.map((row, rowId) =>
                        <div key={rowId} className="customize_board-row">
                            {
                                row.map((column, colId) =>
                                rowId % 2 !== 0 ?
                                    <Playfield key={colId.toString() + rowId.toString()} fieldId={column} identVal={[rowId, colId]} color={colId % 2 !== 0 ? "grey" : "lightgrey"} row={rowId} column={colId} fieldClicked={fieldClicked}/>

                                :
                                    <Playfield key={colId.toString() + rowId.toString()} fieldId={column} identVal={[rowId, colId]} color={colId % 2 === 0 ? "grey" : "lightgrey"} row={rowId} column={colId} fieldClicked={fieldClicked}/>
                                )
                            }
                        </div>)
                    }
                </div>
                <div>
                <label>
                    --- Spielfeldmitte ---
                </label>
                </div>
            </div>
            <button onClick={() => {postCustomizedGame();}} className="customize_button">
                Starte das Spiel
            </button>
        </div>
    );
}

export default CustomizeGame;