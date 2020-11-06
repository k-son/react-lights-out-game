import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
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

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
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
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    // flips self
    // flip north
    // flip south

    // win when every cell is turned off
    // TODO: determine is the game has been won

    //this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board
    let tblBoard = [];
    for (let y=0; y<this.props.numRows; y++) {

      let row = [];

      for (let x=0; x<this.props.numColumns; x++) {
        row.push(<Cell isLit={this.state.board[y][x]} />);
      }

      tblBoard.push(<tr>{row}</tr>);
      /*
      let tblRow = [];
      tblRow = [...this.state.board[y]];
      const cellRow = tblRow.map(cell => cell ? <Cell isLit="true" /> : <Cell isLit="false" />)
      tblBoard.push(cellRow);
      */
    }


    return(
      <div>
        {this.state.hasWon ? 'You win!' : 
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
        }
      </div>
    );

    // TODO
  }
}


export default Board;
