export const applyMiddleware = (...middlewares) => {
  return createStore => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);

    middlewares = middlewares.slice();
    middlewares.reverse();

    let dispatch = store.dispatch;

    middlewares.forEach(middleware => {
      dispatch = middleware(store)(dispatch);
    });

    return {
      ...store,
      dispatch
    }
  }
}