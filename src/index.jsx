import { createStore, applyMiddleware } from './redux';
import { logger } from './middlewares';
import React from 'react';
import ReactDOM from 'react-dom';

const PreloadedState = {
  name: 'mike',
  age: 22
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.value
      }
    case 'SET_AGE':
      return {
        ...state,
        age: action.value
      }
    default:
      return state;
  }
}

const store = createStore(reducer, PreloadedState, applyMiddleware(logger));

const handleNameChange = (e) => {
  const name = e.target.value;
  store.dispatch({
    type: 'SET_NAME',
    value: name
  })
}

const handleAgeChange = (e) => {
  const age = +e.target.value;
  store.dispatch({
    type: 'SET_AGE',
    value: age
  })
}

const App = () => {
  const [name, setName] = React.useState(store.getState().name);
  const [age, setAge] = React.useState(store.getState().age);

  React.useEffect(() => {
    store.subscribe(() => {
      const { name, age } = store.getState();
      setName(name);
      setAge(age);
    })
  }, []);


  return <div>
    <span>name: {name}</span>
    <br />
    <span>age: {age}</span>
    <br/>
    <input type="text" value={name} onChange={handleNameChange}  />
    <br/>
    <input type="number" value={age} onChange={handleAgeChange} />
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'))



