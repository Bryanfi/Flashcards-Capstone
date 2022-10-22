import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";
import Home from "./Home";
import Study from "./Study";
import DeckList from "./DeckList";
import ViewDeck from "./ViewDeck";


function Layout() {
  const [decks, setDecks] = useState([]);
  
  const [deck, setDeck] = useState({});
  
  const [card, setCard] = useState([]);

  return (
    <div>
    <Header />
      <Switch>
        <Route exact path="/">
          <div className="container d-flex flex-column align-items-center">
            <Home className="" decks={decks} setDecks={setDecks}/>
            <DeckList decks={decks} setDecks={setDecks}/>
          </div>
          
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study deck={deck} setDeck={setDeck}/>
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck />
        </Route>
        <Route exact path="/decks/:deckId/edit">
          <EditDeck deck={deck} setDeck={setDeck}/>
        </Route>
        <Route exact path="/decks/:deckId/cards/new">
          <AddCard deck={deck} setDeck={setDeck} card={card} setCard={setCard}/>
        </Route>
        <Route exact path="/decks/:deckId/cards/:cardId/edit">
          <EditCard deck={deck} setDeck={setDeck} card={card} setCard={setCard} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
</div>
  );
}

export default Layout;