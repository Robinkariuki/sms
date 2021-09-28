import React, {
  useState
} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as XLSX from 'xlsx';



const FileUpload = ({
    setRecepients
  }) => {

    const [selectedFile, setSelectedFile] = useState([])

    const onFileChange = event => {

      // Update the state
      console.log(setRecepients)
      var files = event.target.files,
        f = files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        var data = new Uint8Array(event.target.result);
        var workbook = XLSX.read(data, {
          type: 'array'
        });
        /* DO SOMETHING WITH workbook HERE */
        const wsname = workbook.SheetNames[0];
        const ws = workbook.Sheets[wsname];






        /* Convert array to json*/
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1
        });
        setSelectedFile(dataParse)
      };
      reader.readAsArrayBuffer(f);
    };

    const onFileUpload = (e) => {
      e.preventDefault();
      const numbers = []
      // Details of the uploaded file
      selectedFile.map(num => {
        if (typeof num[1] === 'number') {
          numbers.push(num[1])

        }
        const Newnum = numbers.join(",").toString()
        // console.log('each array ==>', Newnum)
        return setRecepients(Newnum)
      })





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
