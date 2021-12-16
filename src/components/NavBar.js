
import React,{useContext} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Container from 'react-bootstrap/Container'
import {AppContext} from "../components/services/context";



export const NavBar = () => {
    const {authrization} = useContext(AppContext);
    const [auth,setAuth] = authrization

   const handleOnclick = e =>{
       setAuth(false)
   }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand>sms</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
  </Navbar.Collapse>
 {auth ? 
    <Nav>
    <Nav.Link onClick={handleOnclick}>
      Log out
    </Nav.Link>
  </Nav>
  :
  
   <Nav></Nav>    
}

    </Container>
</Navbar>
        </div>
    )

}