import db from '../db.js';

export const add = (req, res) => {
  const { name, ammount, price, userId, currencyId } = req.body;

  db.query(
    'INSERT INTO transactions SET ?',
    { user_id: userId, name, ammount, price, currency_id: currencyId },
    (err) => {
      if (err) return err;
      res.status(201).send({ added: true });
      return res.end();
    },
  );
};

export const fetch = (req, res) => {
  db.query(
    'SELECT * FROM transactions WHERE user_id = ?',
    [req.query.id],
    async (err, results) => {
      if (err) return err;
      res.status(200).send({ transactions: results });
      return res.end();
    },
  );
};

export const remove = (req, res) => {
  db.query(
    'DELETE FROM transactions WHERE id = ?',
    [req.query.id],
    async (err) => {
      if (err) return err;
      res.status(200).send('deleted');
      return res.end();
    },
  );
};
