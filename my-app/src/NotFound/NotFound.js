import React from "react";
import image from "./404.jpg";
import "./NotFound.css";

function NotFound(){
    return(
        <div className="NotFound">
            <div className="NotFound_image">
                <img src={image} id="image" alt="404 Katze"/>
            </div>
        </div>
    );
}

export default NotFound;