import React,{useState,useContext} from 'react'
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import './table.css'
import {AppContext} from "../services/context"

const FormTable = () => {

  const {status,colum,Row} = useContext(AppContext);
   
  const [row] = Row
  const [col] = colum
  const [dbstatus] = status

    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;

 
    
    const pageCount = Math.ceil(row.length/PER_PAGE)
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }
   


   if(dbstatus===false){
    return (
        <div className="App">


        
        <Table>
        <thead>
         <tr>
             {col.map((c,i)=>
             <th key={i}>{c.key === -1 ? "" : c.name}</th>
             )}
         </tr>
         {row
         .slice(offset, offset + PER_PAGE)
         .map((r,i)=><tr key={i}>
             {!row.withoutRowNum && <td key={i}>{row.renderRowNum?row.renderRowNum(r,i):i}</td>}
             {col.map((c,i)=> <td key={i}>{ r[c.key] }</td>)}
         </tr>)}
        </thead>
        

  
       
   
        </Table>
        <br></br>
    

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
        </div>
        
    )

   }else{
       return(
        <div className="App">


        
        <Table>
        <thead>
         <tr>
             {col.map((c,i)=>
             <th key={i}>{c.key === -1 ? "" : c}</th>
             )}
         </tr>
         {row
         .slice(offset, offset + PER_PAGE)
         .map((r,i)=><tr key={i}>
       
         {col.map((c,t)=>{
             return <td key={t}>{ r[t] }</td>
         })}
  
         </tr>)}
        </thead>
        

  
       
   
        </Table>
        <br></br>
    

      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
        </div>
        
       )
   }
   
}

export default FormTable
