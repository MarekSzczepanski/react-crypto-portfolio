import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterForm = () => {
    const [isHiddenInfo, setIsHiddenInfo] = useState(true);

    const registerUser = (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;
    
        fetch('http://localhost:5000/auth/register' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                confirmPassword
            })
        })
        .then((res) => res.json()
        .then((res) => {
            if (res.registered) {
                setIsHiddenInfo(false);
                setTimeout(() => {setIsHiddenInfo(true);}, 2000);
            }
        }))
    }

    return (
    <>
        <form className='sign-form' onSubmit={registerUser}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <h2>Register</h2>
            <TextField className='sign-form-input-container' id='register-name' name='username' required label='Username' type='text'/>
            <TextField className='sign-form-input-container' id='register-email' name='email' required label='Email' type='email' />
            <TextField className='sign-form-input-container' id='register-password' name='register-password' required label='Password' type='password' />
            <TextField className='sign-form-input-container' id='register-password-confirm' name='register-password-confirm' required label='Confirm password' type='password'/>
            <Button className='sign-form-button' type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>Register</Button>
        </form>
        <div className={isHiddenInfo ? 'display-none' : null}>User Registered!</div>
    </>
    )
}

export default RegisterForm;