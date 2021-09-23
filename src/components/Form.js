import React,{useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

export const Forms = () => {

   const [shortCode,setShortCode] = useState('')
   const [recipients,setRecepients] = useState('')
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


    console.log(recipients)
    console.log(shortCode)

    // const headers = {
    //   "Content-Type":"application/json",
    //   "X-Authorization-Key":"Q2ZtR0N5ODYrazlWWTZtUWtBUnJTN0NKejljeE1FNDFTSVNhZWh0SjJ4Y2NPZ3dtZ0g0N1dCdHNKTm1PSThVY3JnQkl4UzFaS1VVWGtBOXZKdWZXcE5tMFFyMWY1L2JuaWFqdTVzWlQ0bVArTElTYXZHNDJJS0p6d1dEUC9Rb3c1TDNhR0lYanBSSU8wM3FJTTVhOVRHakJLSW80QkFMUzZuL0JUZnJNMXJRc2lEc3FxS3dSS0cxRHB6Yk4ya3F0QVVOZGRYZDZaU0QrTUJTQXo1VE1UWmlic3JpNjFmaE44UWdSaGIvN3lpTDFDeVJyaExDa1ZKTlM0QW9BTHJrY2VLUzFyU2JoVXh1WlBIVGZxTnlEVVBkYTM4MkUvVmlQN0xwNWZqdmkyWEtMSjd3UnFjSW1zTlF3Mzc1OXhEK1BVYmZMNWl0Rm9JQUNyNHllZkkzVXVBPT06OhHjXO9gzExEEjwZ3iZjJXo=",
    //   "X-Requested-With":"XMLHttpRequest"
    // }
    const formData = {
      shortCode,
      recipients,
      message
 
    }
    // axios.post('/sms/v1/bulk/api_submit',headers,data)
    // .catch(err => console.log(err.response))

    // console.log(shortCode)
    // console.log(recepients)
    // console.log(message)

    axios({
      method: "post",
      url: "/sms/v1/bulk/api_submit",
      data: formData,
      headers: { 
        "Content-Type": "application/json",
        "X-Authorization-Key":"Q2ZtR0N5ODYrazlWWTZtUWtBUnJTN0NKejljeE1FNDFTSVNhZWh0SjJ4Y2NPZ3dtZ0g0N1dCdHNKTm1PSThVY3JnQkl4UzFaS1VVWGtBOXZKdWZXcE5tMFFyMWY1L2JuaWFqdTVzWlQ0bVArTElTYXZHNDJJS0p6d1dEUC9Rb3c1TDNhR0lYanBSSU8wM3FJTTVhOVRHakJLSW80QkFMUzZuL0JUZnJNMXJRc2lEc3FxS3dSS0cxRHB6Yk4ya3F0QVVOZGRYZDZaU0QrTUJTQXo1VE1UWmlic3JpNjFmaE44UWdSaGIvN3lpTDFDeVJyaExDa1ZKTlM0QW9BTHJrY2VLUzFyU2JoVXh1WlBIVGZxTnlEVVBkYTM4MkUvVmlQN0xwNWZqdmkyWEtMSjd3UnFjSW1zTlF3Mzc1OXhEK1BVYmZMNWl0Rm9JQUNyNHllZkkzVXVBPT06OhHjXO9gzExEEjwZ3iZjJXo=",
        "X-Requested-With":"XMLHttpRequest"  
    },
    })
    .catch(err => console.log(err.response))

 
  };
    return (
        <Container className='mt-3'>
        <Form onSubmit={SubmitForm}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>shortCode</Form.Label>
    <Form.Control type="text" placeholder="shortCode" value={shortCode}  onChange={handleChangeShort} required/>
    <Form.Text className="text-muted">

    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>recipients</Form.Label>
    <Form.Control type="text" placeholder="recipients" value={recipients}   onChange={handleChangeRecp} required />
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
