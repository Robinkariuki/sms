import React,{useState} from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import * as XLSX from 'xlsx';


// const handleUpload = (e) => {
//     e.preventDefault();

//     var files = e.target.files, f = files[0];
//     var reader = new FileReader();
//     reader.onload = function (e) {
//         var data = e.target.result;
//         let readedData = XLSX.read(data, {type: 'binary'});
//         const wsname = readedData.SheetNames[0];
//         const ws = readedData.Sheets[wsname];

//         /* Convert array to json*/
//         const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
//         setFileUploaded(dataParse);
//     };
//     reader.readAsBinaryString(f)
// }
const FileUpload = () => {

    const [selectedFile,setSelectedFile ] = useState([])
   
    const  onFileChange = event => {
    
         // Update the state
        
        var files = event.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, {type: 'array'});
           /* DO SOMETHING WITH workbook HERE */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];

      
       

 
    
        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {header:1});
        setSelectedFile(dataParse)
  };
   reader.readAsArrayBuffer(f);
      };

      const onFileUpload = (e) => {
        e.preventDefault();
        
     
    

            // Details of the uploaded file
       
      console.log(selectedFile);
    
      // Request made to the backend api
      // Send formData object
    //   axios.post("api/uploadfile", formData);
    
      };  
   
    return (
        <div>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload contacts</Form.Label>
    <Form.Control type="file" onChange={onFileChange} required/>
    {/* {(selectedFile) ? <Alert variant="success">{selectedFile.selectedFile.name}</Alert>:<Alert variant="success">*Choose file*</Alert> } */}
    <br></br>
    <Button variant="primary" type="upload" onClick={onFileUpload}>
    upload
  </Button>
    
  </Form.Group>
        </div>
    )
}

export default FileUpload
