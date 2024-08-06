import express from 'express';
import { add, fetch, remove } from '../controllers/transactions.js';

const transactionsRouter = express.Router();

export default transactionsRouter;

transactionsRouter.post('/add', add);
transactionsRouter.get('/fetch', fetch);
transactionsRouter.delete('/remove', remove);
