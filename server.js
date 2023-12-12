import express from 'express';
import cors from 'cors';
import fs from 'fs';
import http from 'http';
import https from 'https';
import authRouter from './routes/auth';
import transactionsRouter from './routes/transactions';
import db from './db';

const privateKey = fs.readFileSync('cert.key', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const port = 48482 || 5145;
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

httpServer.listen(port, () => `server started on port ${port}`);
httpsServer.listen(16027, () => 'server started on port 16027');
