import React, { createContext,useState,useEffect } from 'react';
import axios from 'axios';
export const AppContext = createContext();



const { Provider } = AppContext;

export const AppProvider = (props) => {
    const [description,setDescription] = useState('')
    const [branch,setBranch] = useState([])
    const [col,setCol] = useState([])
    const [row,setRow] = useState([])
    const [recipientsDB, setRecepientsDB] = useState('')
    const [recipients, setRecepients] = useState('')
    const [dbstatus,setStatus] = useState()
    const [message, setMessage] = useState('')
    const [count,setCount] = useState(0)
    const [userName,setUser]  = useState('')
    const [password,setPassword] = useState()
    const [auth,setAuth] = useState(false)
    
    
  


    // const getBranch = async()=>{
    //     const url = 'http://localhost:3001/naivas/api/getBranches'
    //     await axios.get(url)
    //     .then(res => {
    //      setBranch(res.data.recordsets[0])
       
    //     })
        
        
    //   } 
   

    const getContacts =(branch_id)=>{
        
     
        const url ="http://192.168.100.51:3008/naivas/api/getContacts"
          axios({
          method:'post',
          url,
          data:branch_id
   
        }).then(res=>{
         setRecepientsDB(res.data.recordset)
         
        const data = []
        const contacts = []
         res.data.recordset.map(obj=>{
           contacts.push( obj.REALNUMBER)
           setRecepients(contacts.toString())
   
           data.push(Object.values(obj))
           setRecepientsDB(data)
           setRow(data)
           return setCol(Object.keys(obj))
           
          
   
         })
         
        })
       
   
     }


     const getAllContacts =()=>{
        
     
      const url ="http://192.168.100.51:3008/naivas/api/getAllContacts"
    
        axios({
        method:'get',
        url
      }).then(res=>{
       setRecepientsDB(res.data.recordset)
       
      const data = []
      const contacts = []
       res.data.recordset.map(obj=>{
         contacts.push(obj.REALNUMBER)
         setRecepients(contacts.toString())
 
         data.push(Object.values(obj))
         setRecepientsDB(data)
         setRow(data)
         return setCol(Object.keys(obj))
         
        
 
       })
       
      })
     
 
   }

return(

   <Provider value=
   {{Branch:[branch, setBranch],colum:[col,setCol],Row:[row,setRow],status:[dbstatus,setStatus],recipient:[recipients, setRecepients],recDb:[recipientsDB, setRecepientsDB],Contacts:[getContacts,getAllContacts],desc:[description,setDescription],mess:[message, setMessage],counter:[count,setCount],pass:[password,setPassword],user:[userName,setUser],authrization:[auth,setAuth]}}>

      {props.children}

   </Provider>

 );

}