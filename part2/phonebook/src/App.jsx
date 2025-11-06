import { useState, useEffect } from 'react'
import axios from 'axios';
import Persons from './components/Persons.jsx'
import PersonForm, { FilterPersons } from './components/PersonForm.jsx'

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newSearchName, setNewSearchName] = useState('');

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    });
  }

  useEffect(hook, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };

  const handleSearchChange = (event) => {
      event.preventDefault();
      setNewSearchName(event.target.value);
    };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterPersons = () => {
    if (newSearchName !== '') {
      const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(newSearchName.toLowerCase())
      );
      console.log(filteredPersons, typeof filteredPersons);
      return filteredPersons;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons newSearchName={newSearchName} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={newSearchName !== '' ? filterPersons() : persons} />
    </div>
  )
}

export default App
