/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;
//SET CURRPLAYER TO 1 BY DEFAULT
let currPlayer = 1; // active player: 1 or 2
const board = [];
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //THIS LOOK CREATES THE BOARD BY LOOPING THROUGH HEIGHT AND FOR EVERY ITERATION IT CREATES A NEW ARRAY.
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  //WHY DOESN'T THIS FOLLOWING CODE WORK?? --->
  // board.width = WIDTH;
  // board.height = HEIGHT;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  // create  the top table row and give it and id of "column-top"
  let topRow = document.createElement("tr");
  topRow.setAttribute("id", "column-top");
  //adding an event listener for the top row which a user will click on to decide where to drop his/her piece.
  topRow.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let cell = document.createElement("td");
    cell.setAttribute("id", x);
    topRow.append(cell);
  }
  htmlBoard.append(topRow);

  // TODO: add comment for this code
  // THIS CODE WILL DYNAMICALLY CREATE GAME BOARD!
  // THE OUTER FOR LOOP ITERATES OVER HEIGHT VARIABLE AND CREATES A NEW ROW ELEMENT UNTIL HEIGHT IS REACHED
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    // INNER LOOP ITERATES OVER WIDTH VARIABLE WHERE A NEW TABLE TABLE CELL IS CREATED UNTIL WIDTH IS REACHED.
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      //SETS THE ID OF EACH TABLE CELL CREATED
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  //TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //if its a falsy(empty cell) then that means the cell is empty and gamePiece1 could be placed there -->
    if (!board[y][x]) {
      //returns the row index of the empty slot if empty(y)
      return y;
    }
  }
  //no empty spot was found in that column
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let gamePiece1 = document.createElement("div");
  gamePiece1.classList.add("piece");
  //ADDS CSS CLASS TO THE GAMEPIECE DENPENDING ON WHICH PLAYER IS THE CURRENT PLAYER
  gamePiece1.classList.add(`player${currPlayer}`);
  //CREATED A VARIABLE FOR THE EMPTY SLOT
  let emptySlot = document.getElementById(`${y}-${x}`);
  emptySlot.append(gamePiece1);
}

/** endGame: announce game end */
function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from id of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  //I DO NOT UNDERSTAND THE FOLLIWING CODE BLOCK -->
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  //DELAYS ALERT MESSAGE TO HELP THE GAME FLOW SMOOTHER
  if (checkForWin()) {
    setTimeout(function () {
      return endGame(`Player ${currPlayer} wins!`);
    }, 1000);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //DELAYS ALERT MESSAGE TO HELP THE GAME FLOW SMOOTHER
  //CHECKS IF ALL CELLS/ROWS RETURN A TRUE(NOT EMPTY)--->
  if (board.every((row) => row.every((cell) => cell))) {
    setTimeout(function () {
      return endGame("Its a tie!");
    }, 1000);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //EVERYTIME A GAME PIECE IS PLACED ON THE BOARD, THE CURRPLAYER IS CHECKED AND SWITCHED TO THE OTHER PLAYER(1 OR 2)
  currPlayer = currPlayer === 1 ? 2 : 1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  // TODO: read and understand this code. Add comments to help you.
  //LOOPING THROUGH HEIGHT VARIABLE
  for (let y = 0; y < HEIGHT; y++) {
    //LOOPING THROUGH WIDTH VARIABLE
    for (let x = 0; x < WIDTH; x++) {
      //CHECKS FOR 4 PIECES ACROSS HORIZONTALLY
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //CHECKS FOR VERTICAL UP  WIN BY GOING UP +1 SPOT(Y) BUT X GRID SPOT DOES NOT CHANGE
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //CHECKS RIGHT DIAGNOL WIN BY MOVING UP 1 Y SPOT AND THEN OVER RIGHT 1 X SPOT EACH TIME, THEREFOR
      //CREATING A DIAGNAL LINE.
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //CHECKS FOR UP DIAGNAL LEFT
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
