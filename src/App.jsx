import { useState } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import PropTypes from "prop-types";

function Square({ value, onClick }) {
  return (
    <button
      className="square w-15 h-15 m-1 cursor-pointer border bg-orange-950 text-center text-lg font-bold leading-9"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) return;
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status w-screen">{status}</div>
      <div className="board-row flex w-screen justify-center border bg-black">
        {[...Array(9)].map((_, i) => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <>
      <Layout>
        <div className="rounded-lg bg-black p-4">
          <h1 className="text-3xl font-extrabold text-[#FFD23F] sm:text-3xl md:text-4xl lg:text-5xl">
            Tic Tac Toe Game
          </h1>
        </div>
        <div className="flex w-6/12 items-center justify-around gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          <div className="center">
            <Board />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
