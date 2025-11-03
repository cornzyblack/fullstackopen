const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
<form onSubmit={ addPerson }>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export const FilterPersons = ({ newSearchName, handleSearchChange }) => {
    return <div>filter shown with  <input value={ newSearchName } onChange={ handleSearchChange } /></div>
};

export default PersonForm;
