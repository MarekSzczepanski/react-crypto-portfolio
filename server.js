import express from 'express';
import cors from 'cors';
import fs from 'fs';
import http from 'http';
import https from 'https';
import authRouter from './routes/auth.js';
import transactionsRouter from './routes/transactions.js';
import db from './db.js';

const privateKey = fs.readFileSync('cert.key', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const port = 35375 || 5145;
const app = express();
const credentials = { key: privateKey, cert: certificate };
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect((err) => {
  if (err) return err;
  return null;
});

app.use('/auth', authRouter);
app.use('/transactions', transactionsRouter);

httpServer.listen(port, () => console.log(`server started on port ${port}`));
httpsServer.listen(45748, () => console.log('server started on port 45748'));

//npx forever start -c nodemon server.js --exitcrash
