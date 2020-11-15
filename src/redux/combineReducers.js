export const combineReducers = (reducers) => {
  return (state, action) => {
    const reducerKeys = Object.keys(reducers)

    let hasChanged = false
    const nextState = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const reducer = reducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    hasChanged =
      hasChanged || reducerKeys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }

}