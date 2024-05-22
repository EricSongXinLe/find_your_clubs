import React, { useState } from 'react';

const Login = () => {
    const [activePanel, setActivePanel] = useState('login');  // State to track which panel is active

    // Toggle function to switch panels
    const togglePanel = () => {
        setActivePanel(activePanel === 'login' ? 'register' : 'login');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [username, setUsername] = useState('');

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const handleSubmit = (e, formType) => {
        e.preventDefault();
        if (formType === 'login') {
            console.log('Email:', email);
            console.log('Password:', password);
            // Here you can handle the login logic
        } else if (formType === 'register') {
            console.log('Username:', username);
            console.log('Email:', registerEmail);
            console.log('Password:', registerPassword);
            // Here you can handle the registration logic
        } else if (formType === 'forgotPassword') {
            console.log('Email:', forgotPasswordEmail);
            // Here you can handle the forgot password logic
        }
    };

    return (
        <div className="container"> 
            <div className="login" style={{ display: activePanel === 'login' ? 'block' : 'none' }}>
                <form className="form" id="Form2" onSubmit={(e) => handleSubmit(e, 'login')}>
                    <h2 className="title">Login</h2>
                    <input type="email" placeholder="email" value={email} className="input" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} className="input" onChange={(e) => setPassword(e.target.value)} />
                    <button className="btn" id="loginBtn" type="submit" >Login</button>
                </form>
                <button className="switchBtn" onClick={togglePanel}>Create an Account</button>
            </div>

            <div className="register" style={{ display: activePanel === 'register' ? 'block' : 'none' }}>
                <form className="form" id="Form1">
                    <h2 className="title">Create an Account</h2>
                    <input type="text" placeholder="username" value={username} className="input" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" placeholder="email" value={registerEmail} className="input" onChange={(e) => setRegisterEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={registerPassword} className="input" onChange={(e) => setRegisterPassword(e.target.value)} />
                    <button className="btn" type="submit" id="createBtn">Create Account</button>
                </form>
                <button className="switchBtn" onClick={togglePanel}>Back to Login</button>
            </div>
        </div>
    );
};

export default Login;


