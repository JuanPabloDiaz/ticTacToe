import { useState } from "react";
import "./App.css";
import Layout from "./Components/Layout";
import PropTypes from "prop-types";
import { GiTicTacToe } from "react-icons/gi";

function Square({ value, onClick }) {
  return (
    <button
      className="square w-15 h-15 m-1 cursor-pointer rounded-xl bg-[#433633] text-center text-4xl font-bold leading-9 text-[#F7F0F5]"
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
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="status text-center text-2xl font-bold text-black/60">
        {status}
      </div>
      <div className="shadow-[#5C5552 m-2 grid grid-flow-col grid-rows-3 rounded-xl bg-[#DECBB7] p-4 shadow-xl">
        {[...Array(9)].map((_, i) => (
          <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        onClick={resetGame}
        className="flex justify-center gap-8 rounded-xl  bg-[#DECBB7] px-4 py-2 text-center font-bold text-[#5C5552] transition duration-200 hover:bg-[#F7F0F5]"
      >
        <GiTicTacToe className="h-6 w-6 rounded-lg bg-transparent" />
        <span>Reset Game</span>
        <GiTicTacToe className="h-6 w-6 rounded-lg bg-transparent" />
      </button>
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
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-[#5C5552] p-4 text-center text-[#F7F0F5]">
          <h1 className="text-3xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
            Tic Tac Toe
          </h1>
          {/* <GiTicTacToe className="h-10 w-full" /> */}
        </div>
        <div className="gap-2 rounded-lg bg-[#8F857D] p-4 sm:gap-3 md:gap-4 lg:gap-6">
          <section className="">
            <Board />
          </section>
        </div>
      </Layout>
    </>
  );
}

export default App;
