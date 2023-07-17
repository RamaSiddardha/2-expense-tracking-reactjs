import { useContext } from "react";
import { Button } from "react-bootstrap";
import LoginContext from "../../Context/LoginContext";
import { json } from "react-router-dom";

const HomePage = (props) => {
  const loginCtx = useContext(LoginContext);

  const verifyMailHandeler = async () => {
    const result = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",
      {
        method: "post",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: loginCtx.token,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.ok) {
      console.log("Verification Mail Sent to Your Mail I'd");
    }

    const data = await result.json();

    // console.log(result)
    // console.log(data )
  };

  return (
    <>
      <Button
        onClick={verifyMailHandeler}
        style={{ position: "absolute", top: "20%", left: "45%" }}
      >
        Verify Mail I'd
      </Button>
    </>
  );
};

export default HomePage;
