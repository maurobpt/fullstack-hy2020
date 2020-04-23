import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)
const Statistic = props => (
  <tr><td>{props.text}</td><td>{props.value}</td></tr>
)

const Statistics = props => (
  <table>
    <Statistic text="good" value={props.good} />
    <Statistic text="neutral" value={props.neutral} />
    <Statistic text="bad" value={props.bad} />
    <Statistic text="all" value={props.good+props.neutral+props.bad} />
    <Statistic text="average" value={props.good*1+props.neutral*0+props.bad*-1/props.total} />
    <Statistic text="positive" value={(props.good/(props.total))*100} />
  </table>
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
      ? <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      : <span>No feedback given</span>
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
