//Creación de Jugador
let PlayerList =  [];

class Player {
    constructor(nick,figure) {
        this.nick = nick;
        this.figure = figure;
        this.avatar = "null"; //No hemos desarrollado el avatar por eso esta como null y no esta declarado como parámetro del constructor.
    }
}

function collectData() {
    let nickName =  document.getElementById("name").value;
    let figure = document.querySelector('#figure');

    PlayerList.push(new Player(nickName,figure));
    
    console.log(PlayerList[0].nick + PlayerList[0].figure);

    location.href = "../comingSoon.html";
}
//La función hace efecto al darle click al botón
const button = document.getElementById("start");
button.addEventListener('click',collectData);
