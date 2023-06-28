import Card from "react-bootstrap/Card";

const Cards = props =>{
    return  <Card
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding : '5rem',
      textAlign : 'center',
      justifyContent: 'center'
    }}
  >
     <Card.Title className="m-3"><h1>{props.title}</h1></Card.Title>
    {props.children}
    </Card>
}

export default Cards