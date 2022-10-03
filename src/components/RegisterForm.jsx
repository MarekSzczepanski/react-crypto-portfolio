import { useState } from "react";

const RegisterForm = () => {
    const [isHiddenInfo, setIsHiddenInfo] = useState(true);

    const registerUser = (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-password-confirm').value;
    
        fetch('http://localhost:5000/auth/register' , {
            method: "POST",
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
        <main>
            <form onSubmit={registerUser}>
                <h2>Register</h2>
                <div className='input-container'>
                    <label htmlFor='register-name'>Username:</label>
                    <input id='register-name' type='text'/>
                </div>
                <div className='input-container'>
                    <label htmlFor='register-email'>Email:</label>
                    <input id='register-email' type='email'/>
                </div>
                <div className='input-container'>
                    <label htmlFor='register-password'>Password:</label>
                    <input id='register-password' type='password'/>
                </div>
                <div className='input-container'>
                    <label htmlFor='register-password-confirm'>Confirm password:</label>
                    <input id='register-password-confirm' type='password'/>
                </div>
                <button type='submit'>Register</button>
            </form>
            <div className={isHiddenInfo ? 'display-none' : null}>User Registered!</div>
        </main>
    )
}

export default RegisterForm;