import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Loginsalary from './Loginsalary';
import Allsalary from './Allsalary';



const Salary = () => {


  var role_id = localStorage.getItem("role_id")





  return (

    <div>
      {role_id === "3" ? (<Tabs
        defaultActiveKey="Salary"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Salary" title="Salary"><br />
          <Loginsalary />
        </Tab>
        <Tab eventKey="Employe Salary" title="Employe Salary"><br />
          <Allsalary />
        </Tab>

      </Tabs>) : <Tabs
        defaultActiveKey="Salary"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="Salary" title="Salary"><br />
          <Loginsalary />
        </Tab>
      </Tabs>}
    </div>
    // <div>
    // <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    //   <input type='search' placeholder='Search User Name' style={{ padding: '5px 10px', borderRadius: '5px', width: '25%' }} onChange={handleSearch} />
    //   <Link to={'/addsalary'}>
    //     <button class="btn btn-outline-success" type="button">Add<HiPlusSm className='HiPlusSm' /></button>
    //   </Link>
    // </div><br />
    // <table className='responstable'>
    //   <tr>
    //     {/* <th>user_id</th> */}
    //     <th>salary</th>
    //     <th>bank_detail</th>
    //     <th>username</th>
    //     <th>action</th>
    //   </tr>
    //   {
    //     visibleItems.map((data) =>
    //       <tr>
    //         {/* <td>{data.user_id}</td> */}
    //         <td>{data.salary}</td>
    //         <td>{data.bank_detail}</td>
    //         <td>{data.username}</td>
    //         <td style={{ fontSize: '24px' }}>
    //           <Link to={`/singlesalary/${data.salary_id}`}><FaEye style={{ marginRight: '25px', color: 'gray' }} /></Link>
    //           <Link to={`/editsalary/${data.salary_id}`}><MdEdit style={{ marginRight: '20px' }} /></Link>
    //           <MdDeleteForever onClick={() => handleDelete(data.salary_id)} style={{ color: 'red' }} />
    //           {/* <button className='btn btn-outline-danger mx-2' onClick={() => handleDelete(data.dep_id)}>Delete</button> */}
    //         </td>
    //       </tr>
    //     )
    //   }
    // </table>
    //   <Pagination
    //     currentPage={currentPage}
    //     totalPages={totalPages}
    //     onPageChange={handlePageChange}
    //   />
    //   <ToastContainer autoClose={2000} />
    // </div>

  )
}

export default Salary