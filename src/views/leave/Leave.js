import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Allleave from './Allleave';
import Loginleave from './Loginleave';
import Switch from "react-switch";
import axios from 'axios';
import { Link } from 'react-router-dom';


const Leave = () => {

    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])

    var role_id = localStorage.getItem("role_id")

    const handleSwitchChange = (checked) => {
        setIsChecked(checked);

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/reporting/findbyleave`,
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
    };


    return (
        <div>
            <div className='switchmanager'>
                {role_id === "4" ? (
                    <label style={{ margin: '30px 0 0 0' }}>
                        <Switch onChange={handleSwitchChange} checked={isChecked} />
                    </label>

                ) : ""}
            </div>
            {!isChecked && (role_id === "3" ? (<Tabs
                defaultActiveKey="Employe Leave"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Employe Leave" title="Employe Leave"><br />
                    <Allleave />
                </Tab>
            </Tabs>) : (<Tabs
                defaultActiveKey="My Leave"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="My Leave" title="My Leave"><br />
                    <Loginleave />
                </Tab>

            </Tabs>))}



            {isChecked && (
                <table className='responstable'>
                    <tr>
                        <th>title</th>
                        <th>start date</th>
                        <th>end date</th>
                        <th>days</th>
                        <th>name</th>
                        <th>status</th>
                    </tr>
                    {data.map((data) =>
                        <tr>
                            <td>{data.tittle}</td>
                            <td>{data.start_date}</td>
                            <td>{data.end_date}</td>
                            <td>{data.days}</td>
                            <td>{data.name}</td>
                            <td>{data.status}</td>

                        </tr>
                    )}
                </table>
            )}

        </div>
    )
}

export default Leave