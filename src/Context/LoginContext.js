import { createContext, useState } from "react";

const LoginContext = createContext({
  token: "",
  loggedin: false,
  profile: false,
  login: (token) => {},
  logout: () => {},
  profileUpdate: () => {},
  users: {},
});

export const LoginContextProvider = (props) => {

  
  const storedToken = localStorage.getItem("token"); // bring the token from local storage

  const [token, setToken] = useState(storedToken); //token storage
  const [update, setUpdate] = useState(false);  //Profile Completed or not
  const [user, setUser] = useState({}); //User Details

  const isLogin = !!token;
  
  //Post Request for the Profile Completion

//   if (isLogin) {
//     fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",
//       {
//         method: "post",
//         body: JSON.stringify({
//           idToken: token,
//         }),
//         headers: { "Content-Type": "application/json" },
//       }
//     ).then((res) => {
//       res.json().then((data) => {
//         if (data.users[0].displayName) {
//           setUpdate(true);
//           setUser((prv) => {
//             return { ...prv, displayName: data.users[0].displayName };
//           });
//         }
//       });
//     });
//   }

  const loginHandler = async (token) => {
    setToken(token);

    // setting Token to Local Storage
    localStorage.setItem("token", token);

    // //Post Request for the Profile Completion
    const data = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",
      {
        method: "post",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const profileData = await data.json();
    if (profileData.users[0].displayName) {
      setUpdate(true);
      setUser((prv) => {
        return { ...prv, displayName: profileData.users[0].displayName };
      });
    }
    //   console.log(profileData)
  };

  const ProfileupdateHandler = () => {
    setUpdate(true);
  };

  const logoutHandler = () => {

    setToken(null);
    localStorage.removeItem('token')
  };

  let value = {
    token: token,
    loggedin: isLogin,
    profile: update,
    login: loginHandler,
    logout: logoutHandler,
    profileUpdate: ProfileupdateHandler,
    users: user,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
