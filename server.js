import express from 'express';
import cors from 'cors';
import {authRouter} from './routes/auth.js';
import {transactionsRouter} from './routes/transactions.js';
import {db} from './db.js';

const port = process.env.PORT || 5145
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.connect((err) => {
    if (err) return console.log(err);
    console.log(('MYSQL connected'));
});

app.use('/auth', authRouter);
app.use('/transactions', transactionsRouter);

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});