let players = loadPlayers()

function addPlayer(){

const input = document.getElementById("playerName")
const name = input.value.trim()

if(name === "") return

players.push(name)

savePlayers(players)

input.value = ""

renderPlayers()
}

function removePlayer(index){

players.splice(index,1)

savePlayers(players)

renderPlayers()
}

function renderPlayers(){

const list = document.getElementById("players")

list.innerHTML = ""

players.forEach((player,index)=>{

const li = document.createElement("li")

li.innerHTML = player + " <button onclick='removePlayer("+index+")'>X</button>"

list.appendChild(li)

})
}
