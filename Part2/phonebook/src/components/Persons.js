import React from "react";


const Persons = ({ persons, deleteContactOf }) => {
  return (
    <ul>
      {persons.map(person =>
        <li key={person.name}>{person.name} {person.number}
          <button onClick={() => deleteContactOf(person.id, person.name)}>Delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons