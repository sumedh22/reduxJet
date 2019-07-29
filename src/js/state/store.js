define([
  'knockout',
  'redux',
  'state/actions',
  'redux-thunk'
], function (ko, redux, actions, thunk) {
  'use strict';

  /**
   * This is a reducer, a pure function with (state, action) => state signature.
   * It describes how an action transforms the state into the next state.
   *
   * The shape of the state is up to you: it can be a primitive, an array, an object,
   * or even an Immutable.js data structure. The only important part is that you should
   * not mutate the state object, but return a new object if the state changes.
   *
   * In this example, we use a `switch` statement and strings, but you can use a helper that
   * follows a different convention (such as function maps) if it makes sense for your
   * project.
   */
  let defaultState =  { loggedIn: false, lov: { loaded: false, data: [] } };

  const reducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'REQUEST_AUTHENTICATION':
        return { ...state, loggedIn: false };
      case 'AUTHENTICATION_SUCCESS':
        return { ...state, loggedIn: true };
      case 'AUTHENTICATION_FAILURE':
        return { ...state, loggedIn: false };
      case 'REQUESTING_LOV':
        return { ...state, lov: { loaded: false, data: [] } };
      case 'RECEIVED_LOV':
        return { ...state, lov: { loaded: true, data: action.payload, timestamp: (new Date()).getTime() } };
      case 'FAILED_LOV':
        return { ...state, lov: { loaded: false, data: [] } };
        case 'LOGOUT':
        return defaultState
      default:
        return state
    }
  }

  // Create a Redux store holding the state of your app.
  // Its API is { subscribe, dispatch, getState }.
  let store = redux.createStore(reducer, redux.applyMiddleware(thunk.default))
  
  // You can use subscribe() to update the UI in response to state changes.
  // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
  // However it can also be handy to persist the current state in the localStorage.

console.log(redux.createStore)

  return store;
});