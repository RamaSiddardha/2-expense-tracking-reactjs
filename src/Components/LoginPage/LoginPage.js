// import { Form, Breadcrumb, FloatingLabel, Button } from "react-bootstrap";
import Cards from "../UI/Card";
import { useContext, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";

const LoginPage = (props) => {
  const [signUp, setSignUp] = useState(false);

  const Navigate = useNavigate()

  const loginCtx = useContext(LoginContext)


  // const [loggedIn, setLoggedIn] = useState(true);

  const email = useRef();
  const password = useRef();
  const conformPassword = useRef();

  const creatAccount = () => {
    setSignUp(!signUp);
    // setLoggedIn(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    let URL;
    if (!signUp) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk";
    } else if (signUp) {
      const enteredConformPassword = conformPassword.current.value;

      if (enteredConformPassword === enteredPassword) {
        URL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk";
      } else {
        alert("Password Didn't Match");
      }
    }

    try {
      const result = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      let data;
      if (result.ok) {
        setSignUp(false)
        data = await result.json();
        console.log(data.idToken);
        loginCtx.login(data.idToken)
      
      } else if (!result.ok) {
        let errorMessage = "Authentication Failed";
        data = await result.json();
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage)
      }
    } catch (error) {
      alert(error.message);
    }

    // console.log(result);

    // result.json().then((res) => console.log(res));
  };

  return (
    <div>
      <Cards title={signUp ? "Sign Up" : "Sign In"}>
        <LoginForm
          email={email}
          password={password}
          conformPassword={conformPassword}
          submit={submitHandler}
          signUp={signUp}
          creatAccount={creatAccount}
        />
      </Cards>
    </div>
  );
};

export default LoginPage;
