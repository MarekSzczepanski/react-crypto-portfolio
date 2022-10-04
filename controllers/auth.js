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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password)  return res.status(400);

        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            const dbPassword = results[0].password;
            
            if (err) return console.log(err);
            if (!results || !await bcrypt.compare(password, dbPassword)) return res.status(401);

            res.send({loggedIn: true, username: results[0].name});
            res.end();
        })
    } catch (err) {
        console.log(err);
    }
}