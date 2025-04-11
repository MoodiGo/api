import * as express from 'express';
import { router } from './src/infra/http/routes/index';
import './src/infra/firebase_auth';

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));