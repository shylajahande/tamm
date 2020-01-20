import React, { Component } from 'react';
import './App.scss';
import AddCard from './AddCard';
import ShowCard from './ShowCard';
import Persons from './Persons';

class App extends Component {
  state = {
    cards: [],
  }
  componentDidMount(){
      fetch('http://localhost:5000/cards/getAll', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      .then(res=>res.json())
      .then(res=>{
        this.setState({cards: res.data});
        console.log(this.state.cards);
      });
  }
  addCard=(card)=>{
    let cards = [...this.state.cards,card];
    this.setState({cards})
  }
  render(){
    return (
      <div className="App">
        <AddCard addCard={this.addCard}/>
        <ShowCard cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
