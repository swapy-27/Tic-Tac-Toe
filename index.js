var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
var ai = "O";
var human = "X"
var choice = document.querySelectorAll("[name='player-option']")
var options = document.getElementsByClassName('row');

var result = document.getElementById('result').children[1]


function onLoad() {
    //Handle Player click on Grid
   
    for (var i = 0; i < options.length; i++) {
        const curr_eve = options[i];
        curr_eve.addEventListener('click', () => {
            const span = curr_eve.children[0].children[0];
            const col = curr_eve.getAttribute("data-col")
            const row = curr_eve.getAttribute("data-row")

            //Player Move
            if (board[row][col] == "") {
                span.innerHTML = human;
            }

            //Bot Move
            const botMove = bestMove();
            console.log(botMove)
            if (botMove) {
                board[botMove.i][botMove.j] = ai;
                const botPlace = document.querySelector(
                  `[data-row='${botMove.i}'][data-col='${botMove.j}'] span`
                );
                    console.log(botPlace)
                botPlace.innerHTML = ai;
              }



            //Check Result
            const outcome = checkWinner();

            if (outcome == "tie") {
                result.innerHTML = "Match Tie"
            } else {
                result.innerHTML = `${outcome} wins`
            }
        })
    }
}



const equals = (a, b, c) => {
    return (a == b && b == c && a != "");
}
const  checkWinner=()=> {
    var winner = null;

  


    //horizontal
    for (let i = 0; i < 3; i++) {

        if (equals(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0]
        }

    }

    //vertical
    for (let i = 0; i < 3; i++) {

        if (equals(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i]
        }

    }


    //diagonally
    if (equals(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }


    //openSpots
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == "") {
                openSpots++;
            }
        }
    }



    if (winner == null && openSpots == 0) {
        return "tie";
    }
    return winner
}



//Bot move
const bestMove = () => {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Is the spot available?
            if (board[i][j] == "") {
                board[i][j] = ai;
                let score = minimax(board, 0, false);
                board[i][j] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };
                }
            }
        }
    }

    return move;
};

//Calculate where next move should take place
const minimax = (board, depth, isMaximizing) => {
    //Check the winner and return the score
    let result = checkWinner();
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = ai;
                    let score = minimax(board, depth + 1, false);
                    board[i][j] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Is the spot available?
                if (board[i][j] == "") {
                    board[i][j] = human;
                    let score = minimax(board, depth + 1, true);
                    board[i][j] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
};

//Score to decide the next move of bot
const scores = {
    X: 10,
    O: -10,
    tie: 0,
  };
  
  //Function to update selected option and setting the score for bot
  const updateSelector = (value) => {
    if (value === "1") {
      human = "X";
      ai = "O";
    } else {
      human = "O";
      ai = "X";
    }
  
    //Update the score based on selector
    scores[human] = -10;
    scores[ai] = 10;
  };
  
  //Update player option initally
  let start = choice[0].value;

  updateSelector(start);

  //Update player option on option change
  choice.forEach((e) => {
    e.addEventListener("change", (f) => {
      const { value } = f.target;
      updateSelector(value);
    });
  });
onLoad();


