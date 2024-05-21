import React, { useState } from 'react';

const Login = () => {
    const [activePanel, setActivePanel] = useState('login');  // State to track which panel is active

    // Toggle function to switch panels
    const togglePanel = () => {
        setActivePanel(activePanel === 'login' ? 'register' : 'login');
    };

    return (
        <div className="container">
            <div className="login" style={{ display: activePanel === 'login' ? 'block' : 'none' }}>
                <form className="form" id="Form2">
                    <h2 className="title">Login</h2>
                    <input type="email" placeholder="email" className="input" />
                    <input type="password" placeholder="password" className="input" />
                    <a href="#" className="link">
                        Forgot password?
                    </a>
                    <button className="btn">Login</button>
                </form>
                <button className="switchBtn" onClick={togglePanel}>Create an Account</button>
            </div>

            <div className="register" style={{ display: activePanel === 'register' ? 'block' : 'none' }}>
                <form className="form" id="Form1">
                    <h2 className="title">Create an Account</h2>
                    <input type="text" placeholder="username" className="input" />
                    <input type="email" placeholder="email" className="input" />
                    <input type="password" placeholder="password" className="input" />
                    <button className="btn">Create Account</button>
                </form>
                <button className="switchBtn" onClick={togglePanel}>Back to Login</button>
            </div>
        </div>
    );
}

export default Login;

