const Persons = ({ persons, deletePerson }) => {
    return <div>
        <ul>
            { persons.map(person => <Person key={ person.id } person={ person } deletePerson={ deletePerson } />) }
        </ul>
    </div>
};


const Person = ({ person, deletePerson }) => {
    return <li key={ person.id }>{ person.name } { person.number } <button onClick={ () => deletePerson(person.id) }>delete</button></li>
};

export default Persons;
