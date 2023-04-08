import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Dailycomponent from './dailycomponent';
import Dailycomponent from './Dailycomponent';
import Monthlycomponent from './Monthlycomponent';
import UserAttendanceComponents from './UserAttendanceComponents';
import UserMonthallattendance from './UserMonthallattendance';

function Attendance() {

    var role_id = localStorage.getItem("role_id")

    return (
        <div>
            {role_id === "3" ? (<Tabs
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
                {/* <Tab eventKey="Employe MonthLy Log" title="Employe MonthLy Log"><br />
                    <UserMonthallattendance />
                </Tab> */}
            </Tabs>) : <Tabs
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
            </Tabs>}
        </div>
    )
}

export default Attendance

