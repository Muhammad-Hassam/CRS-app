import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { useSelector, useDispatch } from "react-redux";
import url from "../../baseurl/baseURL";

const ApplyjobHistory = () => {
  const [data, setData] = useState([]);
  const userData = useSelector((state) => state.status);

  useEffect(() => {
    axios({
      method: "get",
      url: url + "/applyjob",
      withCredentials: true,
    })
      .then((res) => {
          setData(res.data.data);
      })
      .catch((err) => {
        if (err) {
          alert(err)
        }
      });
  }, []);

  const job = data.filter((post) => post.userID == userData.user._id);
  return (
    <>
      <Header />
      <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center",height:"calc(100vh - 142px)" }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={12} item>
        {data.length>0?
        <>
          <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
            <h1>Applied Jobs</h1>
          </Grid>
          {job.map((value, index) => {
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
                    <span>{value.jobID.email}</span>
                  </p>
                  <p>
                    <span>
                      <b>Job Type: </b>
                    </span>
                    <span>{value.jobID.jobtype}</span>
                  </p>
                  <p style={{ marginRight: "5px" }}>
                    <span>
                      <b>Job Description: </b>
                    </span>
                    <span>{value.jobID.description}</span>
                  </p>
                  <p>
                    <span>
                      <b>Skills Required: </b>
                    </span>
                    <span>{value.jobID.skills}</span>
                  </p>
                  <p>
                    <span>
                      <b>Experience Required: </b>
                    </span>
                    <span>{value.jobID.experience}</span>
                  </p>
                  <p>
                    <span>
                      <b>Website </b>
                    </span>
                    <span>{value.jobID.website}</span>
                  </p>
                  <p>
                    <span>
                      <b>Contact No: </b>
                    </span>
                    <span>{value.jobID.contact}</span>
                  </p>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                  sm={12}
                  item
                  style={{ textAlign: "center" }}
                ></Grid>
              </Card>
            );
          })}
          </>
          :
          <h1 style={{display:"flex",justifyContent:"center",color:"grey"}}>No Applied Jobs</h1>}
        </Grid>
        <Grid xs={0} md={3} sm={0}></Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default ApplyjobHistory;
