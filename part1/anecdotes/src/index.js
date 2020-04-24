import React from 'react'
import ReactDOM from 'react-dom'

class TopVote extends React.Component {
  render() {
    let points = this.props.points;
    let maxVote = Math.max.apply(Math, points);
    let index = points.indexOf(maxVote);
    let anecdotes = this.props.anecdotes;
    return (
      <>
        <p>{anecdotes[index]}</p>
        <p>has {maxVote} votes</p>
      </>
    );
  }
}

class Button extends React.Component {
  render() {
    return <button onClick={this.props.eventClick}>{this.props.name}</button>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      points: [0, 0, 0, 0, 0, 0]
    };
  }

  next(a, b) {
    this.setState({
      selected: Math.floor(Math.random() * (b - a) + a)
    });
  }

  vote() {
    let newPoints = this.state.points.slice();
    newPoints[this.state.selected] += 1;
    this.setState({
      points: newPoints
    });
  }

  render() {
    const anecdotes = [
      "If it hurts, do it more often",
      "Adding manpower to a late software project makes it later!",
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      "Premature optimization is the root of all evil.",
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
    ];

    return (
      <>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[this.state.selected]}</p>
        <p>has {this.state.points[this.state.selected]} votes</p>
        <Button name="Vote" eventClick={() => this.vote()} />
        <Button
          name="Next anecdote"
          eventClick={() => this.next(0, anecdotes.length)}
        />
        <h1>Anecdote with most votes</h1>
        <TopVote anecdotes={anecdotes} points={this.state.points} />
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);