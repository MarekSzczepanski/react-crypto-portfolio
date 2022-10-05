import express from 'express';
import {add, fetch} from '../controllers/transactions.js';

export const transactionsRouter = express.Router();

transactionsRouter.post('/add', add);
transactionsRouter.get('/fetch', fetch);