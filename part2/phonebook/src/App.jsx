import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import PersonForm, { FilterPersons } from './components/PersonForm.jsx'
import personService from './services/persons.js';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [persons, setPersons] = useState([]);
  const [newSearchName, setNewSearchName] = useState('');

  useEffect(() => { personService.getAll().then(allPersons => { setPersons(allPersons) }); }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      const existingPerson = persons.find(person => person.name === newName);
      const updatedPerson = { ...existingPerson, number: newNumber };
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log(existingPerson);
        personService.updatePerson(existingPerson.id, updatedPerson).then(
          returnedPerson => {
            setNewName('');
            setNewNumber('');
            console.log(returnedPerson);
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson));
          }
        )
      }
      return;
    }
    if (newName === "") {
      return;
    }
    setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }));
    personService.createPerson({ name: newName, number: newNumber }).then(returnedPerson => {
      setNewName('');
      setNewNumber('');
      setPersons(persons.concat(returnedPerson));
    });
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

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    console.log(person);
    if (window.confirm(`Delete ${ person.name }?`)) {
      personService.deletePerson(id).then(() => {
        console.log("Deleted person with id:", id);
        setPersons(persons.filter(p => p.id !== id));
      });
      } else {
        console.log("Skipped deletion!");
      };
  }


    return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons newSearchName={newSearchName} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={ newSearchName !== '' ? filterPersons() : persons } deletePerson={deletePerson} />
    </div>
  )
}

export default App;
