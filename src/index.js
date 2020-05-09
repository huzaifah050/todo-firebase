import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, applyMiddleware, compose } from 'redux';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore,
} from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from './store/rootReducer';
import AuthIsLoaded from './AuthIsLoaded';

var firebaseConfig = {
  apiKey: 'AIzaSyC8uRKk4cGL6Fst-BBYygYn7Xd0Uy7t6aA',
  authDomain: 'todo-7c4bb.firebaseapp.com',
  databaseURL: 'https://todo-7c4bb.firebaseio.com',
  projectId: 'todo-7c4bb',
  storageBucket: 'todo-7c4bb.appspot.com',
  messagingSenderId: '959073130026',
  appId: '1:959073130026:web:2dcdca12c8db54aa729553',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore(); // <- needed if using firestore

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <App />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
