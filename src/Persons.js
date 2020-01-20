import React, { Component } from 'react'
import Person from './Person'

class Persons extends Component {
    state= {
        persons:[
            {id: 1, name: "Shylaja", age: 29},
            {id: 2, name: "Shreekala", age: 32},
            {id: 3, name: "Srilatha", age: 35}
        ],
        showPerson: false
    }
    togglePerson=()=>{
        let showPerson = this.state.showPerson;
        this.setState({showPerson: !showPerson});
    }
    deletePerson=(id)=>{
        const persons = [...this.state.persons];
        this.setState({
            persons: persons.filter(person=>{
                return person.id !== id;
            })
        })
    }
    nameChangeHandler=(e,id)=>{
        const personIndex = this.state.persons.findIndex(person=>{
            return person.id === id;
        })
        const person = {...this.state.persons[personIndex]};
        person.name = e.target.value;
        const persons= [...this.state.persons];
        persons[personIndex] = person;
        this.setState({persons})
    } 
    render() {
        const list= this.state.persons.map(person =>{
            return <Person 
            name={person.name} 
            age={person.age} 
            key={person.id} 
            deletePerson={()=>this.deletePerson(person.id)}
            nameChangeHandler={(e)=>this.nameChangeHandler(e,person.id)}/>
        })
        return (
            <div>
                <button onClick={this.togglePerson}>Show Person</button>
                {this.state.showPerson ? list : null}
            </div>
        ) 
    }
}
export default Persons;