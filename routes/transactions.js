import express from 'express';
import {add} from '../controllers/transactions.js';

export const transactionsRouter = express.Router();

transactionsRouter.post('/add', add);