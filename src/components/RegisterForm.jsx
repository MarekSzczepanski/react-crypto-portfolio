import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const RegisterForm = ({manageMessage}) => {
    const registerUser = (e) => {
        e.preventDefault();
        const name = e.target.elements['register-name'].value;
        const email = e.target.elements.email.value;
        const password = e.target.elements['register-password'].value;
        const confirmPassword = e.target.elements['register-password-confirm'].value;

        console.log(e.target)

        if (password !== confirmPassword) return manageMessage('error', 'Passwords don\'t match!');

        fetch(`https://crypto.vyost.usermd.net:60332/auth/register`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, password })
        }).then(response => {
            if (!response.ok) return Promise.reject(response);  
            return response.json();
        }).then(res => { 
            if (res.registered) return manageMessage('success', 'User Registered!')
         })
        .catch(error => {
            if (typeof error.json === 'function') {
                error.json().then(jsonError => {
                    if (jsonError.error === 'error') return manageMessage('error', 'Something went wrong...');
                    if (jsonError.error === 'email') return manageMessage('error', 'This email address has been used');
                }).catch(genericError => {
                    console.log(error.statusText);
                });
            } else {
                console.log('Fetch error');
                console.log(error);
            }
        });
    }

    return (
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
    )
}

export default RegisterForm;