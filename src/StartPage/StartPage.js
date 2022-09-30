import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import GamesList from "../GamesList/GamesList";
import { postPlayer, reset } from "../FetchTasks";
import "./StartPage.css";
import { useNavigate } from "react-router-dom";

//represents main component besides App
function StartPage(){
    const navigate = useNavigate();
    const[userName, setUserName] = useState("");
    const[userId, setUserId] = useState(null);
    const[login, setLogin] = useState(false);

    //reset();
    const loginDone = () => {
      setLogin(true);
    }

    const handleButton = () => {
        if(userId === undefined || userId === null)
        {
            return;
        }
        else
        {
            navigate("/launchgame", {state:{userId:userId}});
        }
    }

    //posts new player object to API
    const userNameRegistered = (name) => {
      setUserName(name);
      post(name);
    }

    const post = async (userName) => {
      let player = await postPlayer(userName, true);
      setUserId(player.id);
    }

    return(
        <div className="App">
            <div className="App_header">
                <h2>
                    Game of the Amazons
                </h2>
            </div>
            {login === false ?
            <div className="StartPage_login">
                <Login setUserName={userNameRegistered} setLogin={loginDone}/>
                <div className="StartPage_help_container">
                    <Link to={'/help'}>
                        <button className="Help_button" type="button">
                            Hilfe
                        </button>
                    </Link>
                </div>
            </div>
            :
            <>
            <div className="App_welcome">
                <h3>
                    Hallo {userName}!
                </h3>
                <h3>
                    ID:{userId}
                </h3>
            </div>
            <div className="StartPage_button_container">
                <button className="StartPage_button" onClick={() => {handleButton()}} type="button">
                    Spiel starten
                </button>
            </div>
            <div className="StartPage_gameslist_container">
                <GamesList player={userId}/>
            </div>
            <div className="StartPage_help_container">
                <Link to={'/help'}>
                    <button className="Help_button" type="button">
                        Hilfe
                    </button>
                </Link>
            </div>
            </> }
        </div>);
}

export default StartPage;