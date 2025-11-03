const Persons = ({ persons }) => {
    return <div>
        <ul>
            { persons.map(person => <Person key={ person.id } person={ person } />) }
        </ul>
    </div>
};


const Person = ({ person }) => {
    return <li key={ person.id }>{ person.name } { person.number }</li>
};

export default Persons;
