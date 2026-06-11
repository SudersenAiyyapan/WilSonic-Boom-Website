/* ═══════════════════════════════════════════════════════════════════════════
   WILSONIC BOOM - FIREBASE CONFIGURATION
   ═══════════════════════════════════════════════════════════════════════════ */

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2EKe8PPxCkM5aUqCOBU9oWopBt4lrrq8",
    authDomain: "wilsonicboom-797aa.firebaseapp.com",
    projectId: "wilsonicboom-797aa",
    storageBucket: "wilsonicboom-797aa.firebasestorage.app",
    messagingSenderId: "833225313689",
    appId: "1:833225313689:web:1f303d0a5e388931e95708"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Helper functions for Firestore operations
const FirebaseDB = {
    // Get all documents from a collection
    async getCollection(collectionName) {
        try {
            const snapshot = await db.collection(collectionName).get();
            const data = {};
            snapshot.forEach(doc => {
                data[doc.id] = doc.data();
            });
            return data;
        } catch (error) {
            console.error('Error getting collection:', error);
            return null;
        }
    },

    // Get a single document
    async getDocument(collectionName, docId) {
        try {
            const doc = await db.collection(collectionName).doc(docId).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('Error getting document:', error);
            return null;
        }
    },

    // Set/update a document
    async setDocument(collectionName, docId, data) {
        try {
            await db.collection(collectionName).doc(docId).set(data, { merge: true });
            return true;
        } catch (error) {
            console.error('Error setting document:', error);
            return false;
        }
    },

    // Add a new document with auto-generated ID
    async addDocument(collectionName, data) {
        try {
            const docRef = await db.collection(collectionName).add(data);
            return docRef.id;
        } catch (error) {
            console.error('Error adding document:', error);
            return null;
        }
    },

    // Delete a document
    async deleteDocument(collectionName, docId) {
        try {
            await db.collection(collectionName).doc(docId).delete();
            return true;
        } catch (error) {
            console.error('Error deleting document:', error);
            return false;
        }
    }
};

// Check if user is admin
function isAdminMode() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}
