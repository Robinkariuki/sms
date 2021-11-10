import React, {
  useState,
  useEffect
} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import FileUpload from './services/FileUpload';
import Card from 'react-bootstrap/Card';
import FormTable from "./services/table";
import DbUpload from "./services/dbUpload";





export const Forms = () => {


    const [recipients, setRecepients] = useState('')
    const [message, setMessage] = useState('')
    const [count,setCount] = useState(0)
    const [col,setCol] = useState([])
    const [row,setRow] = useState([])
    const [description,setDescription] = useState('')
    const [recipientsDB, setRecepientsDB] = useState('')
    const [dbstatus,setStatus] = useState()
  
    
    
    const [branch,setBranch] = useState([])



   const getBranch = async()=>{
     const url = 'http://localhost:3001/api/getBranches'
     await axios.get(url)
     .then(res => {
      setBranch(res.data.recordsets[0])
     })
     
     
   } 

    useEffect(() => {
       getBranch()
    
    
    }, [])


    const charactersLeft = 160-count
    let contactCount = recipients.split(',');
    const handleChangeMes = e => {
      e.preventDefault();
      setMessage(e.target.value);
      setCount(e.target.value.length);


    };
    const handleChangeDes = e =>{
      e.preventDefault();
      setDescription(e.target.value);

    }



  const getContacts =(branch_id)=>{
     
     const url ="http://localhost:3001/api/getContacts"
       axios({
       method:'post',
       url,
       data:branch_id

     }).then(res=>{
      setRecepientsDB(res.data.recordset)
      // console.log(res.data.recordset)
      const data = []
     const contacts = []
      res.data.recordset.map(obj=>{
        contacts.push( obj.Contact)
        setRecepients(contacts.toString())

        data.push(Object.values(obj))
        setRecepientsDB(data)
        setRow(data)
        setCol(Object.keys(obj))
        
       

      })
      
     })


  }


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
          alert(resp.data.statusDescription)
          setCol([])
          setRow([])
          setMessage('')
          setRecepients('')
          setCount(0)
          setDescription('')
        





          const dataFromForm ={
            recipients,
            message,
            description,
    
          }
      
          const data = JSON.stringify(dataFromForm)
          axios({
            method:"post",
            url:'http://localhost:3001/api/log',
            data,
            headers: {
              "Content-Type": "application/json"
            
            },
    
          })
          .then(res=>{
            alert(res.data)
            console.log(res)
          })
          .catch(err =>{
            
            alert(err)
            console.log(err)
    
          })

        })
        .catch(err =>{
       
          alert(err.response.data.data.message)

        })
        


    };
  
 
    return (
        <Container className='mt-5'>

<Card
    style={{ width: '18rem' }}
    className="mb-2"
  >
    <Card.Header>Contact Count</Card.Header>
    <Card.Body>
      {(recipients === "")?<Card.Title>0</Card.Title>

      :<Card.Title>{contactCount.length}</Card.Title>

    }
      
      <Card.Text>
           
      </Card.Text>
    </Card.Body>
  </Card>
        <Form onSubmit={SubmitForm} className='mt-5'>


 

  <FileUpload setRecepients={setRecepients} setCol={setCol} setRow={setRow} setStatus={setStatus}/>

  <DbUpload branch={branch} getContacts={getContacts} setStatus={setStatus} setCol={setCol} setRow={setRow} recipientsDB={recipientsDB} setRecepients={setRecepients}/>

  <FormTable columns={col} rows={row} dbstatus={dbstatus}/>
  

  <Form.Label>Description</Form.Label>
  <Form.Control type="text" placeholder="Description" onChange={handleChangeDes} value={description} required/>
  <br />
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
