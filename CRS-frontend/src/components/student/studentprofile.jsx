import React, { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import User from '../../assets/images/user.png';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Storage from '../config/firebase';
import axios from 'axios';

const Studprofile = () => {
  const userData = useSelector((state) => state.status);
  const [data] = useState(userData.user);
  const [url, setUrl] = useState('');
  const history = useHistory();

  const updateProfile = () => {
    history.push('/studentupdate');
  };

  const update = () => {
    if (url) {
      axios({
        method: 'post',
        url: 'http://localhost:4000/userupdate',
        withCredentials: true,
        data: {
          id: userData.user._id,
          imageURL: url,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('kindly select an image');
    }
  };

  const uploadImg = (event) => {
    let images = event.target.files[0];
    let pics = images;
    const picsname = Date.now();
    Storage.ref('picture/' + images.name + picsname)
      .put(pics)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((URL) => {
          setUrl(URL);
        });
        console.log(url);
        data.imageURL = url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: '25px' }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={6} item>
          <Card>
            <Grid item xs={12} md={12} sm={12} style={{ textAlign: 'center' }}>
              <h1>Student Profile</h1>
            </Grid>
            <Grid container>
              <Grid xs={4} md={4} sm={4} item></Grid>
              <Grid xs={4} md={4} sm={4} item>
                <form>
                  <label for='fileToUpload'>
                    <div
                      class='profile-pic'
                      id='profilePic'
                      style={{
                        backgroundImage: `url( ${
                          url ? url : data.imageURL ? data.imageURL : User
                        } )`,
                      }}
                    >
                      <span class='glyphicon glyphicon-camera'></span>
                      <span>Change Image</span>
                    </div>
                  </label>
                  <input
                    type='File'
                    name='fileToUpload'
                    id='fileToUpload'
                    onChange={uploadImg}
                  />
                </form>
              </Grid>
              <Grid xs={4} md={4} sm={4} item></Grid>
            </Grid>
            <Grid
              xs={12}
              md={12}
              sm={12}
              item
              style={{ marginTop: '5px', textAlign: 'center' }}
            >
              <Button
                variant='contained'
                color='default'
                style={{
                  marginTop: '10px',
                  marginBottom: '15px',
                  marginLeft: '10px',
                  padding: '4px 50px',
                }}
                onClick={() => update()}
              >
                Save Image
              </Button>
            </Grid>
            <Grid xs={12} md={12} sm={12} item>
              <h4 style={{ textAlign: 'center' }}>{data.uname}</h4>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ marginLeft: '20px' }}>
              <p>
                <span>
                  <b>Email: </b>
                </span>
                <span>{data.email}</span>
              </p>
              <p>
                <span>
                  <b>Age: </b>
                </span>
                <span>{data.age}</span>
              </p>
              <p>
                <span>
                  <b>Gender: </b>
                </span>
                <span>{data.gender}</span>
              </p>
              <p>
                <span>
                  <b>Qualification: </b>
                </span>
                <span>{data.qualification}</span>
              </p>
              <p>
                <span>
                  <b>Specialization: </b>
                </span>
                <span>{data.specialization}</span>
              </p>
              <p>
                <span>
                  <b>CGPA: </b>
                </span>
                <span>{data.cgpa}</span>
              </p>
              <p>
                <span>
                  <b>Skills: </b>
                </span>
                <span>{data.skills}</span>
              </p>
              <p>
                <span>
                  <b>Inter Grade: </b>
                </span>
                <span>{data.intergrade}</span>
              </p>
              <p>
                <span>
                  <b>Matric Grade: </b>
                </span>
                <span>{data.matricgrade}</span>
              </p>
              <p>
                <span>
                  <b>Conatact: </b>
                </span>
                <span>{data.contact}</span>
              </p>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ textAlign: 'center' }}>
              <Button
                variant='contained'
                color='default'
                style={{
                  marginTop: '10px',
                  marginBottom: '15px',
                  marginLeft: '10px',
                  padding: '4px 50px',
                }}
                onClick={() => updateProfile()}
              >
                Edit Profile
              </Button>
            </Grid>
          </Card>
        </Grid>
        <Grid xs={3} md={3} sm={3}></Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default Studprofile;
