export const createStore = (reducer, preloadedState, enhancer) => {
  let state = preloadedState;

  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }

  const listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  }

  const getState = () => {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}