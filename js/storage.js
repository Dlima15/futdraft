function savePlayers(players){
localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers(){
return JSON.parse(localStorage.getItem("players")) || []
}

function clearPlayers(){
localStorage.removeItem("players")
}
