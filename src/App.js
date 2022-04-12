import { useEffect, useState } from "react";
import "./App.css";
import { NumberOfTurns } from "./components/NumberOfTurns";
import { SingleCard } from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [endOfGame, setEndOfGame] = useState({ matched: 0, shuffle: 0 });

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns(0);
  };

  // first set of cards
  useEffect(() => {
    shuffleCards();
  }, [endOfGame.shuffle]);

  // choice of the card
  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // reset choice
  const resetChoice = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (
        firstChoice.src === secondChoice.src &&
        firstChoice.id !== secondChoice.id
      ) {
        setEndOfGame((prevState) => {
          return { ...prevState, matched: prevState.matched + 1 };
        });
        setEndOfGame((prevState) => {
          if (prevState.matched === cardImages.length) {
            setFirstChoice(null);
            setSecondChoice(null);
            setDisabled(false);
            return { matched: 0, shuffle: prevState.shuffle + 1 };
          } else {
            setCards((prevCards) => {
              return prevCards.map((card) => {
                if (card.src === firstChoice.src) {
                  return { ...card, matched: true };
                } else {
                  return card;
                }
              });
            });
            setTimeout(() => {
              resetChoice();
            }, 1000);
          }

          return prevState;
        });
        // setCards((prevCards) => {
        //   return prevCards.map((card) => {
        //     if (card.src === firstChoice.src) {
        //       return { ...card, matched: true };
        //     } else {
        //       return card;
        //     }
        //   });
        // });
      } else {
        setTimeout(() => {
          resetChoice();
        }, 1000);
      }
    }
  }, [secondChoice]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="cardGrid">
        {cards.map((card) => (
          <SingleCard
            handleChoice={handleChoice}
            card={card}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
            key={card.id}
          />
        ))}
      </div>
      <NumberOfTurns turns={turns} />
    </div>
  );
}

export default App;
