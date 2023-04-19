import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Dailycomponent from './dailycomponent';
import Dailycomponent from './Dailycomponent';
import Monthlycomponent from './Monthlycomponent';
import UserAttendanceComponents from './UserAttendanceComponents';
import Switch from "react-switch";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Attendance() {

    const [isChecked, setIsChecked] = useState(false)
    const [data, setData] = useState([])
    // console.log(data.assign_id);

    var role_id = localStorage.getItem("role_id")

    const handleSwitchChange = (checked) => {
        setIsChecked(checked);

        var token = `Bearer ${localStorage.getItem('token')}`

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_URL}/reporting/findallasignreporting`,
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
                defaultActiveKey="My Daily Log"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="My Daily Log" title="My Daily Log"><br />
                    <Dailycomponent />
                </Tab>
                <Tab eventKey="My MonthLy log" title="My Monthly log"><br />
                    <Monthlycomponent />
                </Tab>
                <Tab eventKey="Employe Daily Log" title="Employe Daily Log"><br />
                    <UserAttendanceComponents />
                </Tab>

            </Tabs>) : (<Tabs
                defaultActiveKey="Daily Log"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Daily Log" title="Daily Log"><br />
                    <Dailycomponent />
                </Tab>
                <Tab eventKey="MonthLy log" title="Monthly log"><br />
                    <Monthlycomponent />
                </Tab>
            </Tabs>))}

            {isChecked && (
                <table className='responstable'>
                    <tr>
                        <th>Employe Name</th>
                        <th>Action</th>
                    </tr>
                    {data.map((data) =>
                        <tr>
                            <td>{data.assign_name}</td>
                            <td>
                                {/* {data.assign_id} */}
                                <Link to={`/attendanceuser/${data.assign_id}`}>
                                    <button type="button" className="btn btn-outline-secondary">
                                        View Attendance
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </table>
            )}

        </div>
    )
}

export default Attendance

