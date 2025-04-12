import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

console.log('Loaded .env PORT:', process.env.PORT);