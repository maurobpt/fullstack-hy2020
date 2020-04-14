import React from 'react'
import ReactDOM from 'react-dom'

const Header = (obj) => {
  //console.log(obj);
  return (
      <h1>{obj['course']}</h1>
  )
}
const Part = (obj) => {
  return (
    <p>
        {obj.name} {obj.exercises}
    </p>
  )
}
const Content = (obj) => {
  //console.log(obj);
  return (
    <div>
    <Part name={obj['parts'][0]['name']} exercises={obj['parts'][0]['exercises']} />
    <Part name={obj['parts'][1]['name']} exercises={obj['parts'][1]['exercises']} />
    <Part name={obj['parts'][2]['name']} exercises={obj['parts'][2]['exercises']} />
    </div>
  )
}
const Total = (obj) => {
  //console.log(obj);
  return (
    <p>Number of exercises {obj['parts'][0]['exercises'] + obj['parts'][1]['exercises'] + obj['parts'][2]['exercises']}</p>
  )
}


const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))