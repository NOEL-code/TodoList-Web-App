const myMiddleware = (store) => (next) => (action) => {
  return next(action);
};

export default function myMiddleware2(store) {
  console.log('store', store);
  return function (next) {
    console.log('next', next);
    return function (action) {
      console.log('action', action);
      return next(action);
    };
  };
}
export const timeScheduler = (store) => (next) => (action) => {
  if (!action.meta || !action.meta.delay) {
    return next(action);
  }

  let intervalId = setTimeout(() => next(action), action.meta.delay);

  return function cancel() {
    clearInterval(intervalId);
  };
};
