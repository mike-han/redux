export const logger = store => next => {
  return function dispatch(action) {
    console.log(`Trigger action: ${action.type}`);
    const result = next(action);
    return result;
  }
}