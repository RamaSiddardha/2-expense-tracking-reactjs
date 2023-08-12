import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
// import LoginPage from "./Components/LoginPage/LoginPage";
// import HomePage from './Components/HomePage/HomePage';
// import NavBar from "./Components/UI/NavBar";
import Profile from "./Components/ProfilePage/Profile";
import RootLayout from "./Components/Rootlayout/RootLayout";
import { useContext } from "react";
import LoginContext from "./Context/LoginContext";
import HomePage from "./Components/HomePage/HomePage";
import RegistrationForm from "./Components/RegistrationPage/RegistrationForm";

function App() {

const loginCtx = useContext(LoginContext)

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        { index: true, element: loginCtx.loggedin ?<HomePage/>:<RegistrationForm /> },
        { path: "/Profile", element:  loginCtx.loggedin ? <Profile/> :<RegistrationForm />},
      ],
    },
  ]);

  return <RouterProvider router={Router} />;
}

export default App;
