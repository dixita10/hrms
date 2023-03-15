import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';

function Admin() {

    const [data, setdata] = useState([])
    // const [pageCount, setPageCount] =  useState()

    // const fetchComments = async (currentPage) => {
    //     const res = await fetch(
    //         'http://localhost:1010/admin/findalladmin'
    //     );
    //     const data = await res.json();
    //     const total = res.headers.get('x-total-count');
    //     console.log(total);
    //     return data;
    // }

    const handlePageClick = async (data) => {
        console.log(data.selected);
        let currentPage = data.selected + 1
        const commentsFromServer = await fetchComments(currentPage)
        setdata(commentsFromServer)
    }

    useEffect(() => {
        var token = localStorage.getItem('token')

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/admin/findalladmin`,
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

    }, [])


    // console.log(data);

    return (
        <div>
            <div className='table-responsive'>
                <table className='responstable'>
                    <tr>
                        <th>Admin_name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>User_name</th>
                        <th>Password</th><br />
                    </tr>
                    {
                        data.map((data, index) =>
                            <tr key={index} style={{ fontSize: '15px' }}>
                                <td>{data.admin_name}</td>
                                <td>{data.email}</td>
                                <td>{data.contact}</td>
                                <td>{data.user_name}</td>
                                <td >{data.password}</td>
                            </tr>
                        )
                    }
                </table>
            </div>
            <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                breakLabel="..."
                pageCount={20}
                pageRangeDisplayed={5}
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

        </div>
    )
}

export default Admin