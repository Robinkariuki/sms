import React,{useContext} from 'react'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {AppContext} from "../services/context";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const {pass,user,authrization} = useContext(AppContext);

    const [password,setPassword] = pass
    const [userName,setUser] = user
    const [auth,setAuth] = authrization


  const  handleChangeUser = e =>{
      e.preventDefault();
      setUser(e.target.value)

  }   

  const handleChangePass = e =>{
      e.preventDefault();
      setPassword(e.target.value)
  }
const submitForm = e =>{
    e.preventDefault();
    const formData = {
        password,
        userName
       
       }

      axios({
          method:'post',
          url:"http://192.168.100.51:3008/naivas/api/login",
          data:formData,
      })
      .then(resp=>{
        //   console.log(resp.data.lde_message)
          setUser('')
          setPassword('')
          if(resp.data.auth === true){
              setAuth(true)
              alert(resp.data.message)
              navigate('/')
          }else{
              alert("wrong credentials")

          }
         
      }) 


}


    return (

        <Container className='mt-5'>
        <Form  onSubmit={submitForm} >

        <h3>Log in</h3>
        <FloatingLabel
    controlId="floatingInput"
    label="Username"
    className="mb-3"
  >
        <Form.Control type="username" placeholder="Username"  value={userName} onChange={handleChangeUser} required/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
    <Form.Control type="password" placeholder="Password"  value={password} onChange={handleChangePass} required/>
  </FloatingLabel>


        <button type="submit" className="btn btn-dark btn-lg btn-block mt-2">Sign in</button>
        </Form>
        </Container>
    )
}

export default Login
