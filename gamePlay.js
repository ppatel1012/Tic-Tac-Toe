window.addEventListener('DOMContentLoaded', ()=>{

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameOver = false;

    const PLAYERX = 'PlayerX_Won';
    const PLAYERO = 'PlayerO_Won';
    const TIE = 'TIE';

    //all winning conditions
    const winningConditions = [ [0,1,2], [3,4,5], [6,7,8], 
        [0,3,5], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    function checkWinner() {
        let gameDone = false;
        for (let i=0; i<=7; i++){
            const win = winningConditions[i];
            const a = board[win[0]];
            const b = board[win[1]];
            const c = board[win[2]];

            if (a == '' || b=='' || c=='') {
                continue;
            }
            if (a==b && b==c){
                gameDone = true;
                break;
            }
        }
        if(gameDone){
            announce(currentPlayer === 'X' ? PLAYERX : PLAYERO);
            gameOver = true;
            return;
        }
        if(!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO:
                announcer.innerHTML = 'Player <span class = "playerO">O</span> Won';
                break;
            case PLAYERX:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    }

    const isValidAction = (tile) => {
        if (tile.innerText == 'X' || tile.innerText == 'O'){
            return false;
        }
        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        if (currentPlayer == 'X'){
            currentPlayer = 'O';
        }
        else{
            currentPlayer = 'X';
        }
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    

    const userAction = (tile, index) => {
        if(isValidAction(tile) && (!(gameOver))) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            checkWinner();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        announcer.classList.add('hide');

        if(currentPlayer == 'O') {
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});