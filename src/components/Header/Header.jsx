import React from "react";
import "./Header.css";

const Header = ({ moves, bestScore, restartGame }) => {
  return (
    <header className="header">
      <h1 className="heading">Fifa flip football</h1>
      <div className="stats">
        <span className="stats-moves">Moves: {moves}</span>
        <button onClick={restartGame} className="restart-button">
          Restart
        </button>
        <span className="stats-highscore">
          {localStorage.getItem("bestScore")
            ? `Highscore: ${bestScore}`
            : "Highscore: 0"}
        </span>
      </div>
    </header>
  );
};

export default Header;
