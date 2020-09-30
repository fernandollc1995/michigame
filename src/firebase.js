// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.21.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   // For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCfbSIwSnZWmDCqmAjiWzoAdEov_H2Erxw",
    authDomain: "michigame-7f81e.firebaseapp.com",
    databaseURL: "https://michigame-7f81e.firebaseio.com",
    projectId: "michigame-7f81e",
    storageBucket: "michigame-7f81e.appspot.com",
    messagingSenderId: "486614841731",
    appId: "1:486614841731:web:98a927b0462eb46e5cdeb6",
    measurementId: "G-V7H58RJJG9"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// const fanalytics = firebase.analytics();
const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export {auth , provider};
export default db
// </script>