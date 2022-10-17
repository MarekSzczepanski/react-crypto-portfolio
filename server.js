import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {transactionsRouter} from './routes/transactions.js';
import {db} from './db.js';
import fs from 'fs';
import http from 'http';
import https from 'https';
const privateKey  = fs.readFileSync('cert.key', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const port = 38967 || 5145
const app = express();
const credentials = {key: privateKey, cert: certificate};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.connect((err) => {
    if (err) return console.log(err);
    console.log(('MYSQL connected'));
});

app.use('/auth', authRouter);
app.use('/transactions', transactionsRouter);

httpServer.listen(port, () => {
    console.log(`server started on port ${port}`);
});
httpsServer.listen(60332, () => {
    console.log('server started on port 60332')
});