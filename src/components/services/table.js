import React,{useState} from 'react'
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import './table.css'
const FormTable = ({rows,columns}) => {

    console.table("rows==>",rows)
    console.table("columns==>",columns)
  
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 5;
    const offset = currentPage * PER_PAGE;

 
    
    const pageCount = Math.ceil(rows.length/PER_PAGE)
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }


    return (
        <Table>
        <thead>
         <tr>
             {columns.map((c)=>
             <th key={c.key}>{c.key === -1 ? "" : c.name}</th>
             )}
         </tr>
         {rows
         .slice(offset, offset + PER_PAGE)
         .map((r,i)=><tr key={i}>
             {!rows.withoutRowNum && <td key={i}>{rows.renderRowNum?rows.renderRowNum(r,i):i}</td>}
             {columns.map(c=> <td key={c.key}>{ r[c.key] }</td>)}
         </tr>)}
        </thead>
        

  
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

        </Table>
        
    )
}

export default FormTable
