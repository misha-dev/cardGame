import React from "react";
import "./SingleCard.css";

export const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card Front" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="card Back"
        />
      </div>
    </div>
  );
};
