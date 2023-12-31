import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./RegistrationForm.module.css";
// import AuthContext from "../../Contexts/AuthContext";
import LoginContext from "../../Context/LoginContext";

const RegistrationForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsloding] = useState(false);
  const passwordInputRef = useRef();
  const conformPasswordInputRef = useRef();
  const emailInputRef = useRef();
  const histroy = useNavigate();
  const authCtx = useContext(LoginContext);

  const forgetPasswordHandler = () => {
    const enteredEmail = emailInputRef.current.value;
    if (enteredEmail.length === 0) {
      return alert("Please Enter Valid Mail");
    }
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Reset Password Mail is sent to your Mail Id");
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication Failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          // throw new Error(errorMessage);
        });
      }
    });
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    

    setIsloding(true);
    let Url;

    if (isLogin) {
      Url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk";
    } else {
      const enteredConformPassword = conformPasswordInputRef.current.value;

    if (enteredPassword !== enteredConformPassword) {
      setIsloding(false)
      return alert("Passwords Don't Match");
      
    }
      Url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk";
    }

    fetch(Url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsloding(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken,enteredEmail);
        histroy("/", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      {/* {forgetPass && <ForgetPassword/>} */}
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
           {isLogin && <button
              type="button"
              onClick={forgetPasswordHandler}
              style={{
                backgroundColor: "#495057",
                color: "white",
                border: "none",
                cursor: "pointer",
                marginTop : '0.5rem'
              }}
            >
              Forgot Password
            </button>}
          </div>
          {/* Sign in Page Details .................................................................................... */}

          {!isLogin && (
            <div>
              <div className={classes.control}>
                <label htmlFor="Conformpassword">Conform Password</label>
                <input
                  type="password"
                  id="conformPassword"
                  required
                  ref={conformPasswordInputRef}
                />
              </div>
              <div className={classes.control}>
                <label htmlFor="phone">Your Phone Number</label>
                <input type="tel" id="phone" required />
              </div>
              <div className={classes.control}>
                <label htmlFor="DOB">Your DOB</label>
                <input type="Date" id="DOB" required />
              </div>
            </div>
          )}
          {/*.................................... ......................................................................... */}
          <div className={classes.actions}>
            {!isLoading && (
              <button type="submit">
                {isLogin ? "Login" : "Creat Account"}
              </button>
            )}
            {isLoading && <p>Is Submiting...</p>}
            {/* <button type='submit'>{isLogin ? 'Login' : 'Creat Account'}</button> */}
          </div>
          <div className={classes.actions}>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default RegistrationForm;
