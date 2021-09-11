import React from "react";
import "./Card.css";

const Card = ({ card, onClick, index, isDisabled, isInactive, isFlipped }) => {
  let cardClasses = `card ${isFlipped ? "is-flipped" : ""} ${
    isInactive ? "is-inactive" : ""
  }`;

  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };
  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="card-face card-frontside"></div>
      <div className="card-face card-backside">
        <img className="card-img" src={card.img} alt={card.type} />
      </div>
    </div>
  );
};

export default Card;
