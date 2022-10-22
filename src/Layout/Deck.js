import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { deleteDeck } from '../utils/api/index';

function Deck({ deck }) {
  const history = useHistory();

  function deleteHandler(deckId) {
    const confirmed = window.confirm('Are you sure you want to delete this deck?');

    if (confirmed) {
      deleteDeck(deckId);
      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <div>
      <div className="card my-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title" key={deck.id}>{deck.name}</h5>
          <p>{deck.cards.length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className='d-flex justify-content-between'>
          <div>
            <Link to={`/decks/${deck.id}`}>
            <button className="btn btn-secondary " type="button">
              View
            </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
            <button className="btn btn-primary mx-2" type="button">
              Study
            </button>
            </Link>
          </div>
          <button className="btn btn-danger" type="button" onClick={() => deleteHandler(deck.id)}>Delete</button>
        </div>
      </div>
      </div>
    </div>
  )
};

export default Deck