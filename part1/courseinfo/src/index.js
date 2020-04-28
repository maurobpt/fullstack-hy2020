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
const Content = (props) => {
  //console.log(props);
  return props.parts.map(function(parts, idx) {
    return <Part name={parts.name} exercises={parts.exercises} />;
});
}
const Total = (obj) => {
  //console.log(obj);
  const total = obj.parts.reduce(
    (prevValue, currentValue) => prevValue + currentValue.exercises,
    0
  );
  return (
    <p><b>Total of {total} exercises</b></p>
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course, i) => 
      <Course course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))