import React, { useEffect } from 'react';
import Login from '../login';
import Signup from '../signup';
import Studentsignup from '../student/studentsignup';
import Compsignup from '../company/companysignup';
import Jobapplicants from '../company/jobapplicants';
import Studprofile from '../student/studentprofile';
import Companyprofile from '../company/companyprofile';
import CreateJob from '../company/createJob';
import Companyjob from '../company/companyjob';
import Studentjob from '../student/studentjob';
import StudentDashboard from '../student/studentdashboard';
import CompanyDashboard from '../company/companydashboard';
import Jobupdate from '../company/jobupdate';
import AdminDashboard from '../admin/admindashboard';
import AdminStudent from '../admin/adminstudent';
import Admincompany from '../admin/admincompany';
import Adminjob from '../admin/adminjobs';
import Applyjob from '../student/applyjob';
import ApplyJobHistory from '../student/appljobhistory'
import { useSelector, useDispatch } from 'react-redux';
import userStatus from '../../store/action/index';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

const Routers = () => {
  const userData = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/profile',
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(
            userStatus({
              loginStatus: true,
              role: res.data.profile.role,
              user: res.data.profile,
            })
          );
        }
      })
      .catch((err) => {
        dispatch(userStatus({ loginStatus: false }));
      });
  }, []);

  return (
    <Router>
      {userData.loginStatus === false ? (
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/Signup' component={Signup} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      ) : null}

      {userData.role === 'student' ? (
        <Switch>
          <Route exact path='/' component={StudentDashboard} />
          <Route path='/studentupdate' component={Studentsignup} />
          <Route path='/studentjob' component={Studentjob} />
          <Route path='/Studprofile' component={Studprofile} />
          <Route path='/applyjob' component={Applyjob} />
          <Route path='/applyJobHistory' component={ApplyJobHistory} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      ) : null}
      {userData.role === 'company' ? (
        <Switch>
          <Route exact path='/' component={CompanyDashboard} />
          <Route path='/comapanyupdate' component={Compsignup} />
          <Route path='/companyjob' component={Companyjob} />
          <Route path='/companyprofile' component={Companyprofile} />
          <Route path='/jobupdate/:id' component={Jobupdate} />
          <Route path='/jobapplicants/:id' component={Jobapplicants}/>
          <Route path='/CreateJob' component={CreateJob} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      ) : null}

      {userData.role === 'admin' ? (
        <Switch>
          <Route exact path='/' component={AdminDashboard} />
          <Route path='/AdminStudent' component={AdminStudent} />
          <Route path='/Admincompany' component={Admincompany} />
          <Route path='/Adminjob' component={Adminjob} />
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      ) : null}
    </Router>
  );
};
export default Routers;
