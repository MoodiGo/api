import admin from 'firebase-admin';



  


export const initializeFirebase = () : void => {
    
  console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
  console.log('Firebase Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
  console.log('Firebase Private Key:', process.env.FIREBASE_PRIVATE_KEY ? 'Loaded' : 'Not Loaded');

  admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}