import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>;
const Summary = ({ text, total }) => <p>{text} {total}</p>;
const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;

const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })


  const setFeedback = (feedback) => {
    const handler = () => {
      const newFeedback = feedbacks[feedback] + 1;
      setFeedbacks({ ...feedbacks, [feedback] : newFeedback });
      console.log(feedback, newFeedback, feedbacks);
    }
    return handler;
  };

  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  const average = (1 * feedbacks.good + 0 * feedbacks.neutral - (1 * feedbacks.bad)) / total;
  const positive = feedbacks.good / total;

  return (
    <div>
      <div>
        <Header text="give feedback" />
      </div>
      <div>
        <Button name="good" onClick={setFeedback("good")} />
        <Button name="neutral" onClick={setFeedback("neutral")} />
        <Button name="bad" onClick={setFeedback("bad")} />
    </div>
        <div>
        <Header text="statistics" />
        <Summary text="good" total={feedbacks.good} />
        <Summary text="neutral" total={feedbacks.neutral} />
        <Summary text="bad" total={feedbacks.bad} />
        <Summary text="all" total={feedbacks.good+ feedbacks.neutral + feedbacks.bad} />
        <Summary text="average" total={average} />
        <Summary text="positive" total={positive + " % "} />

      </div>
    </div>
  )
}

export default App;
