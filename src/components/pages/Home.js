import React, {
    useEffect,

} from 'react'

import { Forms} from '../Form'
import {
    NavBar
} from "../NavBar";

import DbUpload from "../services/dbUpload";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';







export const Home = () => {



    return (
        <div>
 <Tabs defaultActiveKey="Execel Upload" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="Execel Upload" title="Execel Upload">
  <Forms/> 
  </Tab>
  <Tab eventKey="dbupload" title="DataBase Upload">
   <DbUpload/>
  </Tab>
</Tabs>
       
             
        </div>
        
    )
}
