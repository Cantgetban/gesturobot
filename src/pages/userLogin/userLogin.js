import React, { useState } from "react";
import { Translations } from "../../language-management/Translations.js";
import "./userLogin.css";
import { getUsers } from "../../databases/usersAPI.js";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const moveToGestureManagement = () => {
    navigate("/GestureManagement");
  };

  const HandleLogin = async (event) => {
    event.preventDefault();

    // Define the regular expression to match the password format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and contain at least one letter and one number"
      );
    } else {
      // Submit the form or perform any other necessary actions
      const usersData = await getUsers();
      const user = usersData.find(
        (u) => u.name === username && u.password === password
      );
      if (user) {
        moveToGestureManagement();
      } else {
        setErrorMessage("password or username incorrect");
      }
    }
  };

  return (
    <Translations>
      {({ translate }) => (
        <div class="container">
          <form onSubmit={HandleLogin} class="login-form">
            <div>
              <label htmlFor="username-input">{translate("Username")}</label>
              <input
                id="username-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password-input">{translate("Password")}</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {errorMessage && <div class="error-message">{errorMessage}</div>}
            <button type="submit">{translate("Login")}</button>
          </form>
        </div>
      )}
    </Translations>
  );
}

export default UserLogin;
