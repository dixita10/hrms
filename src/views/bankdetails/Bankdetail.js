import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Allbankdetails from './Allbankdetails';
import Loginuserbankdetail from './Loginuserbankdetail';


const Bankdetail = () => {

    var role_id = localStorage.getItem('role_id')

    return (
        <div>
            <div>
                {role_id === "3" ? (<Tabs
                    defaultActiveKey="Employe Bank Details"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="Employe Bank Details" title="Employe Bank Details"><br />
                        <Allbankdetails />
                    </Tab>
                    <Tab eventKey="My Bank Details" title="My Bank Details"><br />
                        <Loginuserbankdetail />
                    </Tab>
                </Tabs>) : <Tabs
                    defaultActiveKey="My Bank Details"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="My Bank Details" title="My Bank Details"><br />
                        <Loginuserbankdetail />
                    </Tab>
                </Tabs>}
            </div>
        </div>

    )
}

export default Bankdetail