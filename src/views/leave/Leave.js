import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Allleave from './Allleave';
import Loginleave from './Loginleave';

const Leave = () => {

    var role_id = localStorage.getItem("role_id")


    return (
        <div>
            {role_id === "3" ? (<Tabs
                defaultActiveKey="Employe Leave"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="Employe Leave" title="Employe Leave"><br />
                    <Allleave />
                </Tab>
                {/* <Tab eventKey="My Leave" title="My Leave"><br />
                    <Loginleave />
                </Tab> */}
            </Tabs>) : <Tabs
                defaultActiveKey="My Leave"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
            >
                <Tab eventKey="My Leave" title="My Leave"><br />
                    <Loginleave />
                </Tab>

            </Tabs>}

        </div>
    )
}

export default Leave