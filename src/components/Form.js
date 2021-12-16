import React, {
  useState,
  useEffect,
  useContext
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
import {AppContext} from "../components/services/context"






export const Forms = () => {



    const {Branch,recipient,recDb,colum,Row,desc,mess,counter} = useContext(AppContext);
    const [branch,setBranch] = Branch
    const [recipients,setRecepients] = recipient
    const [recipientsDB, setRecepientsDB] =recDb
    const [col,setCol] = colum
    const [row,setRow] = Row
    const [description,setDescription] = desc
    const [message, setMessage] = mess
    const [count,setCount] = counter 
   
  


   const getBranch = async()=>{
     const url = 'http://localhost:3001/naivas/api/getBranches'
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
     
     const url ="http://localhost:3001/naivas/api/getContacts"
       axios({
       method:'post',
       url,
       data:branch_id

     }).then(res=>{
      setRecepientsDB(res.data.recordset)
      
     const data = []
     const contacts = []
      res.data.recordset.map(obj=>{
        contacts.push( obj.Contact)
        setRecepients(contacts.toString())

        data.push(Object.values(obj))
        setRecepientsDB(data)
        setRow(data)
        return setCol(Object.keys(obj))
        
       

      })
      
     })


  }


    const SubmitForm = e => {
      e.preventDefault();
    
      
      
      const formData = {
       recipients,
       message
      
      }
     axios({
       method:'post',
       url:"http://localhost:3001/naivas/api/smsbulk",
       data: formData,
     })
     .then(resp=>{
    
       
      alert("successfully sent")
      setCol([])
      setRow([])
      setMessage('')
      setRecepients('')
      setCount(0)
      setDescription('')

 if (resp.data.name === "Error"){
   alert(resp.data.name)
 }else{
   
  const dataFromForm ={
    recipients,
    message,
    description,

  }

  const data = JSON.stringify(dataFromForm)
  axios({
    method:"post",
    url:'http://localhost:3001/naivas/api/log',
    data,
    headers: {
      "Content-Type": "application/json"
    
    },

  })
  .then(res=>{
    
    alert(res.data)
 
  })
  .catch(err =>{
    
    alert(err)
  

  })
 }
     

    })
    .catch(err =>{
      console.log("shida===>",err)
      alert(err)

    
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


 

  <FileUpload/>
  <FormTable/>
  

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
