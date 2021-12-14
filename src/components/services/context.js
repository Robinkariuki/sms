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
    
    
  


    // const getBranch = async()=>{
    //     const url = 'http://localhost:3001/naivas/api/getBranches'
    //     await axios.get(url)
    //     .then(res => {
    //      setBranch(res.data.recordsets[0])
       
    //     })
        
        
    //   } 
   

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

return(

   <Provider value=
   {{Branch:[branch, setBranch],colum:[col,setCol],Row:[row,setRow],status:[dbstatus,setStatus],recipient:[recipients, setRecepients],recDb:[recipientsDB, setRecepientsDB],Contacts:[getContacts],desc:[description,setDescription],mess:[message, setMessage],counter:[count,setCount]}}>

      {props.children}

   </Provider>

 );

}