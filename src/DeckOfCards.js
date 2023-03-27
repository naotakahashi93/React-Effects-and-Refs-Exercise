import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import { v4 as uuidv4 } from 'uuid';

// Build an app that displays a deck of cards, one card at a time. 
// When the page loads, go to the Deck of Cards API to create a new deck, 
// and show a button on the page that will let you draw a card.

// Every time you click the button, display a new card, 
// until there are no cards left in the deck. 
// If you try to draw when there are no cards remaining, 
// an alert message should appear on the screen with the text 
// “Error: no cards remaining!”.

const DeckOfCards = () => {

    const [deck, setDeck] = useState(null)
    const [drawCard, setDrawCard] = useState(true)
    const [card, setCard] = useState([])
    const [cardLeft, setCardsLeft] = useState(true)
    console.log("START", deck)

    useEffect( () => {
        async function getDeckId() {
            const deckId = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeck(deckId.data.deck_id)
        }
        getDeckId();
    }, [setDeck])


    useEffect ( () =>{     
        async function getCard(){
            if(deck){
            
                const draw =  await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count1`)
                const drawn = draw.data.cards[0]

                if(card.length === 52){
                    setCardsLeft(false)
                }
                else{
                setCard( c => [
                    ...c,
                    {
                        name: drawn.value + " "  + drawn.suit,
                        image: drawn.image,
                        id: uuidv4(),
                        count: card.length,
                        cardsRem: draw.data.remaining
                    }] )
                console.log(card, "CARD")}
            }
               
            
        }
        getCard()
        
    }, [deck, drawCard])

    const draw = () =>{
        setDrawCard(d => !drawCard)
    }


    console.log(deck, "DECK ID SET", card.data, "TEH CARD")

    return (
        <>
        <div>
            <p>{deck} DECK ID</p>
            <p>{cardLeft ? "" : <p> NO MORE CARDS LEFT IN THIS DECK</p>}</p>
            {card.map((c) => <Card name = {c.name} image = {c.image} key={c.id} count={c.count}/>)}
            {console.log( "return", card)}
            <button onClick={draw}> DRAW CARD </button>
        </div>
        </>
        )
    
   
    // console.log(deckURL, "THE DECK URLLL TO GET CARD")



}


export default DeckOfCards;