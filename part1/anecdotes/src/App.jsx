import { useState } from 'react'

const Header = ({ text }) => <h2>{text}</h2>;

const AnecdoteBody = ({ text, noVotes }) => (
  <div>
    <p>{text}</p>
    <p>has {noVotes} votes</p>
  </div>
);

const AnecdoteVote = ({ text, noVotes }) => {
  if (noVotes === 0) return null;
  return <AnecdoteBody text={text} noVotes={noVotes} />

};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const highestAnecdoteVoteIndex = Number(Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b));

  const getRandomAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  }
  const updateVote = (selected) => {
    const handler = () => {
      const votesCopy = { ...votes };
      const newVoteValue = votesCopy[selected] + 1;
      setVotes({ ...votesCopy, [selected]: newVoteValue });
    };

    return handler;
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <AnecdoteBody text={anecdotes[selected]} noVotes={votes[selected]}/>
      <div><button onClick={getRandomAnecdote}>next anecdote</button></div>
      <div><button onClick={updateVote(selected)}>vote</button></div>
      <Header text='Anecdote with the most votes' />
      <AnecdoteVote text={anecdotes[highestAnecdoteVoteIndex]} noVotes={votes[highestAnecdoteVoteIndex]}/>
    </div>
  )
}

export default App;
