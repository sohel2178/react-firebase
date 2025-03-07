import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, {FirebaseContext} from './components/firebase';
import './index.css';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import rootReducer from './reducers'


const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render (
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase ()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById ('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
