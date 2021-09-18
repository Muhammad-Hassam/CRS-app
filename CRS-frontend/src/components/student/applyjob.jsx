import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Storage from "../config/firebase";
import Swal from "sweetalert2";
import url from "../../baseurl/baseURL";

function Applyjobs(props) {
  const userData = useSelector((state) => state.status);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const data = props.location.state;
  const { id } = useParams();

  useEffect(() => {
    if (data === null || data === "undefined" || data === "") {
      history.push("/studentjob");
    } else {
      console.log(data);
    }
  }, []);

  const saveFile = (event) => {
    let images = event.target.files[0];
    console.log(images);
    let pics = images;
    const picsname = Date.now();
    Storage.ref("file/" + images.name + picsname)
      .put(pics)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((URL) => {
          setFile(URL);
          Swal.fire({
            position: "center",
            title: "Your file is uploading",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = async (e) => {
    axios({
      method: "post",
      url: url + "/applyjob",
      withCredentials: true,
      data: {
        email: userData.user.email,
        name: userData.user.uname,
        cv: file,
        jobID: data,
        userID: userData.user._id,
      },
    })
      .then((res) => {
        if (!res.status === 200) {
          console.log("data is not comming");
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Appplied Job Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: "25px", justifyContent: "center" }}>
        <Card style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
            <h1>Apply to Job</h1>
          </Grid>
          <Grid xs={12} md={12} sm={12} style={{ marginRight: "15px" }}>
            <TextField
              label="Upload CV"
              style={{ margin: 6, marginBottom: "20px" }}
              placeholder="Upload Your CV"
              helperText="CV Should be PDF OR docx format"
              fullWidth
              type="file"
              onChange={saveFile}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
            />
          </Grid>
          <Button
            variant="contained"
            color="default"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              marginLeft: "10px",
            }}
            onClick={uploadFile}
          >
            Apply
          </Button>
        </Card>
      </Grid>
      <Footer />
    </>
  );
}

export default Applyjobs;
