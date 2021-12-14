import React,{useContext} from 'react'
import Form from 'react-bootstrap/Form';
import * as XLSX from 'xlsx';
import {ExcelRenderer} from 'react-excel-renderer';
import {AppContext} from "../services/context"




const FileUpload = () => {

    const {status,colum,Row,recipient} = useContext(AppContext);
    const [dbstatus,setStatus] = status
    const [col,setCol] = colum
    const [recipients,setRecepients] = recipient
    const [row,setRow] = Row


    // const [selectedFile, setSelectedFile] = useState([])
    const OnclickHandler =(e)=>{


      e.target.value = null
      setStatus(false)
      
    }
    const onFileChange = event => {

      // Update the state
      let fileObj = event.target.files[0];
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          setCol(resp.cols)
          // let arr = []
          // arr = resp.rows.splice(0,5)

          setRow(resp.rows)
        }
      });   
      
   
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
        // setSelectedFile(dataParse)
        const numbers = []
        // Details of the uploaded file
        dataParse.map(num => {
          if (typeof num[1] === 'number') {
            numbers.push(num[1])
  
          }
          const Newnum = numbers.join(",").toString()
         
          return setRecepients(Newnum)
        })
  
      };
      reader.readAsArrayBuffer(f);

    

  
    };

   
  
 
    return (
        <div>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Upload contacts</Form.Label>
    <Form.Control type="file" onChange={onFileChange} style={{"padding":"10px"}}  onClick={OnclickHandler} />
    
    <br></br>
  </Form.Group>
        </div>
    )
}

export default FileUpload
