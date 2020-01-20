import React from 'react'

const Person= (props)=> {
    return (
        <div>
            <p>I am {props.name} and my age is {props.age}</p>
            <input type="text" onChange={props.nameChangeHandler} id="name" value={props.name}></input>
            <button onClick={props.deletePerson}>Delete</button>
        </div>
    )
}

export default Person;