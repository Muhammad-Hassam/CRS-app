import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import student from '../../assets/images/student.png';
import profile from '../../assets/images/profile.png';
import Job from '../../assets/images/job.png';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const Admindashboard = () => {
  const history = useHistory();

  const students = () => {
    history.push('/AdminStudent');
  };

  const companies = () => {
    history.push('/Admincompany');
  };

  const jobs = () => {
    history.push('/Adminjob');
  };
  return (
    <>
      <Header />
      <Grid container style={{ marginTop: '25px' }}>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          style={{ textAlign: 'center', textDecoration: 'underline' }}
        >
          <h1>Admin DashBoard</h1>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: '0 auto',
                  height: '200px',
                  width: '200px',
                  marginTop: '15px',
                }}
                image={student}
                title='Students'
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='h2'
                  style={{ textAlign: 'center' }}
                >
                  Student Profile
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: 'skyblue' }}>
              <Button
                variant='contained'
                color='default'
                style={{ margin: '0 auto' }}
                onClick={() => students()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4} style={{ marginTop: '45px' }}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: '0 auto',
                  height: '200px',
                  width: '200px',
                  marginTop: '15px',
                }}
                image={profile}
                title='Students'
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='h2'
                  style={{ textAlign: 'center' }}
                >
                  Company Profile
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: 'skyblue' }}>
              <Button
                variant='contained'
                color='default'
                style={{ margin: '0 auto' }}
                onClick={() => companies()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4} style={{ marginTop: '45px' }}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: '0 auto',
                  height: '200px',
                  width: '200px',
                  marginTop: '15px',
                }}
                image={Job}
                title='Students'
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h4'
                  component='h2'
                  style={{ textAlign: 'center' }}
                >
                  Posted Jobs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: 'skyblue' }}>
              <Button
                variant='contained'
                color='default'
                style={{ margin: '0 auto' }}
                onClick={() => jobs()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Admindashboard;
