export const thunk = ({
  dispatch,
  getState
}) => next => {
  return action=> {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}