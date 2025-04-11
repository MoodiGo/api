import * as admin from 'firebase-admin';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});