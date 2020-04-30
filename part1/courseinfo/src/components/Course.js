import React from 'react'

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

export default class Course extends React.Component {
    render (){
//const Course = (obj) => {
    return (
      <div>
        <Header course={this.props.course.name} />
        <Content parts={this.props.course.parts} />
        <Total parts={this.props.course.parts} />
      </div>
    )
  }
}