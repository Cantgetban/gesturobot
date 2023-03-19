import React, { useState } from 'react';

function GestureManagement() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleLogin = (event) => {
      event.preventDefault();
  
      // Define the regular expression to match the password format
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
      if (!passwordRegex.test(password)) {
        setErrorMessage('Password must be at least 8 characters and contain at least one letter and one number');
      } else {
        // Submit the form or perform any other necessary actions
        console.log('Form submitted');
      }
    };

    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username-input">Username:</label>
          <input id="username-input" type="text" value={username} onChange={handleUsernameChange} required />
        </div>
        <div>
          <label htmlFor="password-input">Password:</label>
          <input id="password-input" type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        {errorMessage && <div>{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
    );
  }

export default GestureManagement;