import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from "./NotEnoughCards";

export function Study() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [study, setStudy] = useState({
    cards: [],
    currentCard: 0,
    cardMax: 0,
    front: true,
    flipped: false,
  });

  useEffect(() => {
    async function loadDecks() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      setStudy({
        currentCard: 0,
        front: true,
        flipped: false,
        cards: loadedDeck.cards,
        cardMax: loadedDeck.cards.length,
      });
    }
    loadDecks();
  }, [deckId]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  if (study.cards.length < 3) {
    return <NotEnoughCards deck={deck} />;
  }

  
  function controlFlip() {
    setStudy({
      ...study,
      front: !study.front, 
      flipped: true, 
    });
  }

  function determineSide() {
    return study.front
      ? study.cards[study.currentCard].front
      : study.cards[study.currentCard].back;
  }

  function numberOfCardsLeft() {
    return `${study.currentCard + 1} of ${study.cardMax}`;
  }

  function ifNextButton() {
    return study.flipped ? (
      <button className="btn-primary btn mx-2" onClick={nextCard}>
        Next
      </button>
    ) : null;
  }

  
  function atMax() {
    return study.currentCard >= study.cardMax - 1;
  }

  
  function nextCard() {
    if (atMax()) {
      if (window.confirm("Start Over?")) {
        setStudy({
          ...study,
          currentCard: 0,
          flipped: false,
          front: true,
        });
      } else {
        history.push("/");
      }
    } else {
      setStudy({
        ...study,
        currentCard: study.currentCard + 1,
        flipped: false,
        front: true,
      });
    }
  }
  
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h4>Study: {deck.name}</h4>
      <div className="card w-100">
        <div className="card-body">
          <h6>Card {numberOfCardsLeft()}</h6>
          <p className="card-text">{determineSide()}</p>
          <button className="btn btn-secondary" onClick={controlFlip}>
            Flip
          </button>
          {ifNextButton()}
        </div>
      </div>
    </div>
  );
}

export default Study;