//check logic for tie
// adding players name as resistance or empire


//this create the board as an array
const gameBoard = [1,2,3,4,5,6,7,8,9];

//let's display the gameBoard on the html
const displayGameboard = (function(){
    const grid = document.querySelector('#grid');
    //create 3X3 grid
    gameBoard.forEach(element => {
        grid.appendChild(document.createElement('div'))
    });
    const divs = document.querySelectorAll('div');
    //ading class to the div 
    const addingClass = (function(){
        divs.forEach(div => {
            if(div.id=="grid"||div.className =="result"||div.className=="players"){return}
            div.classList.add("gridItem")
        })
    })()
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

    return {
        playerX : playerX,
        playerO : playerO,
    }
})();

//this starts the game
const gameOn = function(e){
    let currentDiv = e.path[0];
    let currentDivIndex = Number(e.path[0].id);
    if(e.path[0].innerText != `X<img src="styles/rebelion.svg" class="svgs">` &&  e.path[0].innerText != `O<img src="styles/empire.svg" class="svgs">`){
        let currentPlayer = whoIsPlaying();
        e.path[0].innerText = currentPlayer;
        let index = gameBoard.indexOf(currentDivIndex);
        gameBoard[index] = currentPlayer;
    }else{return};
    attachIcon(currentDiv.innerText, currentDiv)
    finish.winnerCheck(gameBoard,currentDiv);
};

//this variables help control the game flow
const x = playersCreation.playerX.name;
const o = playersCreation.playerO.name;
let currentP = o;

//this function control the flow of the game
const whoIsPlaying = function(){
    if(currentP == o){
        currentP = x;
    }else if(currentP == x){
        currentP = o;
    }
    return currentP
}

const iconSelection = function(currentPLayer){
    //creating the 2 icons
    let iconRebelion = document.createElement('img');
    let iconEmpire = document.createElement('img');
    iconRebelion.src= "styles/rebelion.svg";
    iconEmpire.src= "styles/empire.svg";
    iconEmpire.classList.add('svgs');
    iconRebelion.classList.add('svgs');
    //getting the player
    if(currentPLayer == x){
        return iconRebelion
    }else{
        return iconEmpire
    }
}


function attachIcon(currentPLayer, currentDiv){
    myIcon = iconSelection(currentPLayer);
    currentDiv.appendChild(myIcon);
}

//this create the events for the grid
const eventInTheGrid = (function(){
    const gridItems = document.querySelectorAll(".gridItem");
        //adding event listener so that on click we populate the board
        for(let j=0;j<gridItems.length;j++){
            currentDiv = gridItems[j];
            currentDiv.id = gameBoard[j]
        }
        let gridItem = document.querySelectorAll(".gridItem");
        gridItem.forEach(g=>{
        g.addEventListener('click', gameOn)
    });
})();

//function that controls if there is a winner
const finish = (function(){
    const result = document.querySelector('.result');
    let text = document.createElement('p');
    text.id="rText";

    function winnerCheck(array, currentDiv){
        if((array[0]==array[1]&&array[1]==array[2])||(array[3]==array[4]&&array[4]==array[5])||(array[6]==array[7]&&array[7]==array[8])||(array[0]==array[3]&&array[3]==array[6])||(array[2]==array[5]&&array[5]==array[8])||(array[1]==array[4]&&array[4]==array[7])||(array[0]==array[4]&&array[4]==array[8])||(array[2]==array[4]&&array[4]==array[6])){
            text.innerText = `Congratulations! Player ${currentDiv.innerText} is the winner`;
            result.appendChild(text);
            return replay();
        }else{
        array.forEach(ele=>{
            if(isNaN(ele)){
                text.innerText = `Congratulations! Player ${currentDiv.innerText} is the winner`;
                result.appendChild(text);
            }
        })
    }
    }
    return{
        winnerCheck : winnerCheck
    }
})();

//REPLAY function
    const replay = function(){
        //create button for replay
    let newB = document.createElement('button');
    newB.id="rButton";
    newB.innerText = "Play again?";
    newB.classList.add('replay');
    let result = document.querySelector('.result');
    result.appendChild(newB);
    newB.addEventListener('click',()=>{window.location.reload()});
        //remove event listeners from grid
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(gridItem =>{ gridItem.removeEventListener('click', gameOn)})
    }
