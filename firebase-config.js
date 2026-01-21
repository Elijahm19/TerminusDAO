// Firebase Configuration (using compat version for script tags)

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

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth and Storage only if SDKs are loaded (they're only on admin page)
const auth = typeof firebase.auth === 'function' ? firebase.auth() : null;
const storage = typeof firebase.storage === 'function' ? firebase.storage() : null;

// Make available globally
window.db = db;
window.auth = auth;
window.storage = storage;

console.log('Firebase initialized successfully');
