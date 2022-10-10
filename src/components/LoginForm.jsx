import Avatar from '@mui/material/Avatar';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginForm = ({setIsLoggedIn, setUsername, setUserId}) => {
    const LogIn = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
    
        fetch('http://localhost:5000/auth/login' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        .then((res) => res.json()
        .then((res) => {
            if (res.loggedIn) {
                setIsLoggedIn(true);
                setUsername(res.username);
                setUserId(res.userId);
            } 
        }))
    }

    return (
        <form className='sign-form' onSubmit={LogIn}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOpenIcon />
            </Avatar>
            <h2>Log in</h2>
            <TextField className='sign-form-input-container' id='login-email' name='email' required label='Email' type='email' />
            <TextField className='sign-form-input-container' id='login-password' name='login-password' required  label='Password' type='password' />
            <Button className='sign-form-button' type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>Log in</Button>
        </form>
    )
}

export default LoginForm;
