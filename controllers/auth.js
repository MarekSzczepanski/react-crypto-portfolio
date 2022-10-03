import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {db} from '../db.js';

export const register = (req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return console.log(err);
        if (results.length) return console.log('This email is already in use');
        if (password !== confirmPassword) return console.log('Passwords do not match');

        const roundsOfEncryption = 8;
        const hashedPassword = await bcrypt.hash(password, roundsOfEncryption);

        db.query('INSERT INTO users SET ?', {name, email, password: hashedPassword}, (err, results) => {
            if (err) return res.send({error: 'error'});
            console.log('User registered');
            res.send({registered: true});
            res.end();
        });
    });
}