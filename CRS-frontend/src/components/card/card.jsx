import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import student from '/home/coder/CRS/frontend/src/assets/images/student.png';
import company from '/home/coder/CRS/frontend/src/assets/images/company.png';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

const Cards = () => {
  const history = useHistory();

  const students = () => {
    history.push('/StudentDashboard');
  };

  const companies = () => {
    history.push('/CompanyDashboard');
  };

  return (
    <Grid container style={{ marginTop: '25px' }}>
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
                Student's Area
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
              Enter
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
              image={company}
              title='Students'
            />
            <CardContent>
              <Typography
                gutterBottom
                variant='h4'
                component='h2'
                style={{ textAlign: 'center' }}
              >
                Company's Area
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
              Enter
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3} md={4}></Grid>
    </Grid>
  );
};

export default Cards;
