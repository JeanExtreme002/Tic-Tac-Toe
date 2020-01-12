var round = 0;
var score = [0,0];

const sequences = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const symbols = ["X","O"];


function build(size = 100 , spacing = 5){

    /* 
    Cria campos para que os jogadores possam 
    fazer as marcações dessa seguinte forma:

        |   |
    -------------
        |   |
    -------------
        |   |
    */

    for (var y = 0; y < 3; y++){
        for (var x = 0; x < 3; x++){
            
            var square = document.createElement("div");

            square.setAttribute("align", "center");
            square.setAttribute("class","square");

            square.style.width = size + "px";
            square.style.height = size + "px";

            square.style.left = (size + spacing) * x + "px";
            square.style.top = (size + spacing) * y + "px";

            document.getElementById("game").appendChild(square);
        }
    }

    // Ajusta o tamanho do tabuleiro.
    var game = document.getElementById("game");
    game.style.width = square.offsetWidth * 3 + spacing * 2 + "px";
    game.style.height = square.offsetHeight * 3 + spacing * 2 + "px";

    // Define os eventos do jogo.
    setEvents();
}


function isGameOver(){

    var elements = document.getElementsByClassName("square");
    var winner = null;

    for (var symbol = 0; symbol < symbols.length; symbol++){
        for (var index = 0; index < sequences.length; index++){

            var sequence = sequences[index];

            // Verifica se algum jogador venceu o jogo.
            if (elements[sequence[0]].innerHTML == symbols[symbol] && 
                elements[sequence[1]].innerHTML == symbols[symbol] && 
                elements[sequence[2]].innerHTML == symbols[symbol]){

                winner = symbols[symbol];
            }
        }
    }

    // Se houver um vencedor, a pontuação dele será aumentada.
    if (winner){
        score[symbols.indexOf(winner)]++;
        return true;
    }

    // Verifica se houve um empate.
    if (round >= 9){
        return true;
    }

    return false;
}


function mark(){

    var element = event.target;

    // Verifica se o jogo já acabou. 
    // Se sim, todos os símbolos no jogo serão apagados e uma nova rodada começará.
    if (isGameOver()){
        reset();
        return;
    }

    // Verifica se o campo escolhido já foi marcado.
    if (element.innerHTML){
        return;
    }

    // Coloca no campo o símbolo do jogador.
    element.innerHTML = symbols[round % 2];
    round++;
}


function reset(){

    round = 0;

    elements = document.getElementsByClassName("square");
    for (var i = 0; i < elements.length; i++){
        elements[i].innerHTML = "";
    }
}


function setEvents(){

    elements = document.getElementsByClassName("square");
    for (var i = 0; i < elements.length; i++){
        elements[i].addEventListener("click", mark);
    }
}


function start(size = 100, spacing = 5){

    build(size, spacing);
    update(size , spacing);
}


function update(size = 100 , spacing = 5){

    var w_width = window.innerWidth, w_height = window.innerHeight;
    var squares = document.getElementsByClassName("square");

    // Coloca o título do jogo no centro da tela.
    var title = document.getElementById("title");
    title.style.left = Math.round(w_width / 2 - (title.offsetWidth / 2)) + "px";

    // Coloca a div "game" no centro da tela.
    var game = document.getElementById("game");
    game.style.left = w_width / 2 - ((squares[0].offsetWidth * 3 + (spacing * 2)) / 2) + "px";

    // Atualiza o placar do jogo e o coloca no centro da tela.
    var scoreText = document.getElementById("score");

    scoreText.innerHTML = `Player [ ${symbols[0]} ]: ${score[0]}`
    scoreText.innerHTML += "&nbsp".repeat(8);
    scoreText.innerHTML += `Player [ ${symbols[1]} ]: ${score[1]}`

    scoreText.style.left = Math.round(w_width / 2 - (scoreText.offsetWidth / 2)) + "px";

    requestAnimationFrame( function(){update(size, spacing)} );
}