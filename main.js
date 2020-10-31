//this create the board as an array
const gameBoard = (function(){
    const gb = [1,2,3,4,5,6,7,8,9];
    return {
        gb : gb
    }
})(); 

//this is the constructor for players
class Player{
    constructor(name){
        this.name = name;
    }
};

//let's create players
const playersCreation = (function(){
    let playerX = new Player("X");
    let playerO = new Player("O");

    function gameOn(e){
        let currentPlayer = controlFlow.change().name;
        let workingDiv = Number(e.path[0].id);
        e.path[0].innerHTML = currentPlayer
        let index = gameBoard.gb.indexOf(workingDiv);
        gameBoard.gb[index] = currentPlayer
        
    }
    return {
        playerX : playerX,
        playerO : playerO,
        gameOn : gameOn,
    }
})();

//let's display the gameBoard on the html
const displayGameboard = (function(){
    const gbReference = gameBoard.gb;
    const grid = document.querySelector('#grid');
    
    gbReference.forEach(element => {
        grid.appendChild(document.createElement('div'))
    });

    const divs = document.querySelectorAll('div');

    const addingClass = (function(){
        divs.forEach(div => {
            if(div.id=="grid"||div.id =="result"||div.id=="players"){return}
            div.classList.add("gridItem")
        })
    })();

    const gridItems = document.querySelectorAll(".gridItem");

    for(let j=0;j<gridItems.length;j++){
        currentDiv = gridItems[j];
        currentDiv.id = gbReference[j]
    }
    let gridItem = document.querySelectorAll(".gridItem");
    gridItem.forEach(g=>{
    g.addEventListener('click', playersCreation.gameOn)
})

})();

const controlFlow = (function(){
    let ctrl =true;
    function change(){
        ctrl = !ctrl;
        return whoIsPlaying.f()
    }
    return {
        change: change,
    }
})();

const whoIsPlaying = (function(){
    let who = playersCreation.playerX;
    let second  = playersCreation.playerO;
    function f(){
        if(who ==playersCreation.playerX){
            who = second;
        }else{
            who = playersCreation.playerX
        }
        return who
    }
    return {
        f:f
    }
})();