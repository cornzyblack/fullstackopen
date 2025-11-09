import { useState, useEffect } from 'react'
import Persons from './components/Persons.jsx'
import PersonForm, { FilterPersons } from './components/PersonForm.jsx'
import personService from './services/persons.js';
import {SuccessNotification, ErrorNotification} from './components/Notification';
import './index.css';

const App = () => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [persons, setPersons] = useState([]);
  const [newSearchName, setNewSearchName] = useState('');
  const [successNotificationState, setSuccessNotification] = useState("");
  const [errorNotificationState, setErrorNotification] = useState("");

  useEffect(() => { personService.getAll().then(allPersons => { setPersons(allPersons) }); }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      const existingPerson = persons.find(person => person.name === newName);
      const updatedPerson = { ...existingPerson, number: newNumber };
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.updatePerson(existingPerson.id, updatedPerson).then(
          returnedPerson => {
            setNewName('');
            setNewNumber('');
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson));
          }
        ).catch(error => {
        setErrorNotification(`Information of ${existingPerson.name} has already been removed from server`);
        setTimeout(() => { setErrorNotification(null) }, 5000);
      });
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
    setSuccessNotification(`Added ${newName}`);
    setTimeout(() => { setSuccessNotification(null) }, 5000);
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
      return filteredPersons;
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${ person.name }?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      }).catch(error => {
        setErrorNotification(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => { setErrorNotification(null) }, 5000);
      });
      } else {
        console.log("Skipped deletion!");
      };
  }


  return (
  <div>
    <h2>Phonebook</h2>
      <SuccessNotification message={ successNotificationState} />
      <FilterPersons newSearchName={ newSearchName } handleSearchChange={ handleSearchChange } />
    <h2>add a new</h2>
    <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
    newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ErrorNotification message={ errorNotificationState } />
      <Persons persons={ newSearchName !== '' ? filterPersons() : persons } deletePerson={deletePerson} />
  </div>
)
}

export default App;
