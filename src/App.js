import React, { Component } from 'react';
import Store from './store';

const initialState = { count: 0 };

function updateState(state, action) {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + action.amount };
    case 'DECREMENT': return { count: state.count - action.amount };
    case 'RESET': return { count: 0 };
    default: return state;
  }
}

const incrementAction = { type: 'INCREMENT', amount: 1 };
const decrementAction = { type: 'DECREMENT', amount: 1 };
const resetAction = { type: 'RESET'};

const store = new Store(updateState, initialState);

class Counter extends Component {
  constructor(props) {
    super(props);
    
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  increment() {
    store.update(incrementAction);
  }

  decrement() {
    store.update(decrementAction);
  }
  reset() {
    store.update(resetAction);
  }

  render() {
    return (
      <div className="counter">
        <p className="count">{store.state.count}</p>
        <div className="buttons">
          <div className="flex">
            <button className="decrement" onClick={this.decrement}> - </button>
            <button className="reset" onClick={this.reset}> reset </button>
            <button className="increment" onClick={this.increment}> + </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
