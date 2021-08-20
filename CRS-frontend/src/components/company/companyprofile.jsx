import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import User from "../../assets/images/user.png";
import { useSelector } from "react-redux";
import axios from "axios";
import Storage from "../config/firebase";
import url from "../../baseurl/baseURL";

const Companyprofile = () => {
  const userData = useSelector((state) => state.status);
  const [data] = useState(userData.user);
  const [url, setUrl] = useState("");
  const history = useHistory();

  const updateProfile = () => {
    history.push("/comapanyupdate");
  };

  const uploadImg = (event) => {
    let images = event.target.files[0];
    let pics = images;
    const picsname = Date.now();
    Storage.ref("picture/" + images.name + picsname)
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

  const update = () => {
    if (url) {
      axios({
        method: "post",
        url: url + "/userupdate",
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
      console.log("kindly select an image");
    }
  };

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: "25px" }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={6} item>
          <Card>
            <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
              <h1>Company Profile</h1>
            </Grid>
            <Grid container>
              <Grid xs={4} md={4} sm={4} item></Grid>
              <Grid xs={4} md={4} sm={4} item style={{textAlign:"center",marginLeft:"30px"}}>
                <form>
                  <label for="fileToUpload">
                    <div
                      class="profile-pic"
                      id="profilePic"
                      style={{
                        backgroundImage: `url( ${
                          url ? url : data.imageURL ? data.imageURL : User
                        } )`,
                      }}
                    >
                      <span class="glyphicon glyphicon-camera"></span>
                      <span>Change Image</span>
                    </div>
                  </label>
                  <input
                    type="File"
                    name="fileToUpload"
                    id="fileToUpload"
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
              style={{ marginTop: "5px", textAlign: "center" }}
            >
              <Button
                variant="contained"
                color="default"
                style={{
                  marginTop: "10px",
                  marginBottom: "15px",
                  marginLeft: "10px",
                  padding: "4px 50px",
                }}
                onClick={() => update()}
              >
                Save Image
              </Button>
            </Grid>
            <Grid xs={12} md={12} sm={12} item>
              <h4 style={{ textAlign: "center" }}>{data.uname}</h4>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ marginLeft: "20px" }}>
              <p>
                <span>
                  <b>Email: </b>
                </span>
                <span>{data.email}</span>
              </p>
              <p>
                <span>
                  <b>Services: </b>
                </span>
                <span>{data.services}</span>
              </p>
              <p>
                <span>
                  <b>Status: </b>
                </span>
                <span>{data.status}</span>
              </p>
              <p>
                <span>
                  <b>Website </b>
                </span>
                <span>{data.website}</span>
              </p>
              <p>
                <span>
                  <b>Contact No: </b>
                </span>
                <span>{data.contact}</span>
              </p>
            </Grid>
            <Grid xs={12} md={12} sm={12} item style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="default"
                style={{
                  marginTop: "10px",
                  marginBottom: "15px",
                  marginLeft: "10px",
                  padding: "4px 50px",
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
export default Companyprofile;
