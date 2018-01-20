import React, { Component } from 'react';
import './App.css';
import Demo from './components/demo'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shouldRender: true,
    }
  }

  toggleRender() {
    this.setState(prevState => ({
      shouldRender: !prevState.shouldRender,
    }))
  }

  render() {

    const shouldRender = this.state.shouldRender

    return (
      <div className="App">
        <div className="App-header">
          <h1> React Count Down Demo </h1>
          <div className="switch-wrap">
            <label class="switch">
              <input
                type="checkbox"
                onClick={this.toggleRender.bind(this)}
              />
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div className="App-content">
          {shouldRender &&
            <Demo />
          }
        </div>
      </div>

    );
  }
}

export default App;
