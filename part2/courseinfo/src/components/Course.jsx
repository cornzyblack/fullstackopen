// Header, Content, and Total
const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const Courses = ({ courses }) => {
  return courses.map((course) => <Course course={course} />);
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {" "}
        {parts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.exercises,
          0
        ) }
        {" "}
        exercises
      </b>
    </p>
  );
};

export { Total };
export default Courses;
