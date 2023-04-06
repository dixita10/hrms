import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Overview from './Overview';
import Address from './Address';
import Policies from './Policies';

const Companyprofile = () => {

    // var role_id = localStorage.getItem("role_id")


    return (
        <div>
            <div>
                <Tabs
                    defaultActiveKey="Overview"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Overview" title="Overview"><br />
                        <Overview />
                    </Tab>
                    <Tab eventKey="Address" title="Address"><br />
                        <Address />
                    </Tab>
                    <Tab eventKey="Policies" title="Policies"><br />
                        <Policies />
                    </Tab>

                </Tabs>
            </div>
        </div>
    )
}

export default Companyprofile