import { Outlet } from "react-router-dom";
import NavBar from "../UI/NavBar";

const RootLayout = () => {
  return (
    <>
      <NavBar/>
      <Outlet />
    </>
  );
};

export default RootLayout;
