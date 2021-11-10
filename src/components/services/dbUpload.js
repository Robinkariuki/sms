import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


const DbUpload =  ({branch,getContacts,setStatus,recipientsDB,setCol,setRow,setRecepients}) => {

    
  const handleSelect=(e)=>{
    console.log(e);
  
    const branch_id = e
  
    getContacts(branch_id)
   

    
  }

      
  const handleClick=(e)=>{
    
   
    setStatus(true)
    setCol([])
    setRow([])
    



   
    
  }
  
  
    return (
        <Dropdown as={ButtonGroup} className='mt-5' className='mb-5'onSelect={handleSelect}  onClick={handleClick}>
        <Button variant="secondary">Split Button</Button>
      
        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
        
        
        <Dropdown.Menu >
            {branch.map(i =>(
                <Dropdown.Item key={i.ID} eventKey={i["Store ID"]}> {i["Branch name"]}</Dropdown.Item>
 
              ))}
          
          
        </Dropdown.Menu>
      </Dropdown>
    )
}

export default DbUpload
