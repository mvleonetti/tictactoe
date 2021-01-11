import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// i think these lines below are fuckin me up
class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={this.props.onClick}>
        {this.props.value}
          {/* TODO */}
        </button>
      );
    }
  }
  
class Board extends React.Component {
    renderSquare(i) {
      return <Square value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
class Game extends React.Component {
  //my changes are here down
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [
        {squares: Array(9).fill(null)}
      ],

    };
  }

  handleClick(i) { 
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    
   
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "x" : "o";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  //my changes are here up
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
          'go to move' + move :
          'go to start';
          return (
            //dont forget {}'s for jsx
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
            
          );

      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
            } else {
        status = "next player: " + (this.state.xIsNext ? "x" : "o");
      }


      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={i => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>
            {/* status */}
            {status}
            </div>
            <ol>
            {/* TODO */}
            {moves}
            </ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
//has to be 'calculateWinner' not a self named thing
  function calculateWinner(squares) {
    const lines = [
      // all combinations of three in a row
      [0,1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]

    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
 }  
return null;
}