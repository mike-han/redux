import { createStore, applyMiddleware } from 'redux';
import { logger, thunk } from './middlewares';
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from './redux/combineReducers';

const PreloadedState = {
  person: {
    name: 'mike',
    age: 22
  },
  work: {
    title: 'developer',
    years: 4
  }
}

const reducer1 = (state, action) => {
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

const reducer2 = (state, action) => {
  switch (action.type) {
    case 'SET_TITLE':
      return {
        ...state,
        title: action.value
      }
    case 'SET_YEARS':
      return {
        ...state,
        years: action.value
      }
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  person: reducer1,
  work: reducer2
}), PreloadedState, applyMiddleware(thunk, logger));

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

const handleTitleChange = (e) => {
  const title = e.target.value;
  store.dispatch({
    type: 'SET_TITLE',
    value: title
  })
}

const handleYearsChangeAsync = (e) => {
  const years = +e.target.value;
  const action = (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: 'SET_YEARS',
        value: years
      });
    }, 1000)
  };
  store.dispatch(action);
}

const App = () => {
  const name = store.getState().person.name;
  const age = store.getState().person.age;

  const title = store.getState().work.title;
  const years = store.getState().work.years;

  return <div>
    <span>name: {name}</span>
    <br />
    <span>age: {age}</span>
    <br/>
    <input type="text" value={name} onChange={handleNameChange}  />
    <br/>
    <input type="number" value={age} onChange={handleAgeChange} />
    <br/>
    <span>title: {title}</span>
    <br />
    <span>years: {years}</span>
    <br/>
    <input type="text" value={title} onChange={handleTitleChange}  />
    <br/>
    <input type="number" value={years} onChange={handleYearsChangeAsync} />
  </div>
}

ReactDOM.render(<App />, document.getElementById('app'));

store.subscribe(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});





