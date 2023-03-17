import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Role = () => {

  const [data, setdata] = useState([])
  const [pageCount, setPageCount] = useState(1)

  const getRole = () => {
    var token = localStorage.getItem('token')

    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_URL}/role/findallrole?page=${pageCount}&limit=5`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log("response", response);
        setdata(response.data.data)
      })

  }

  useEffect(() => {
    getRole()
  }, [pageCount])

  const handlePageClick = async (data) => {
    // console.log(data.selected);
    setPageCount(data.selected + 1)
    // let currentPage = data.selected + 1
  }



  // console.log(data);
  return (
    <div>
      <table className='responstable'>
        <tr>
          <th>role_name</th>
        </tr>
        {
          data.map((data) =>
            <tr>
              <td>{data.role_name}</td>
            </tr>
          )
        }
      </table>
      <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        pageCount={10}
        pageRangeDisplayed={4}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Role