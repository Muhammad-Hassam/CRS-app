import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import url from "../../baseurl/baseURL";

const CompanyJob = () => {
  const userData = useSelector((state) => state.status);
  const [data, setData] = useState([]);
  const history = useHistory();

  const deletejob = (id) => {
    axios({
      method: "post",
      url: url + "/jobremove",
      withCredentials: true,
      data: {
        id: id,
      },
    })
      .then((res) => {
        if (!res.status === 200) {
          console.log("data is not comming");
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Job Deleted",
            showConfirmButton: false,
            timer: 2000,
          });
          history.push("/companydashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: url + "/jobs",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);

  const jobs = data.filter((post) => post.id === userData.user._id);
  return (
    <>
      <Header />
      <Grid container style={{ marginTop: "25px" }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={12} item>
          <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
            <h1>Company Jobs</h1>
          </Grid>
          {jobs.map((value, index) => {
            return (
              <Card key={index} style={{ marginTop: "20px" }}>
                <Grid xs={12} md={12} sm={12} item>
                  <h4 style={{ textAlign: "center" }}> {value.uname}</h4>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                  sm={12}
                  item
                  style={{ marginLeft: "20px" }}
                >
                  <p>
                    <span>
                      <b>Email: </b>
                    </span>
                    <span>{value.email}</span>
                  </p>
                  <p>
                    <span>
                      <b>Job Type: </b>
                    </span>
                    <span>{value.jobtype}</span>
                  </p>
                  <p style={{ marginRight: "5px" }}>
                    <span>
                      <b>Job Description: </b>
                    </span>
                    <span>{value.description}</span>
                  </p>
                  <p>
                    <span>
                      <b>Skills Required: </b>
                    </span>
                    <span>{value.skills}</span>
                  </p>
                  <p>
                    <span>
                      <b>Experience Required: </b>
                    </span>
                    <span>{value.experience}</span>
                  </p>
                  <p>
                    <span>
                      <b>Website </b>
                    </span>
                    <span>{value.website}</span>
                  </p>
                  <p>
                    <span>
                      <b>Contact No: </b>
                    </span>
                    <span>{value.contact}</span>
                  </p>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                  sm={12}
                  item
                  style={{ textAlign: "center" }}
                >
                  <Button
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      marginLeft: "10px",
                      color: "#000",
                    }}
                  >
                    {console.log(value._id)}
                    <Link
                      to={{
                        pathname: `/jobapplicants/${value._id}`,
                        state: value,
                      }}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      Appplicants
                    </Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      marginLeft: "10px",
                      color: "#000",
                    }}
                  >
                    <Link
                      to={{ pathname: `/jobupdate/${value._id}`, state: value }}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      update
                    </Link>
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      marginLeft: "10px",
                    }}
                    onClick={() => deletejob(value._id)}
                  >
                    Delete
                  </Button>
                </Grid>
              </Card>
            );
          })}
        </Grid>
        <Grid xs={0} md={3} sm={0}></Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default CompanyJob;
