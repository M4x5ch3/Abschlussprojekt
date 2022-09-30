//if API url changes, change here
const APIUrl = "https://gruppe8.toni-barth.com/";

//resets whole backend (deletes data)
export async function reset(){
    let response = await fetch(APIUrl + "reset/",{
        method: "DELETE"
    }
    ).then(
        (response) => response.json()
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

//fetches all games existing in backend
export async function fetchGames() {
    return fetchSomething(APIUrl + "games/");
}

//fetches specific game
export async function fetchGame(id){
    return fetchSomething(APIUrl + "games/" + id);
}

//fetches all players existing in backend
export async function fetchPlayers() {
    return fetchSomething(APIUrl + "players/");
}

//fetches depending on API endpoint
async function fetchSomething(URL){
    let response = await fetch(URL).then(
        (response) => response.json()
    ).then(
        (sth) => {return sth}
    ).catch(ex => {
        console.error(ex)
    });
    return await response;
}

//deletes specific player
/*
async function deletePlayer(id){
    let response = await fetch(APIUrl + "players/" + id,{
        method:"DELETE"
    });
    return await response;
}
*/

//posts player (real player or com) 
export async function postPlayer(name, controllable){
    let response = await fetch(APIUrl + "players/",{
        method: "POST",
        body: JSON.stringify({
            "name":name,
            "controllable":controllable
            }
        ),
        headers: {'Content-Type':'application/json'}
    }
    ).then(
        (response) => response.json()
    ).then(
        (player) => {return player}
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

export async function postStandardGame(players)
{
    return await postGame(60000, players, 10, 10, [
        [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1]
    ])
}

//posts game
export async function postGame(maxTurnTime, players, rows, columns, squares){
    let response = await fetch(APIUrl + "games/",{
        method: "POST",
        body: JSON.stringify({
            "maxTurnTime":maxTurnTime,
            "players":players,
            "board":{
                "gameSizeRows":rows,
                "gameSizeColumns":columns,
                "squares":squares
            }
            }
        ),
        headers: {'Content-Type':'application/json'}
    }
    ).then(
        (response) => response.json()
    ).then(
        (game) => {return game}
    ).catch(ex => {
        console.error(ex)
    });

    return await response;
}

//posts move
export async function postMove(playerId, gameId, from, to, shot){
    return await fetch(APIUrl + "move/" + playerId + "/" + gameId,{
        method: "POST",
        body: JSON.stringify({
            "move":{
                "start":{
                    "row":from[0],
                    "column":from[1],
                },
                "end":{
                    "row":to[0],
                    "column":to[1],
                }
            },
            "shot":{
                "row":shot[0],
                "column":shot[1],
            }
        }),
        headers:{'Content-Type':'application/json'}
    }).then(
        (response) => response.json
    ).catch(
        ex => console.error(ex)
    );
}
