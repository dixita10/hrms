
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
const Home = React.lazy(() => import('./views/home/Home'))

// const Home11 = React.lazy(() => import('./views/Home11'))
// const Profile = React.lazy(() => import('./views/sidebar/Admin'))
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
const Event = React.lazy(() => import('./views/event/Event'))
const Bankdetail = React.lazy(() => import('./views/bankdetails/Bankdetail'))
const Companyprofile = React.lazy(() => import('./views/compnyprofile/Companyprofile'))
const Leave = React.lazy(() => import('./views/leave/Leave'))
const Notification = React.lazy(() => import('./views/notification/Notification'))

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Resetpswd = React.lazy(() => import('./views/pages/resetpswd/Resetpswd'))
const Loginuser = React.lazy(() => import('./views/pages/loginuser/Loginuser'))
const Forgotpassword = React.lazy(() => import('./views/pages/forgot password/Forgotpassword'))
const Passwordreset = React.lazy(() => import('./views/pages/simpleresetpassword/Passwordreset')) // simpleresetpassword


const Singleadmin = React.lazy(() => import('./views/sidebar/singleadmin'))
const Singleattendance = React.lazy(() => import('./views/attendance/Singleattendance'))
const Singleuser = React.lazy(() => import('./views/user/Singleuser'))
const Singledepartment = React.lazy(() => import('./views/department/Singledepartment'))
const Singlecountry = React.lazy(() => import('./views/country/Singlecountry'))
const Singlestate = React.lazy(() => import('./views/state/Singlestate'))
const Singlecity = React.lazy(() => import('./views/city/Singlecity'))
const Singleproject = React.lazy(() => import('./views/project/Singleproject'))
const Singlerole = React.lazy(() => import('./views/role/Singlerole'))
const Singlesalary = React.lazy(() => import('./views/salary/Singlesalary'))
const Singletech = React.lazy(() => import('./views/technology/Singletech'))
const UserMonthallattendance = React.lazy(() => import('./views/attendance/UserMonthallattendance'))


const Addattandance = React.lazy(() => import('./views/attendance/Addattandance'))
const Adddepartment = React.lazy(() => import('./views/department/Adddepartment'))
const Addcountry = React.lazy(() => import('./views/country/Addcountry'))
const Addstate = React.lazy(() => import('./views/state/Addstate'))
const Addcity = React.lazy(() => import('./views/city/Addcity'))
const Addproject = React.lazy(() => import('./views/project/Addproject'))
const Addrole = React.lazy(() => import('./views/role/Addrole'))
const Addsalary = React.lazy(() => import('./views/salary/Addsalary'))
const Addtech = React.lazy(() => import('./views/technology/Addtech'))
const Adduser = React.lazy(() => import('./views/user/Adduser'))
const Addevent = React.lazy(() => import('./views/event/Addevent'))
const Addbankdetail = React.lazy(() => import('./views/bankdetails/Addbankdetail'))
const Addcompanyprofile = React.lazy(() => import('./views/compnyprofile/Addcompanyprofile'))
const Addleave = React.lazy(() => import('./views/leave/Addleave'))



const Editattandance = React.lazy(() => import('./views/attendance/Editattandance'))
const Editadmin = React.lazy(() => import('./views/sidebar/Editadmin'))
const Editdepartment = React.lazy(() => import('./views/department/Editdepartment'))
const Editcountry = React.lazy(() => import('./views/country/Editcountry'))
const Editstate = React.lazy(() => import('./views/state/Editstate'))
const Editcity = React.lazy(() => import('./views/city/Editcity'))
const Editproject = React.lazy(() => import('./views/project/Editproject'))
const Editrole = React.lazy(() => import('./views/role/Editrole'))
const Editsalary = React.lazy(() => import('./views/salary/Editsalary'))
const Edittech = React.lazy(() => import('./views/technology/Edittech'))
const Edituser = React.lazy(() => import('./views/user/Edituser'))
const Editevent = React.lazy(() => import('./views/event/Editevent'))
const Editbankdetail = React.lazy(() => import('./views/bankdetails/Editbankdetail'))
const Editcompanyprofile = React.lazy(() => import('./views/compnyprofile/Editacompanyprofile'))

// user side ....

const Profile = React.lazy(() => import('./userside/userlogin/Profile'))

// manager side ...

