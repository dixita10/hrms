import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Country = () => {

    const [data, setdata] = useState([])
    const [pageCount, setPageCount] = useState(1)

    const getcountry = () => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/country/findallcountry?page=${pageCount}&limit=5`,
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
        getcountry()
    }, [pageCount])

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        setPageCount(data.selected + 1)
        // let currentPage = data.selected + 1
    }

    return (
        <div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>country_name</th>
                    </tr>
                    {
                        data.map((data) =>
                            <tr>
                                <td>{data.country_name}</td>
                            </tr>
                        )
                    }
                </table>
            </div>
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

    return (
        <div>

        </div>
    )
}

export default Country