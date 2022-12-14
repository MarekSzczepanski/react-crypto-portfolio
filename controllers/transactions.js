import {db} from '../db.js';

export const add = (req, res) => {
  const {name, ammount, price, userId, currencyId} = req.body;

  db.query('INSERT INTO transactions SET ?', {user_id: userId, name, ammount, price, currency_id: currencyId}, (err, results) => {
    if (err) return console.log(err)
    console.log('Transaction added');
    res.status(201).send({added: true});
    res.end();
  });
}

export const fetch = (req, res) => {
  db.query('SELECT * FROM transactions WHERE user_id = ?', [req.query.id], async (err, results) => {
    if (err) return console.log(err);
    res.status(200).send({transactions: results});
    res.end();
  });
}

export const remove = (req, res) => {
  db.query('DELETE FROM transactions WHERE id = ?', [req.query.id], async (err, results) => {
    if (err) return console.log(err);
    console.log('Transaction deleted');
    res.status(200).send('deleted');
    res.end();
  });
}