const Attendanceuser = React.lazy(() => import('./views/managerside/Attendanceuser'))
const Addmanager = React.lazy(() => import('./views/managerside/Addmanager'))
const Editmanager = React.lazy(() => import('./views/managerside/Editmanager'))


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} /> */}
            {/* <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            /> */}

            <Route exact path="/home" name="Home" render={(props) => <Home {...props} />} />
            <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
            <Route exact path='/login' name="Loginuser" render={(props) => <Loginuser {...props} />} />
            <Route exact path='/forgotpassword' name="Forgotpassword" render={(props) => <Forgotpassword {...props} />} />

            {/* simpleresetpassword */}
            <Route exact path='/passwordreset' name="Passwordreset" render={(props) => <Passwordreset {...props} />} />



            <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
            <Route exact path="/resetpswd" name="Reset Password" render={(props) => <Resetpswd {...props} />} />
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
            {/* <Route exact path="/profile" name="Profile" render={(props) => <Profile {...props} />} /> */}
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
            <Route exact path="/event" name="Event" render={(props) => <Event {...props} />} />
            <Route exact path="/bankdetail" name="Bankdetail" render={(props) => <Bankdetail {...props} />} />
            <Route exact path="/companyprofile" name="Companyprofile" render={(props) => <Companyprofile {...props} />} />
            <Route exact path="/leave" name="Leave" render={(props) => <Leave {...props} />} />
            <Route exact path="/notification" name="Notification" render={(props) => <Notification {...props} />} />



            <Route exact path="/singleattendance/:id" name="Singleattendance" render={(props) => <Singleattendance {...props} />} />
            <Route exact path="/singleuser/:id" name="Singleuser" render={(props) => <Singleuser {...props} />} />
            <Route exact path="/singledepartment/:id" name="Singledepartment" render={(props) => <Singledepartment {...props} />} />
            <Route exact path="/singlecountry/:id " name="Singlecountry" render={(props) => <Singlecountry {...props} />} />
            <Route exact path="/singlestate/:id " name="Singlestate" render={(props) => <Singlestate {...props} />} />
            <Route exact path="/singlecity/:id " name="Singlecity" render={(props) => <Singlecity {...props} />} />
            <Route exact path="/singleproject/:id " name="Singleproject" render={(props) => <Singleproject {...props} />} />
            <Route exact path="/singleadmin/:id " name="Singleadmin" render={(props) => <Singleadmin {...props} />} />
            <Route exact path="/singlerole/:id " name="Singlerole" render={(props) => <Singlerole {...props} />} />
            <Route exact path="/singlesalary/:id " name="Singlesalary" render={(props) => <Singlesalary {...props} />} />
            <Route exact path="/singletech/:id " name="Singletech" render={(props) => <Singletech {...props} />} />
            <Route exact path="/monthlyattendance/:id" name="UserMonthallattendance" render={(props) => <UserMonthallattendance />} />



            <Route exact path='/addattandance' name="Addattandance" render={(props) => <Addattandance {...props} />} />
            <Route exact path='/adddepartment' name="Adddepartment" render={(props) => <Adddepartment {...props} />} />
            <Route exact path='/addcountry' name="Addcountry" render={(props) => <Addcountry {...props} />} />
            <Route exact path='/addstate' name="Addstate" render={(props) => <Addstate {...props} />} />
            <Route exact path='/addcity' name="Addcity" render={(props) => <Addcity {...props} />} />
            <Route exact path='/addproject' name="Addproject" render={(props) => <Addproject {...props} />} />
            <Route exact path='/addrole' name="Addrole" render={(props) => <Addrole {...props} />} />
            <Route exact path='/addsalary' name="Addsalary" render={(props) => <Addsalary {...props} />} />
            <Route exact path='/addtech' name="Addtech" render={(props) => <Addtech {...props} />} />
            <Route exact path='/adduser' name="Adduser" render={(props) => <Adduser {...props} />} />
            <Route exact path='/addevent' name="Addevent" render={(props) => <Addevent {...props} />} />
            <Route exact path='/addbankdetail' name="Addbankdetail" render={(props) => <Addbankdetail {...props} />} />
            <Route exact path='/addcompanyprofile' name="Addcompanyprofile" render={(props) => <Addcompanyprofile {...props} />} />
            <Route exact path='/addleave' name="Addleave" render={(props) => <Addleave {...props} />} />




            <Route exact path='/editattandance/:id' name="Editattandance" render={(props) => <Editattandance {...props} />} />
            <Route exact path='/editadmin/:id' name="Editadmin" render={(props) => <Editadmin {...props} />} />
            <Route exact path='/editdepartment/:id' name="Editdepartment" render={(props) => <Editdepartment {...props} />} />
            <Route exact path='/editcountry/:id' name="Editcountry" render={(props) => <Editcountry {...props} />} />
            <Route exact path='/editstate/:id' name="Editstate" render={(props) => <Editstate {...props} />} />
            <Route exact path='/editcity/:id' name="Editcity" render={(props) => <Editcity {...props} />} />
            <Route exact path='/editproject/:id' name="Editproject" render={(props) => <Editproject {...props} />} />
            <Route exact path='/editrole/:id' name="Editrole" render={(props) => <Editrole {...props} />} />
            <Route exact path='/editsalary/:id' name="Editsalary" render={(props) => <Editsalary {...props} />} />
            <Route exact path='/edittech/:id' name="Edittech" render={(props) => <Edittech {...props} />} />
            <Route exact path='/edituser/:id' name="Edituser" render={(props) => <Edituser {...props} />} />
            <Route exact path='/editevent/:id' name="Editevent" render={(props) => <Editevent {...props} />} />
            <Route exact path='/editbankdetail/:id' name="Editbankdetail" render={(props) => <Editbankdetail {...props} />} />
            <Route exact path='/editcompanyprofile/:id' name="Editcompanyprofile" render={(props) => <Editcompanyprofile {...props} />} />



            {/* userside ... */}

            <Route exact path='/loggeduser' name="Profile" render={(props) => <Profile {...props} />} />

            {/* manager side ... */}

            <Route exact path='/attendanceuser' name="Attendanceuser" render={(props) => <Attendanceuser {...props} />} />
            <Route exact path='/attendanceuser/:assign_id' name="Attendanceuser" render={(props) => <Attendanceuser {...props} />} />

            <Route exact path='/addmanager' name="Addmanager" render={(props) => <Addmanager {...props} />} />
            <Route exact path='/editmanager/:id' name="Editmanager" render={(props) => <Editmanager {...props} />} />



          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
