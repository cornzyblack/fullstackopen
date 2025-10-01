// Header, Content, and Total
const Header = (props) => {
  console.log(`Header: ${props}`)
  return (
    <h1>{props.course}</h1>
  );
};

const Content = (props) => {
  console.log(`Content: ${props}`)
  return (
  <div>
    <p>
      <p>{props.parts[0].name} {props.parts[0].noExcercises}</p>
    </p>
    <p>
      <p>{props.parts[1].name} {props.parts[1].noExcercises}</p>
    </p>
    <p>
      <p>{props.parts[2].name} {props.parts[2].noExcercises}</p>
    </p>
  </div>
  );
};

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises: {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development';
  let classParts = [{
      "name": 'Fundamentals of React',
      "noExcercises": 10
    },
    {
      "name": 'Using props to pass data',
      "noExcercises": 7
    },
    {
      "name": 'State of a component',
      "noExcercises": 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={classParts} />
      <Total exercises={[classParts[0].noExcercises, classParts[1].noExcercises, classParts[2].noExcercises] } />
    </div>
  );
};


export default App;
