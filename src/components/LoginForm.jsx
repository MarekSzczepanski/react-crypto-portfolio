const LoginForm = ({setIsLoggedIn, setUsername, setUserId}) => {
    const LogIn = (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
    
        fetch('http://localhost:5000/auth/login' , {
            method: "POST",
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
        <main>
            <form onSubmit={LogIn}>
                <h2>Log in</h2>
                <div className='input-container'>
                    <label htmlFor='login-email'>Email:</label>
                    <input id='login-email' type='email'/>
                </div>
                <div className='input-container'>
                    <label htmlFor='login-password'>Password:</label>
                    <input id='login-password' type='password'/>
                </div>
                <button type='submit'>Log in</button>
            </form>
        </main>
    )
}

export default LoginForm;