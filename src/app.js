import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import i18n from 'i18n';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import configI18n from './helpers/i18n.js';
import db from './helpers/db.js';
import authRouter from './routes/auth.routes.js';

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');
const app = express();

app.use(express.json());

app.use(cors());

app.use(i18n.init);

app.use(morgan('tiny'));

/* routes */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger
app.use(authRouter);

/* configuration */
const env = process.env.NODE_ENV;
if (env === 'development') {
  /* config stuff here */
} else if (env === 'production') {
  /* config stuff here */
}

configI18n();

try {
  await db.sequelize.sync();
  console.log('Connect to database successfully!');
} catch (error) {
  console.log(error);
}

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`);
});
