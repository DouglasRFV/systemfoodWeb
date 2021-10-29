import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBs0XU9rvMQUNS7WdZeM3P0s2RDxeduNQU",
    authDomain: "systemfoodweb.firebaseapp.com",
    projectId: "systemfoodweb",
    storageBucket: "systemfoodweb.appspot.com",
    messagingSenderId: "254771563130",
    appId: "1:254771563130:web:b741bf7669afff7eaa89c3",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { firebase, auth, app };