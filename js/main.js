const gameBoard = (() => {
    const blankArray = [0,0,0,0,0,0,0,0,0];
    let gameArray = [0,0,0,0,0,0,0,0,0];
    let gameOver = false;

    checkRows = () => {
        let rowOne = gameArray[0]+gameArray[1]+gameArray[2];
        let rowTwo = gameArray[3]+gameArray[4]+gameArray[5];
        let rowThree = gameArray[6]+gameArray[7]+gameArray[8];
        
        if(rowOne == "XXX" || rowTwo == "XXX" || rowThree == "XXX"){
            playerWins();
        } else if(rowOne == "OOO" || rowTwo == "OOO" || rowThree == "OOO") {
            compWins();
        } else {
            console.log("keep playing!")
        };
    }
    checkColumns = () => {
        let colOne = gameArray[0]+gameArray[3]+gameArray[6];
        let colTwo = gameArray[1]+gameArray[4]+gameArray[7];
        let colThree = gameArray[2]+gameArray[5]+gameArray[8];
        
        if(colOne == "XXX" || colTwo == "XXX" || colThree == "XXX"){
            playerWins();
        } else if(colOne == "OOO" || colTwo == "OOO" || colThree == "OOO") {
            compWins();
        } else {
            console.log("keep playing!")
        };
    }
    checkDiags = () => {
        let diagOne = gameArray[0]+gameArray[4]+gameArray[8];
        let diagTwo = gameArray[2]+gameArray[4]+gameArray[6];

        if(diagOne == "XXX" || diagTwo == "XXX"){
            playerWins();
        } else if (diagOne == "OOO" || diagTwo == "OOO"){
            compWins();
        }
    }

    checkForTie = () => {
        isZero = (element) => element == 0;
        if(gameArray.findIndex(isZero) == -1 && gameOver != true){
            displayController.updateGameText("what? a tie!? we must play again!");
            document.getElementById("restartBtn").focus();
        }
    }

    playerWins = () => {
        console.log("you win!")
        displayController.displayWinMessage("player");
        displayController.updateScore("player");
        gameOver = true;
        document.getElementById("restartBtn").focus();
    }

    compWins = () => {
        console.log("you lost!")
        displayController.displayWinMessage("comp");
        displayController.updateScore("comp");
        gameOver = true;
        document.getElementById("restartBtn").focus();
    }

    checkForWin = () => {
        checkRows();
        checkColumns();
        checkDiags();
    }

    checkForGameOver = () => {
        if(gameOver != true){
            checkForWin();
            checkForTie();
        }
    }

    const cell = document.querySelectorAll(".cell");
    cell.forEach(function(e){
        e.addEventListener("click", function(){
            if(e.innerText != ""){
                displayController.displayTryAgainMessage();
                displayController.setTargetElement(e.id);
            } else {
                markSelection(e.id,"X");
                updateGameArray(e.id,"X");
                makeCompSelection();
                checkForGameOver();
                checkGameArray();
            }
        })
    });
