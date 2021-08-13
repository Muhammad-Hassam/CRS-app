import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

const Compsignup = () => {
  const userData = useSelector((state) => state.status);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      uname: userData.user.uname,
      status: userData.user.status,
      services: userData.user.services,
      website: userData.user.website,
      contact: userData.user.contact,
    },
    onSubmit: (values) => {
      const { uname, status, services, website, contact } = values;
      axios({
        method: 'post',
        url: 'http://localhost:4000/userupdate',
        withCredentials: true,
        data: {
          id: userData.user._id,
          website: website,
          status: status,
          services: services,
          uname: uname.toUpperCase(),
          contact: contact,
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            console.log('data is not comming');
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Profile Updated',
              showConfirmButton: false,
              timer: 2000,
            });
            history.push('/companyprofile');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: '25px', alignItems: 'center' }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={6} item>
          <Card>
            <Grid item xs={12} md={12} sm={12} style={{ textAlign: 'center' }}>
              <h1>Profile Update</h1>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: '15px' }}>
                <TextField
                  label='Company Name'
                  style={{ margin: 8, marginBottom: '20px' }}
                  placeholder='Enter Company Name'
                  helperText=''
                  fullWidth
                  margin='normal'
                  value={formik.values.uname}
                  onChange={formik.handleChange('uname')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='filled'
                />
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label='Services'
                    style={{ margin: 8 }}
                    placeholder='Enter company provided services'
                    helperText=''
                    fullWidth
                    type='text'
                    margin='normal'
                    value={formik.values.services}
                    onChange={formik.handleChange('services')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    style={{ marginLeft: '10px', marginTop: '10px' }}
                  >
                    <FormControl component='fieldset'>
                      <FormLabel component='legend'>Status</FormLabel>
                      <RadioGroup
                        aria-label='status'
                        name='status1'
                        value={formik.values.status}
                        onChange={formik.handleChange('status')}
                      >
                        <FormControlLabel
                          value='National'
                          control={<Radio />}
                          label='National'
                        />
                        <FormControlLabel
                          value='Multinational'
                          control={<Radio />}
                          label='Multinational'
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label='Website'
                    style={{ margin: 8 }}
                    placeholder='Enter company Website'
                    helperText=''
                    fullWidth
                    type='text'
                    margin='normal'
                    value={formik.values.website}
                    onChange={formik.handleChange('website')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label='Contact No'
                    style={{ margin: 8 }}
                    placeholder='Enter company contact No'
                    helperText=''
                    fullWidth
                    type='number'
                    margin='normal'
                    value={formik.values.contact}
                    onChange={formik.handleChange('contact')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant='filled'
                  />
                </Grid>
              </Grid>
              <Grid xs={12} md={12} sm={12} item>
                <Button
                  variant='contained'
                  color='default'
                  style={{
                    marginTop: '10px',
                    marginBottom: '15px',
                    marginLeft: '10px',
                  }}
                  type='submit'
                >
                  Update
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>
        <Grid xs={3} md={3} sm={3}></Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default Compsignup;
