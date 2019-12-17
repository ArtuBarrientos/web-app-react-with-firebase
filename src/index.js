import React,{ Suspense } from 'react'; //Suspense hace que el componente espere a la carga de código antes de hacer el render
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebaseConfig from './firebase-config';
import {
    FirebaseAppProvider
} from 'reactfire';

ReactDOM.render((
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <Suspense> 
       <App />
    </Suspense>
  </FirebaseAppProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
