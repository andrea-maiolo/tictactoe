//check logic for tie
// adding players name??
//work on presentation


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
        if(e.path[0].innerHTML != "X" && e.path[0].innerHTML !="O"){
            e.path[0].innerHTML = currentPlayer;
            let index = gameBoard.gb.indexOf(workingDiv);
            gameBoard.gb[index] = currentPlayer;
        }else{return}
        //call to see if there is a winner
        finish.winnerCheck(gameBoard.gb)
    }
    return {
        playerX : playerX,
        playerO : playerO,
        gameOn : gameOn,
    }
})();

//this function control the flow of the game by calling whoIsPlaying
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

//this is the second flow control and switch between the players
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

//let's display the gameBoard on the html
const displayGameboard = (function(){
    const gbReference = gameBoard.gb;
    const grid = document.querySelector('#grid');
    //create 3X3 grid
    gbReference.forEach(element => {
        grid.appendChild(document.createElement('div'))
    });

    const divs = document.querySelectorAll('div');
    //ading class to the div 
    const addingClass = (function(){
        divs.forEach(div => {
            if(div.id=="grid"||div.id =="result"||div.id=="players"){return}
            div.classList.add("gridItem")
        })
    })();

    const gridItems = document.querySelectorAll(".gridItem");
    //adding event listener so that on click we populate the board
    for(let j=0;j<gridItems.length;j++){
        currentDiv = gridItems[j];
        currentDiv.id = gbReference[j]
    }
    let gridItem = document.querySelectorAll(".gridItem");
    gridItem.forEach(g=>{
    g.addEventListener('click', playersCreation.gameOn)
})

})();

//function that controls if there is a winner
const finish = (function(){
    const result = document.getElementById('result');
    let text = document.createElement('p');
    function winnerCheck(array){
        if(array[0]==array[1]&&array[1]==array[2]){
            text.innerText = `Congratulations! Player${array[0]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[3]==array[4]&&array[4]==array[5]){
            text.innerText = `Congratulations! Player${array[3]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[6]==array[7]&&array[7]==array[8]){
            text.innerText = `Congratulations! Player${array[6]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[0]==array[3]&&array[3]==array[6]){
            text.innerText = `Congratulations! Player${array[0]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[2]==array[5]&&array[5]==array[8]){
            text.innerText = `Congratulations! Player${array[2]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[1]==array[4]&&array[4]==array[7]){
            text.innerText = `Congratulations! Player${array[1]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[0]==array[4]&&array[4]==array[8]){
            text.innerText = `Congratulations! Player${array[0]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }else if(array[2]==array[4]&&array[4]==array[6]){
            text.innerText = `Congratulations! Player${array[2]} is the winner`;
            result.appendChild(text);
            return b.replay();
        }
    }
    return{
        winnerCheck : winnerCheck
    }
})();

//CREATE A BUTTON FOR REPLAY
const b = (function(){
    function replay(){
    let newB = document.createElement('button');
    newB.innerText = "Play again?";
    newB.classList.add('replay');
    let result = document.getElementById('result');
    result.appendChild(newB);
    newB.addEventListener('click',()=>{window.location.reload()})
    };
    return{
        replay : replay
    }
})();