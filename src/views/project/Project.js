import React, { useState, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Allproject from './Allproject';
import LoginuserPro from './LoginuserPro';

const Project = () => {

  var role_id = localStorage.getItem('role_id')

  return (
    <div>
      <div>
        {role_id === "3" ? (<Tabs
          defaultActiveKey="Employe Project"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Employe Project" title="Employe Project"><br />
            <Allproject />
          </Tab>
          <Tab eventKey="My Project" title="My Project"><br />
            <LoginuserPro />
          </Tab>
        </Tabs>) : <Tabs
          defaultActiveKey="My Project"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="My Project" title="My Project"><br />
            <LoginuserPro />
          </Tab>
        </Tabs>}
      </div>
    </div>

  )
}

export default Project