
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
// import Addattandance from './views/attendance/Addattandance';
// import Department from './views/department/Department';

const loading = (
  // <div className="pt-3 text-center">
  // <div className="sk-spinner sk-spinner-pulse"></div>
  // </div>
  <div></div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const Admin = React.lazy(() => import('./views/sidebar/Admin'))
const Attendance = React.lazy(() => import('./views/attendance/Attendance'))
// const Attendance = React.lazy(() => import('./views/attendance/Attendance/:id'))
const Department = React.lazy(() => import('./views/department/Department'))
const State = React.lazy(() => import('./views/state/State'))
const City = React.lazy(() => import('./views/city/City'))
const Country = React.lazy(() => import('./views/country/Country'))
const Project = React.lazy(() => import('./views/project/Project'))
const Role = React.lazy(() => import('./views/role/Role'))
const Salary = React.lazy(() => import('./views/salary/Salary'))
const Technology = React.lazy(() => import('./views/technology/Technology'))
const User = React.lazy(() => import('./views/user/User'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Resetpswd = React.lazy(() => import('./views/pages/resetpswd/Resetpswd'))

const Singleattendance = React.lazy(() => import('./views/attendance/Singleattendance'))
const Singleuser = React.lazy(() => import('./views/user/Singleuser'))

const Addattandance = React.lazy(() => import('./views/attendance/Addattandance'))

const Editattandance = React.lazy(() => import('./views/attendance/Editattandance'))
const Editadmin = React.lazy(() => import('./views/sidebar/Editadmin'))



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route exact path="/resetpswd" name="Reset Password" render={(props) => <Resetpswd {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <Route exact path="/admin" name="Admin" render={(props) => <Admin {...props} />} />
            <Route exact path="/attendance" name="Attendance" render={(props) => <Attendance {...props} />} />
            {/* <Route exact path="/attendance/:id" name="Attendance" render={(props) => <Attendance {...props} />}/> */}
            <Route exact path="/department" name="Department" render={(props) => <Department {...props} />} />
            <Route exact path="/state" name="State" render={(props) => <State {...props} />} />
            <Route exact path="/city" name="City" render={(props) => <City {...props} />} />
            <Route exact path="/country" name="Country" render={(props) => <Country {...props} />} />
            <Route exact path="/project" name="Project" render={(props) => <Project {...props} />} />
            <Route exact path="/role" name="Role" render={(props) => <Role {...props} />} />
            <Route exact path="/salary" name="Salary" render={(props) => <Salary {...props} />} />
            <Route exact path="/technology" name="Technology" render={(props) => <Technology {...props} />} />
            <Route exact path="/user" name="User" render={(props) => <User {...props} />} />

            <Route exact path="/Singleattendance/:id" name="Singleattendance" render={(props) => <Singleattendance {...props} />} />
            <Route exact path="/singleuser/:id" name="Singleuser" render={(props) => <Singleuser {...props} />} />

            <Route exact path='/addattandance' name="Addattandance" render={(props) => <Addattandance {...props} />} />
            <Route exact path='/editattandance/:id' name="Editattandance" render={(props) => <Editattandance {...props} />} />
            <Route exact path='/aditadmin' name="Editadmin" render={(props) => <Editadmin {...props} />} />




          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
