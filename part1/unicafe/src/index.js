import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button =(props) =>(
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good + 1)
  const setToNeutral = () => setNeutral(neutral + 1)
  const setToBad = () => setBad(bad + 1)

  const Display = props => <div>{props.text}: {props.value}</div>

  const total=good+neutral+bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={good+neutral+bad} />
      <Display text="average" value={good*1+neutral*0+bad*-1/total} />
      <Display text="positive" value={(good/(total))*100} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
