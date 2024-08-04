import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXVVxdQU0mGKYBoV-T_BlIUbiNRPixSPk",
  authDomain: "cabby-ec86f.firebaseapp.com",
  projectId: "cabby-ec86f",
  storageBucket: "cabby-ec86f.appspot.com",
  messagingSenderId: "770276942008",
  appId: "1:770276942008:web:1cd6c3afb1b3ce7e1c944d"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const db = firebase.firestore();

export { db };

export const getCabs = async () => {
  try {
    const snapshot = await db.collection('cabs').get();
    const cabs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return cabs;
  } catch (error) {
    console.error("Error getting cabs:", error);
    throw error;
  }
};

export const getCabDetail = async (cabId) => {
  try {
    const cabDoc = await db.collection('cabs').doc(cabId).get();
    if (cabDoc.exists) {
      return cabDoc.data();
    } else {
      throw new Error('Cab not found');
    }
  } catch (error) {
    console.error("Error getting cab detail:", error);
    throw error;
  }
};

export const getUserBookings = async () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  const userId = currentUser.uid;
  try {
    const snapshot = await db.collection('bookings').where('userId', '==', userId).get();
    const bookings = await Promise.all(snapshot.docs.map(async doc => {
      const cabDetail = await getCabDetail(doc.data().cabId);
      return { id: doc.id, ...cabDetail };
    }));
    return bookings;
  } catch (error) {
    console.error("Error getting user bookings:", error);
    throw error;
  }
};

export const bookCab = async (cabId) => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  const userId = currentUser.uid;
  try {
    await db.collection('bookings').add({ userId, cabId });
  } catch (error) {
    console.error("Error booking cab:", error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    await db.collection('bookings').doc(bookingId).delete();
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

export const isUserAuthenticated = () => {
  return !!firebase.auth().currentUser;
};
