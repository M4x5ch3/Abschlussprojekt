import React from "react";
import './Playfield.css';
import BlackAmazon from "./Figures/amazon_black.png";
import WhiteAmazon from "./Figures/amazon_white.png";
import Arrow from "./Figures/arrow.png"

function Playfield(props){
    const color = props.color;
    const fieldClicked = () => {props.fieldClicked(props.fieldName, props.fieldId, props.identVal, props.row, props.column)};

    const getFigure = () =>{
        //sets image depending on fieldId
        switch(props.fieldId){
            case 0:
                return (<img className="figure" src={WhiteAmazon} alt="Weiße Amazone"/>);

            case 1:
                return (<img className="figure" src={BlackAmazon} alt="Schwarze Amazone"/>);

            case -1:
                break;

            case -2:
                return (<img className="figure" src={Arrow} alt="Giftpfeil"/>);

            default:
                //should never be reached
                break;
        }
    }

    return(
        <div className={color} onClick={(e) => {fieldClicked()}}>
            {getFigure()}
        </div>
    );
}

export default Playfield;