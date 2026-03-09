function shuffle(array){
return array.sort(()=>Math.random() - 0.5)
}

function drawTeams(){

const number = parseInt(document.getElementById("teamsNumber").value)

if(players.length < number){
alert("Jogadores insuficientes")
return
}

let shuffled = shuffle([...players])

let teams = []

for(let i=0;i<number;i++){
teams.push([])
}

shuffled.forEach((player,index)=>{

teams[index % number].push(player)

})

renderTeams(teams)
}

function renderTeams(teams){

const container = document.getElementById("teams")

container.innerHTML = ""

teams.forEach((team,i)=>{

let div = document.createElement("div")

div.className = "team"

let html = "<h3>Time "+(i+1)+"</h3>"

team.forEach(player=>{
html += "<p>"+player+"</p>"
})

div.innerHTML = html

container.appendChild(div)

})

}
