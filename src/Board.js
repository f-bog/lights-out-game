import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
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
    nrows: 5,
    ncols: 5,
    chanceListStartsOn: 0.25,
  };
  constructor(props) {
    super(props);

    // TODO: set initial state
    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      board.push([]);
      for (let j = 0; j < this.props.ncols; j++) {
        board[i].push(Math.random() < this.props.chanceListStartsOn);
      }
    }

    // TODO: create array-of-arrays of true/false values

    console.log(board);
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);
    // console.log(board[y][x]);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y + 1, x);
    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.flat().every((x) => x === false);

    console.log(hasWon);
    this.setState({ hasWon, board });
  }

  resetGame() {
    this.setState((prev) => ({
      hasWon: !prev.hasWon,
    }));
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else

    // TODO
    let winner = (
      <div>
        <div className='Board-title'>
          <span className='neon-orange'>You</span>
          <span className='neon-blue'>Win</span>
        </div>
        <button className='Board-button' onClick={this.resetGame}>
          Play again!
        </button>
      </div>
    );
    // make table board

    // TODO
    let displayBoard = (
      <div>
        <div className='Board-title'>
          <span className='neon-orange'>Lights</span>
          <span className='neon-blue'>Out</span>
        </div>
        <table className='Board'>
          <tbody>
            {this.state.board.map((rows, rowIndex) => (
              <tr key={rowIndex}>
                {rows.map((cell, colIndex) => (
                  <Cell
                    flipCellsAroundMe={this.flipCellsAround}
                    isLit={cell}
                    coords={`${rowIndex}-${colIndex}`}
                    key={`${rowIndex}-${colIndex}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    return <div>{this.state.hasWon ? winner : displayBoard}</div>;
  }
}

export default Board;
