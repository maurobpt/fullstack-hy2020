import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)
const Statistics = props => (
  <div>{props.text}: {props.value}</div>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)

  const total=good+neutral+bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <h1>statistics</h1>
      {
      total>0
      ?<>
        <Statistics text="good" value={good} />
        <Statistics text="neutral" value={neutral} />
        <Statistics text="bad" value={bad} />
        <Statistics text="all" value={good+neutral+bad} />
        <Statistics text="average" value={good*1+neutral*0+bad*-1/total} />
        <Statistics text="positive" value={(good/(total))*100} />
        </>
      : <span>No feedback given</span>
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
