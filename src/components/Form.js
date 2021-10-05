import React, {
  useState
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import FileUpload from './services/FileUpload';
import {OutTable} from 'react-excel-renderer';




export const Forms = () => {


    const [recipients, setRecepients] = useState('')
    const [message, setMessage] = useState('')
    const [count,setCount] = useState(0)
    const [col,setCol] = useState([])
    const [row,setRow] = useState([])

    

    const charactersLeft = 160-count
    const handleChangeMes = e => {
      setMessage(e.target.value);
      setCount(e.target.value.length);


    };



    const SubmitForm = e => {
      e.preventDefault();



     


      const formData = {
        shortCode:"Naivas",
        recipients,
        message

      }
      axios({
          method: "post",
          url: "/sms/v1/bulk/api_submit",
          data: formData,
          headers: {
            "Content-Type": "application/json",
            "X-Authorization-Key": "Q2ZtR0N5ODYrazlWWTZtUWtBUnJTN0NKejljeE1FNDFTSVNhZWh0SjJ4Y2NPZ3dtZ0g0N1dCdHNKTm1PSThVY3JnQkl4UzFaS1VVWGtBOXZKdWZXcE5tMFFyMWY1L2JuaWFqdTVzWlQ0bVArTElTYXZHNDJJS0p6d1dEUC9Rb3c1TDNhR0lYanBSSU8wM3FJTTVhOVRHakJLSW80QkFMUzZuL0JUZnJNMXJRc2lEc3FxS3dSS0cxRHB6Yk4ya3F0QVVOZGRYZDZaU0QrTUJTQXo1VE1UWmlic3JpNjFmaE44UWdSaGIvN3lpTDFDeVJyaExDa1ZKTlM0QW9BTHJrY2VLUzFyU2JoVXh1WlBIVGZxTnlEVVBkYTM4MkUvVmlQN0xwNWZqdmkyWEtMSjd3UnFjSW1zTlF3Mzc1OXhEK1BVYmZMNWl0Rm9JQUNyNHllZkkzVXVBPT06OhHjXO9gzExEEjwZ3iZjJXo=",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then(resp=>{
          console.log('new :',resp)
          alert(resp.data.statusDescription)
          setCol([])
          setRow([])
          setMessage('')
          setRecepients('')
          setCount(0)

        })
        .catch(err =>{
          console.log(err.response)
          alert(err.response.data.data.message)

        })
        


    };

    
    return (
        <Container className='mt-5'>
        <Form onSubmit={SubmitForm}>


 

  <FileUpload setRecepients={setRecepients} setCol={setCol} setRow={setRow}/>
  <OutTable data={row} columns={col} tableClassName="table" tableHeaderRowClass="tr" />
  

  <FloatingLabel controlId="floatingTextarea2" label="message">
 
    <Form.Control
    
      as="textarea"
      maxLength='160'
      placeholder="Leave a comment here"
      style={{ height: '100px' }}
      value={message}
      onChange={handleChangeMes}
      required
    />
  </FloatingLabel>
  <p>{count}/{charactersLeft}</p>
  <br></br>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
</Container>
    )
}
