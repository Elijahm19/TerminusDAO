// Firebase Configuration
// IMPORTANT: Replace these placeholder values with your actual Firebase project credentials
// You can find these in your Firebase Console: Project Settings > General > Your Apps > SDK setup and configuration

const firebaseConfig = {
    apiKey: "AIzaSyAGV_0kZZxrjLcq7ZpGAq1GNLAO93Z4wyQ",
    authDomain: "terminus-28950.firebaseapp.com",
    projectId: "terminus-28950",
    storageBucket: "terminus-28950.firebasestorage.app",
    messagingSenderId: "989452244728",
    appId: "1:989452244728:web:9ea5d958cd6b2140e28d0d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Export for use in other files
window.db = db;
window.auth = auth;
window.storage = storage;
