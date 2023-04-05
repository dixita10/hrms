import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Dailycomponent from './dailycomponent';
import Dailycomponent from './Dailycomponent';
import Monthlycomponent from './Monthlycomponent';
import UserAttendanceComponents from './UserAttendanceComponents';


function Attendance() {

    var role_id = localStorage.getItem("role_id")

    return (
        <div>
            {role_id === "3" ? (<Tabs
                defaultActiveKey="Daily Log"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Daily Log" title="Daily Log"><br />
                    <Dailycomponent />
                </Tab>
                <Tab eventKey="monthly log" title="Monthly log"><br />
                    <Monthlycomponent />
                </Tab>
                <Tab eventKey="user attendance" title="User Attendance"><br />
                    <UserAttendanceComponents />
                </Tab>

            </Tabs>) : <Tabs
                defaultActiveKey="Daily Log"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Daily Log" title="Daily Log"><br />
                    <Dailycomponent />
                </Tab>
                <Tab eventKey="monthly log" title="Monthly log"><br />
                    <Monthlycomponent />
                </Tab>
            </Tabs>}
        </div>
    )
}

export default Attendance

