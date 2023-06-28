import { Form, Breadcrumb, FloatingLabel, Button } from "react-bootstrap";

const LoginForm = (props) =>{
    return <form onSubmit={props.submit}>
    <FloatingLabel
      controlId="floatingInput"
      label="Email address"
      className="mb-3"
    >
      <Form.Control type="email" placeholder="name@example.com" ref={props.email}/>
    </FloatingLabel>
    <FloatingLabel controlId="floatingPassword" label="Password">
      <Form.Control
        type="password"
        placeholder="Password"
        className="mb-3"
        ref={props.password}
      />
    </FloatingLabel>
    {props.signUp && (
      <FloatingLabel
        controlId="floatingConformPassword"
        label="Conform Password"
        className="mb-3"
      >
        <Form.Control type="password" placeholder="Conform Password" ref={props.conformPassword}/>
      </FloatingLabel>
    )}

    <Button type="submit" className="m-3 ">
      {" "}
      {props.signUp ? "Sign Up" : "Sign In"}
    </Button>

    {!props.signUp && (
      <Breadcrumb.Item onClick={props.creatAccount}>
        Creat Account
      </Breadcrumb.Item>
    )}
  </form>
}

export default LoginForm