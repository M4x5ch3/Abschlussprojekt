import React, {useState} from "react";
import './ChessBoard.css';
import Playfield from '../PlayField/Playfield';

function ChessBoard(props){
    // 1: pick Figure
    // 2: move Figure
    // 3: set arrow
    const [turnPhase, setTurnPhase] = useState(1);
    const [from, setFrom] = useState([]);

    const fieldClicked = (fieldName, fieldId, identVal) =>{
        switch(turnPhase){
            //player has to select figure to move
            case 1:{
                if(fieldId === props.figure)
                {
                    let newFrom = [];
                    newFrom[0] = identVal[0];
                    newFrom[1] = identVal[1];
                    setFrom(newFrom);
                    setTurnPhase(2);
                }
                break;
            }

            //player has to select field to which 
            //figure should be moved
            case 2:{
                let to = [identVal[0], identVal[1]];
                console.log(from);
                console.log(to);
                if(validMove(to, amazonCondition))
                {
                    props.movePlayer(from, to);
                    setFrom(to);
                    setTurnPhase(3);
                }
                else
                {
                    window.alert("Amazone kann nicht auf dieses Feld bewegt werden.");
                }
                break;
            }

            //player has to shoot an arrow
            case 3:
                let to = [identVal[0], identVal[1]];
                if(validMove(to, arrowCondition))
                {
                    props.setArrow(to);
                    setTurnPhase(1);
                }
                else
                {
                    window.alert("Pfeil kann nicht zu dieser Position geschossen werden.");
                }
                break;

            //should never be reached
            default:
                setTurnPhase(1);
                break;
        }
    }
    
    //first value represents row and second value represents column
    const validMove = (to, condition) => {
        //moved left or right
        if(from[0] === to[0])
        {
            //did'nt move at all
            if(from[1] === to[1])
            {
                return false;
            }
            //moved right
            if(from[1] < to[1])
            {
                for(let i = from[1] + 1; i <= to[1]; i++)
                {
                    if(!condition(props.board[from[0]][i]))
                    {
                        return false;
                    }
                }
            }
            else
            {
                for(let i = from[1] - 1; i >= to[1]; i--)
                {
                    if(!condition(props.board[from[0]][i]))
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        //moved up or down
        if(from[1] === to[1])
        {
            //did'nt move at all
            if(from[0] === to[0])
            {
                return false;
            }
            //moved down
            if(from[0] < to[0])
            {
                for(let i = from[0] + 1; i <= to[0]; i++)
                {
                    if(!condition(props.board[i][from[1]]))
                    {
                        return false;
                    }
                }
            }
            else
            {
                for(let i = from[0] - 1; i >= to[0]; i--)
                {
                    if(!condition(props.board[i][from[1]]))
                    {
                        return false;
                    }
                }
            }
            return true;
        }
        //piece moved diagonally
        if(abs(to[0] - from[0]) === abs(to[1] - from[1]))
        {
            //moved to the upper left
            if(to[0] < from[0] && to[1] < from[1])
            {
                for(let i = 1; i <= abs(to[0] - from[0]); i++)
                {
                    if(!condition(props.board[from[0] - i][from[1] - i]))
                    {
                        return false;
                    }
                }
                return true;
            }
            //moved to the lower right
            if(to[0] > from[0] && to[1] > from[1])
            {
                for(let i = 1; i <= abs(to[0] - from[0]); i++)
                {
                    if(!condition(props.board[from[0] + i][from[1] + i]))
                    {
                        return false;
                    }
                }
                return true;
            }
            //moved to the lower left
            if(to[0] > from[0] && to[1] < from[1])
            {
                for(let i = 1; i <= abs(to[0] - from[0]); i++)
                {
                    if(!condition(props.board[from[0] + i][from[1] - i]))
                    {
                        return false;
                    }
                }
                return true;
            }
            //moved to the upper right
            if(to[0] < from[0] && to[1] > from[1])
            {
                for(let i = 1; i <= abs(to[0] - from[0]); i++)
                {
                    if(!condition(props.board[from[0] - i][from[1] + i]))
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    // 0: Amazone des Spielers mit Index 0 in players
    // 1: Amazone des Spielers mit Index 1 in players
    // -1: leeres Feld
    // -2: Giftpfeil
    const arrowCondition = (id) => {
        if(id === -1)
        {
            return true;
        }
        else return false;
    }

    const amazonCondition = (id) => {
        if(id === -1 || id === props.playersTurn)
        {
            return true;
        }
        return false;
    }

    const abs = (val) =>{
        if(val < 0)
        {
            return val * -1;
        }
        return val;
    }

    return(
        <div className="board">
            {
                props.board.map((row, rowId) =>
                    <div key={rowId} className="board-row">
                        {
                            row.map((column, colId) =>
                            rowId % 2 !== 0 ?
                                <Playfield key={colId} identVal={[rowId, colId]} color={colId % 2 !== 0 ? "grey" : "lightgrey"} fieldName={column+row} fieldClicked={fieldClicked} fieldId={props.board[rowId][colId]}/>

                            :
                                <Playfield key={colId} identVal={[rowId, colId]} color={colId % 2 === 0 ? "grey" : "lightgrey"} fieldName={column+row} fieldClicked={fieldClicked} fieldId={props.board[rowId][colId]}/>
                            ) 
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ChessBoard;
