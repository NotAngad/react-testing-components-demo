import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [state, setState] = useState({
    formData: {
      email: "",
      password: "",
    },
    successMessage: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handelChange = (event) => {
    let tempState = state;
    tempState.formData[event.target.name] = event.target.value;

    setState({ ...tempState });
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    let validDetails = true;

    if (state.formData.email.trim().length === 0) {
      setEmailError("Email cannot be empty!");
      validDetails = false;
    }

    if (state.formData.password.trim().length === 0) {
      setPasswordError("Password cannot be empty!");
      validDetails = false;
    }

    if (validDetails) {
      let userData = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setState({
        ...state,
        successMessage: "Logged In successfully. Will reroute in 3 seconds...",
        userData: userData.data,
      });
      setEmailError("");
      setPasswordError("");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {state?.successMessage && (
        <div className="successMessage">
          <span data-testid="login-success-text">
            <p data-testid="login-username-text">
              <b>User Name:</b> {state?.userData?.name}
            </p>
            <p>
              <b>{state?.successMessage}</b>
            </p>
          </span>
        </div>
      )}
      <br />
      <form onSubmit={handelSubmit}>
        <input
          type="email"
          name="email"
          data-testid="email-test-input"
          placeholder="Enter your email address"
          value={state.formData.email}
          onChange={handelChange}
        />
        <br />
        {emailError && (
          <span data-testid="email-error-text" style={{ color: "red" }}>
            {emailError}
          </span>
        )}
        <br />
        <br />
        <input
          type="password"
          name="password"
          data-testid="password-test-input"
          placeholder="Enter your password"
          value={state.formData.password}
          onChange={handelChange}
        />
        <br />
        {passwordError && (
          <span data-testid="password-error-text" style={{ color: "red" }}>
            {passwordError}
          </span>
        )}
        <br />
        <br />
        <input type="submit" data-testid="submit-test-input" />
      </form>
    </div>
  );
};

export default Login;
