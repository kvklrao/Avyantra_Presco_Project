
var admin = require("firebase-admin");
var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set up storage
export const db = admin.storage().bucket('<<BUCKET_NAME>>');
