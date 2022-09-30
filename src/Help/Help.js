import React from "react";
import { useNavigate } from "react-router-dom";
import "./Help.css";

function Help(match){
    const navigate = useNavigate();

    return(
        <div className="Help_page">
            <div className="Help_header">
                <h2>Spielregeln</h2>
            </div>
            <div className="Help_text">
                <p>
                    •   Gespielt wird auf einem 10x10 Schachbrett oder auf einem internationalen Damebrett.
                </p>
                <p>
                    •	Ein Spieler spielt <span id="bold">weiß</span> und der andere <span id="bold">schwarz</span>
                </p>
                <p>
                    •	Jeder Spieler hat <span id="bold">4 Amazonen</span> (Startposition: siehe Bild 1)
                </p>
                <p>
                    •	Außerdem gibt es etwa 50 Blockadesteine „giftige“ Pfeile
                </p>
                <p>
                    •	Spieler ziehen abwechselnd – weiß beginnt
                </p>
                <span id="bold">Zug:</span>
                <p>
                    •	Amazone wird auf ein leeres benachbartes Feld oder über mehrere leere Felder in orthogonaler oder diagonaler Richtung bewegt. (Darf dabei über keine besetzten Felder; besetzt = eigene Dame, gegner. Dame oder Pfeil)
                </p>
                <p>
                    •	Anschließend verschießt die gezogene Amazone einen giftigen Pfeil. Dieser kann wie die Amazone orthogonal oder diagonal beliebig viele Felder zurücklegen. Darf jedoch kein Feld überqueren oder auf einem Feld landen, wo sich bereits ein Pfeil oder eine andere Amazone befindet.
                </p>
                <p>
                    •	Es besteht Zugpflicht
                </p>
                <p>
                    •	<span id="bold">Verloren</span> hat der Spieler, der zuerst <span id="bold">nicht mehr ziehen</span> kann
                </p>
            </div>
            <div className="Help_sub_header">
                <h2>Über das Projekt</h2>
            </div>
            <div className="Help_text">
                <p>
                    Dieses Front-End stellt das Zwischenprojekt für das Modul "Web- und Medienprogrammierung" an der Hochschule Anhalt - University of Applied Sciences dar.
                </p>
                <p>
                    Das Projekt wurde von:<br></br><br></br>
                    Anna-Lena Bundt (5046278),<br></br>
                    Luca Jonas Hoffmann (5054686)<br></br>
                    und<br></br>
                    Max Schonert (5045680),<br></br>
                    unter Verwendung des Frameworks React, erstellt. 
                </p>
                <p>
                    Die Bearbeitung fand unter Aufsicht von Toni Barth (toni.barth@hs-anhalt.de) statt.
                </p>
            </div>
            <div className="Help_return_container">
                <button className="Help_return_button" onClick={() => navigate("/")}>
                    Zurück
                </button>
            </div>
        </div>
    )
}
export default Help;