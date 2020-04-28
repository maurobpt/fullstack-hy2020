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
    <Part name={obj['parts'][3]['name']} exercises={obj['parts'][3]['exercises']} />
    </div>
  )
}
const Total = (obj) => {
  //console.log(obj);
  return (
    <p><b>Total of {obj['parts'][0]['exercises'] + obj['parts'][1]['exercises'] + obj['parts'][2]['exercises']+ obj['parts'][3]['exercises']} exercises</b></p>
  )
}

const Course = (obj) => {
  return (
    <div>
      <Header course={obj.course.name} />
      <Content parts={obj.course.parts} />
      <Total parts={obj.course.parts} />
    </div>
  )
}

const App = () => {
  // const-definitions
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))