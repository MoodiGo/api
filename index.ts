// LOAD ENV VARIABLES
import "./src/config/env";

import express from 'express';
import { initRouter } from './src/infra/http/routes/index';
import {initSupabase, supabase } from "./src/infra/supabase";
import { initializeFirebase } from './src/infra/firebase_auth/index';


const app = express();

// loading router
const router = initRouter();


// loading firebase
initializeFirebase(); 

app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));