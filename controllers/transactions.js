import {db} from '../db.js';

export const add = (req, res) => {
  const {name, ammount, price, userId, currencyId} = req.body;

  db.query('INSERT INTO transactions SET ?', {user_id: userId, name, ammount, price, currency_id: currencyId}, (err, results) => {
    if (err) return console.log(err)
      console.log('Transaction added');
      res.send({added: true});
      res.end();
  });
}

export const fetch = (req, res) => {
  db.query(`SELECT * FROM transactions WHERE user_id = ${req.query.id}`, async (err, results) => {
    if (err) return console.log(err)
    res.send({transactions: results});
    res.end();
  });
}