import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Policies = () => {

    const [data, setData] = useState([])

    const getPolicies = () => {
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
        getPolicies()
    }, [])

    return (
        <div>
            <div >
                <div className='myprofile p-1'>
                    <h6 style={{ paddingTop: '15px', paddingLeft: '20px' }}>policy</h6>
                    <hr />
                    <div className='row m-4'>
                        <div className='col-md-12'>
                            <h6>company_policy</h6>
                            {data.company_policy}
                            <button className='btn btn-outline-info'>download pdf</button>
                        </div>
                        <div className='col-md-12'>
                            <h6>moonlight_policy </h6>
                            {data.moonlight_policy}
                        </div>
                        <div className='col-md-12'>
                            <h6>tour_policy</h6>
                            {data.tour_policy}
                        </div>
                        <div className='col-md-12'>
                            <h6>yearlyleave_policy </h6>
                            {data.yearlyleave_policy}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Policies