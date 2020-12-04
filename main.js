
//this create the board as an array in an object
const board = (function() {
    const gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return {
        gameBoard
    }
})();

 //let's display the gameBoard on the html
 const displayGameboard = (function() {
    const grid = document.querySelector('#grid');
    //create 3X3 grid
    board.gameBoard.forEach(element => {
        grid.appendChild(document.createElement('div'))
    });

const divs = document.querySelectorAll('div');
    //ading class to the div 
const addingClass = (function() {
    divs.forEach(div => {
        if (div.id == "grid" || div.className == "result" || div.className == "players") {
            return
        }
        div.classList.add("gridItem")
    })
})()
})();


//this is the constructor for players
class Player {
    constructor(name) {
        this.name = name;
    }
};

//let's create players
const playersCreation = (function() {
    let playerX = new Player("X");
    let playerO = new Player("O");
    //get the name out of the players for future use
    const x = playerX.name;
    const o = playerO.name;

    return {
        x: x,
        o: o,
    }
})();


//this variables help control the game flow
let currentP = playersCreation.o;

//this function control the flow of the game
const whoIsPlaying = function() {
    if (currentP == playersCreation.o) {
        currentP = playersCreation.x;
    } else if (currentP == playersCreation.x) {
        currentP = playersCreation.o;
    }
    return currentP
}

const iconSelection = function(currentPLayer) {
    //creating the 2 icons
    let iconRebelion = document.createElement('img');
    let iconEmpire = document.createElement('img');
    iconRebelion.src = "styles/rebelion.svg";
    iconEmpire.src = "styles/empire.svg";
    iconEmpire.classList.add('full');
    iconRebelion.classList.add('full');
    iconEmpire.classList.add('svgs');
    iconRebelion.classList.add('svgs');
    //getting the player
    if (currentPLayer == playersCreation.x) {
        return iconRebelion
    } else {
        return iconEmpire
    }
}

const attachIcon = function(currentPLayer, currentDiv) {
    let myIcon = iconSelection(currentPLayer);
    if (currentDiv.classList.contains('full')) {
        return
    } else {
        currentDiv.appendChild(myIcon);
    }
}

//this starts the game
const gameOn = function(e) {
    let currentDiv = e.path[0];
    let currentDivIndex = Number(e.path[0].id);
    if (!(currentDiv.classList.contains('full'))) {
        //get me the player
        let currentPlayer = whoIsPlaying();
        //this 2 lines change the array
        let index = board.gameBoard.indexOf(currentDivIndex);
        board.gameBoard[index] = currentPlayer;
        //this appent the player to the div
        currentDiv.innerText = currentPlayer;
        attachIcon(currentPlayer, currentDiv);
        currentDiv.classList.add("full");
    } else {
        return
    };
    finish.winnerCheck(board.gameBoard, currentDiv);
};

//this create the events for the grid
const eventInTheGrid = (function() {
    const gridItems = document.querySelectorAll(".gridItem");
    //adding event listener so that on click we populate the board
    for (let j = 0; j < gridItems.length; j++) {
        currentDiv = gridItems[j];
        currentDiv.id = board.gameBoard[j]
    }
    let gridItem = document.querySelectorAll(".gridItem");
    gridItem.forEach(g => {
        g.addEventListener('click', gameOn)
    });
})();

//function that controls if there is a winner
const finish = (function() {
    const result = document.querySelector('.result');
    let text = document.createElement('p');
    text.id = "rText";

    const winnerCheck = function(array, currentDiv) {
        if ((array[0] == array[1] && array[1] == array[2]) || (array[3] == array[4] && array[4] == array[5]) || (array[6] == array[7] && array[7] == array[8]) || (array[0] == array[3] && array[3] == array[6]) || (array[2] == array[5] && array[5] == array[8]) || (array[1] == array[4] && array[4] == array[7]) || (array[0] == array[4] && array[4] == array[8]) || (array[2] == array[4] && array[4] == array[6])) {
            console.log()
            text.innerText = `Congratulations! Player ${currentDiv.innerText} is the winner`;
            result.appendChild(text);
            return replay();
        } else if (isNaN(array[0]) && isNaN(array[1]) && isNaN(array[2]) && isNaN(array[3]) && isNaN(array[4]) && isNaN(array[5]) && isNaN(array[6]) && isNaN(array[7]) && isNaN(array[8]) && isNaN(array[9])) {
            text.innerText = 'It is a tie! Wanna go again?';
            result.appendChild(text);
            return replay();
        }
    }

    return {
        winnerCheck: winnerCheck
    }
})();

//REPLAY function
const replay = function() {
    //create button for replay
    let newB = document.createElement('button');
    newB.id = "rButton";
    newB.innerText = "Play again?";
    newB.classList.add('replay');
    let result = document.querySelector('.result');
    result.appendChild(newB);
    newB.addEventListener('click', () => {
        window.location.reload()
    });
    //remove event listeners from grid
    let gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(gridItem => {
        gridItem.removeEventListener('click', gameOn)
    })
}