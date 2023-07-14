import { useContext, useRef } from "react";
import "./Profile.css";
import { Button } from "react-bootstrap";
import LoginContext from "../../Context/LoginContext";

const Profile = (props) => {
  const fullNameRef = useRef();
  const photoLinkRef = useRef();

  const loginCtx = useContext(LoginContext);

  async function submitHandler(e) {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const photoLink = photoLinkRef.current.value;

    const result = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAw8FdFxlRKxLBZz6ifYCdKP9Jqj8Vmslk",
      {
        method: "post",
        body: JSON.stringify({
          idToken: loginCtx.token,
          displayName: fullName,
          photourl: photoLink,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.ok) {
      loginCtx.profileUpdate();
    }

    fullNameRef.current.value = "";
    photoLinkRef.current.value = "";
  }

  return (
    <>
      <div className="profile">
        <h3>Contact Datails</h3>
        <form onSubmit={submitHandler}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            placeholder={loginCtx.users.displayName?loginCtx.users.displayName: "Full Name" }
            ref={fullNameRef}
            required
          ></input>

          <label htmlFor="photoLink">Profile Photo Link</label>
          <input
            id="photoLink"
            type="url"
            placeholder="Photo Link"
            ref={photoLinkRef}
            required
          ></input>

          <Button
            style={{
              borderColor: "#B57272",
              backgroundColor: "#B57272",
              float: "right",
              marginTop: "5%",
            }}
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </>
  );
};

export default Profile;
