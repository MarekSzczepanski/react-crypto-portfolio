import bcrypt from 'bcryptjs';
import {db} from '../db.js';

export const register = (req, res) => {
    const {name, email, password} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send({error: 'error'});
        if (results.length) return res.status(409).send({error: 'email'});

        const roundsOfEncryption = 8;
        const hashedPassword = await bcrypt.hash(password, roundsOfEncryption);

        db.query('INSERT INTO users SET ?', {name, email, password: hashedPassword}, (err, results) => {
            if (err) return res.status(500).send({error: 'error'});
            console.log('User registered');
            res.status(201).send({registered: true});
            res.end();
        });
    });
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) return res.status(400);

        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            const dbPassword = results[0].password;
            
            if (err) return  res.status(500).send({error: 'error'});
            if (!results || !await bcrypt.compare(password, dbPassword)) return res.status(401).send({error: 'password'});

            res.status(200).send({loggedIn: true, username: results[0].name, userId: results[0].id});
            res.end();
        })
    } catch (err) {
        console.log(err);
    }
}