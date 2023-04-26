import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Address = () => {

    const [data, setData] = useState([])

    const getAddress = () => {
        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/companyprofile/findallcompnayprofile`,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
                Accept: "application/json",
            },
        })
            .then((response) => {
                console.log("response", response.data.data);
                if (response.status === 200) {
                    setData(response.data.data)
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    useEffect(() => {
        getAddress()
    }, [])


    return (
        <div >
            <div className='myprofile p-1'>
                <div className='col-md-11'>
                    <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>ADDRESS</h6>
                </div>
                <hr />
                <div className='row m-4'>
                    <div className='col-md-6'>
                        <h6>address</h6>
                        {data.address}
                    </div>
                    <div className='col-md-6'>
                        <h6>City Name</h6>
                        {data.city_name}
                    </div>
                </div>
            </div><br />
        </div>
    )
}

export default Address