function resetAll(){

players = []

clearPlayers()

document.getElementById("teams").innerHTML = ""

renderPlayers()

}

window.onload = function(){

renderPlayers()

}
