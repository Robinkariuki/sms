import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Forms } from '../Form'
import { NavBar } from "../NavBar";






export const Home = () => {

    const sendBulkMessage =()=>{
        axios.post('https://app.apiproxy.co/account/v1/grant_access', {
            userName: 'robin',
            password: 'test',
            apigw:'API_GW'
          })
          .then(function (response) {
            console.log(response);
          })
    }
    
    useEffect(() => {
         sendBulkMessage()
    }, [])
    return (
        <div>
        <NavBar/>
        <Forms/>
        </div>
        
    )
}
