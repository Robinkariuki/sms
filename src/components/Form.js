import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


export const Forms = () => {

   const [shortCode,setShortCode] = useState('')
   const [recepients,setRecepients] = useState([])
   const [message,setMessage] = useState('')
   

   const handleChangeShort = e => {
    setShortCode(e.target.value);
   

  };
  const handleChangeRecp = e => {
    setRecepients(e.target.value);
   

  };

  const handleChangeMes = e => {
    setMessage(e.target.value);
   

  };



   const SubmitForm = e => {
    e.preventDefault();
    console.log(message)
    console.log(recepients)
    console.log(message)


 
  };
    return (
        <Container className='mt-3'>
        <Form onSubmit={SubmitForm}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>shortCode</Form.Label>
    <Form.Control type="number" placeholder="shortCode" value={shortCode}  onChange={handleChangeShort} required/>
    <Form.Text className="text-muted">

    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>recipients</Form.Label>
    <Form.Control type="text" placeholder="recipients" value={recepients}   onChange={handleChangeRecp} required />
  </Form.Group>
  <FloatingLabel controlId="floatingTextarea2" label="Comments">
    <Form.Control
      as="textarea"
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
      value={message}
      onChange={handleChangeMes}
      required
    />
  </FloatingLabel>
  <br></br>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
    )
}
