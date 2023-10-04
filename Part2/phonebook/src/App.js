import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setNewSearch] = useState('')
  const [notification, setNotification] = useState(null)


  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    console.log(newName);
    const nameObject = {
      name: newName,
      number: newNumber
    }


    const person = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())

    if (person && person.number === newNumber) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName("")
      setNewNumber("")
    }

    else if (person && person.number !== newNumber) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = { ...person, number: newNumber }
        console.log(newNumber);
        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
        setNotification(
          `${nameObject.name}'s number is updated.`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName("")
        setNewNumber("")

      }

    } else {
      personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNotification(
            `Added ${nameObject.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setNewName("")
          setNewNumber("")
        })

    }
  }

  const personsToShow = persons.filter(x => x.name.toUpperCase().includes(searchName.toUpperCase()))



  const deleteContactOf = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
      setNotification(
        `${name} was deleted from the phonebook.`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)

  }

  const handleFilterChange = (event) => {
    setNewSearch(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter search={searchName} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        deleteContactOf={deleteContactOf}
      />
    </div>
  )
}


export default App;
