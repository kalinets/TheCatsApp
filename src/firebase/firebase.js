import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCNiT5IVBSQag0npra_pDOdUuOaPMKWtLM',
  authDomain: 'thecatsapp.firebaseapp.com',
  databaseURL: 'https://thecatsapp.firebaseio.com',
  projectId: 'thecatsapp',
  storageBucket: 'thecatsapp.appspot.com',
  messagingSenderId: '375777448117',
  appId: '1:375777448117:web:cb61c1b9457bd1d5',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()

export { auth }
