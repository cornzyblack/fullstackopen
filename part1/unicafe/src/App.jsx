import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>;
const Summary = ({ name, value }) => <p>{name} {value}</p>;
const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>;
const Statistics = ({ goodTotal, neutralTotal, badTotal, average, positive }) => {
  if (goodTotal === 0 & neutralTotal === 0 & badTotal === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <Summary name="good" value={goodTotal} />
      <Summary name="neutral" value={neutralTotal} />
      <Summary name="bad" value={badTotal} />
      <Summary name="all" value={goodTotal + neutralTotal + badTotal} />
      <Summary name="average" value={average} />
      <Summary name="positive" value={positive + " % "} />
    </div>
  );
}

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
        <Statistics goodTotal={feedbacks.good} badTotal={feedbacks.bad} neutralTotal={feedbacks.neutral} positive={positive} average={average}/>
      </div>
    </div>
  )
}

export default App;
