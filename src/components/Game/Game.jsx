import React, { useState, useRef, useEffect } from "react";
import Card from "../Card/Card";
import Header from "../Header/Header";
import FinishDialog from "../Dialog/FinishDialog";
import { shuffleCards } from "../../utils/shuffle";
import { data } from "../../seedData";
import matchAudio from "../../assets/audio/match.mp3";
import "./Game.css";
const Game = () => {
  const initialData = [data.concat(data)];
  const infinity = Number.POSITIVE_INFINITY;
  const [cards, setCards] = useState(shuffleCards(initialData[0]));
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState({});
  const [disableAllCards, setDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || infinity
  );
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef(null);
  const matchCardSound = new Audio(matchAudio);

  const disableCards = () => {
    setDisableAllCards(true);
  };
  const enable = () => {
    setDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(matchedCards).length === data.length) {
      setShowModal(true);
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
    }
  };

  const evaluateMove = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setMatchedCards((prev) => ({ ...prev, [cards[first].type]: true }));

      setOpenCards([]);
      matchCardSound.play();
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disableCards();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluateMove, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);
  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card) => {
    return Boolean(matchedCards[card.type]);
  };

  const restartGame = () => {
    setMatchedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setDisableAllCards(false);
    setCards(shuffleCards(data.concat(data)));
  };

  return (
    <>
      <Header moves={moves} bestScore={bestScore} restartGame={restartGame} />
      <div className="game-board">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={disableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <FinishDialog
        showModal={showModal}
        setShowModal={setShowModal}
        moves={moves}
        restartGame={restartGame}
      />
    </>
  );
};

export default Game;
