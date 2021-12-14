import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {AppContext} from "../services/context"
import FormTable from "../services/table";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const DbUpload =  () => {
  
  
  const {status,colum,Row,Branch,Contacts,desc,mess,recipient,counter} = useContext(AppContext);
  
  const [recipients,setRecepients] = recipient
  const [branch] = Branch
  const [dbstatus,setStatus] = status
  const [col,setCol] = colum
  const [row,setRow] = Row
  const [getContacts] = Contacts
  const [description,setDescription] = desc
  const [message, setMessage] = mess
  const [count,setCount] = counter 

  const HandleSelect=(e)=>{

   
   
    const branch_id = e
  
    getContacts(branch_id)
   

    
  }

      
  const HandleClick=(e)=>{

    

  
   
    setStatus(true)
    setCol([])
    setRow([])
   
    
  }
  const handleChangeDes = e =>{
    e.preventDefault();
    setDescription(e.target.value);

  }

  const charactersLeft = 160-count
  let contactCount = recipients.split(',');
  const handleChangeMes = e => {
    e.preventDefault();
    setMessage(e.target.value);
    setCount(e.target.value.length);


  };
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
     console.log(resp)
     
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
        <Dropdown as={ButtonGroup} className='mt-5' className='mb-5'onSelect={HandleSelect}  onClick={HandleClick}>
        <Button variant="secondary">Select Branch</Button>
      
        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
        
        
        <Dropdown.Menu >
            {branch.map(i =>(
                <Dropdown.Item key={i.ID} eventKey={i["Store ID"]}> {i["Branch name"]}</Dropdown.Item>
 
              ))}
          
          
        </Dropdown.Menu>
      </Dropdown>
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

export default DbUpload
