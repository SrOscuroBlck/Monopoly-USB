//Player creation
let PlayerList =  [];

class Player {
    constructor(nick,figure) {
        this.nick = nick;
        this.figure = figure
    }
}

function collectData() {
    let nickName =  document.getElementById("name").value;
    let figure = document.querySelector('#figure');

    PlayerList.push(new Player(nickName,figure));
    
    console.log(PlayerList[0].nick + PlayerList[0].figure);
}
//La funcion hace efecto al darle click al botón
const button = document.getElementById("start");
button.addEventListener('click',collectData,location.href='comingSoon.html');s
