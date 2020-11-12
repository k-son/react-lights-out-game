import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - numRows: number of rows of board
 * - numColumns: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    numRows: 5,
    numColumns: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);

    this.state = {
      board: this.createBoard(),
      hasWon: false
    }

    this.createBoard = this.createBoard.bind(this);
  }

  /** create a board numRows high/numColumns wide, each cell randomly lit or unlit */
  createBoard() {
    let board = [];
    
    for (let y=0; y<this.props.numRows; y++) {
      let row = [];      

      for (let x=0; x<this.props.numColumns; x++) {
        const randomBoolean = Math.random() < this.props.chanceLightStartsOn;
        row.push(randomBoolean);
      }

      board.push(row);
    }

    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    let { numColumns, numRows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < numColumns && y >= 0 && y < numRows) {
        board[y][x] = !board[y][x];
      }
    }
    
    // flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */
  render() {

    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon) {
      return <h1 className="Win-msg">
                <span className="Neon-orange">You</span>
                <span className="Neon-blue"> Won!</span>
            </h1>;
    }

    // table board
    let tblBoard = [];

    for (let y=0; y<this.props.numRows; y++) {
      let row = [];

      for (let x=0; x<this.props.numColumns; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell 
            key={coord}
            isLit={this.state.board[y][x]} 
            flipCellsAroundMe={() => this.flipCellsAround(coord)} 
          />
        );
      }

      tblBoard.push(<tr key={y}>{row}</tr>);
    }

    return(
      <div>
        <p className="Neon">
          <span className="Neon-orange">Lights</span>
          <span className="Neon-blue"> Out</span>
        </p>
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
