import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterForm = ({manageMessage}) => {
    const registerUser = (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;

        if (password !== confirmPassword) return manageMessage('error', 'Passwords don\'t match!') ;
        
        fetch(`https://crypto.vyost.usermd.net:60332/auth/register` , {
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
            if (res.registered) return manageMessage('success', 'User Registered!') ;
            if (res.error === 'error') return manageMessage('error', 'Something went wrong...') ;
            if (res.error === 'email') return manageMessage('error', 'This email address has been used');
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
    </>
    )
}

export default RegisterForm;