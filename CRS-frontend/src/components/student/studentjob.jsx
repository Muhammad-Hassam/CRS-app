import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import userStatus from "../../store/action/index";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import url from "../../baseurl/baseURL";

const Studentjob = () => {
  const userData = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const history = useHistory();

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
  return (
    <>
      <Header />

      <Grid container style={{  display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 142px)"}}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={12} item>

        {data.length>0?
        <>
          <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
            <h1>Jobs</h1>
          </Grid>
          {data.map((value, index) => {
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
                    }}
                  >
                    <Link
                      to={{
                        pathname: `/Applyjob/${value._id}`,
                        state: value,
                      }}
                      style={{ color: "#000", textDecoration: "none" }}
                    >
                      Apply
                    </Link>
                  </Button>
                </Grid>
              </Card>
            );
            
          })}
          </>:<h1 style={{display:"flex",justifyContent:"center",color:"grey"}}>No Jobs Available</h1>}
        </Grid>
        <Grid xs={0} md={3} sm={0}></Grid>
      </Grid>
      <Footer />
    </>
  );
};
export default Studentjob;
