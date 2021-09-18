import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import student from "../../assets/images/profile.png";
import Job from "../../assets/images/job.png";
import Createjob from "../../assets/images/createjob.png";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const Companydashboard = () => {
  const history = useHistory();
  const comprofile = () => {
    history.push("/Companyprofile");
  };
  const comJob = () => {
    history.push("/Companyjob");
  };
  const comsignup = () => {
    history.push("/Compsignup");
  };
  const comcreatejob = () => {
    history.push("/CreateJob");
  };
  return (
    <>
      <Header />
      <Grid container style={{ display:"flex",justifyContent:"center",alignItems:"center",height:"calc(100vh - 142px)" }}>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          style={{ textAlign: "center", textDecoration: "underline" }}
        >
          <h1>Company DashBoard</h1>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4}>
          <Card>
            <CardActionArea></CardActionArea>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: "0 auto",
                  height: "200px",
                  width: "200px",
                  marginTop: "15px",
                }}
                image={student}
                title="Students"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Profile
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: "skyblue" }}>
              <Button
                variant="contained"
                color="default"
                style={{ margin: "0 auto" }}
                onClick={() => comprofile()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4} style={{ marginTop: "45px" }}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: "0 auto",
                  height: "200px",
                  width: "200px",
                  marginTop: "15px",
                }}
                image={Job}
                title="Students"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Posted Jobs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: "skyblue" }}>
              <Button
                variant="contained"
                color="default"
                style={{ margin: "0 auto" }}
                onClick={() => comJob()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={3} md={4}></Grid>
        <Grid item xs={6} md={4} style={{ marginTop: "45px" }}>
          <Card>
            <CardActionArea>
              <CardMedia
                style={{
                  margin: "0 auto",
                  height: "200px",
                  width: "200px",
                  marginTop: "15px",
                }}
                image={Createjob}
                title="Students"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  Create Jobs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: "skyblue" }}>
              <Button
                variant="contained"
                color="default"
                style={{ margin: "0 auto" }}
                onClick={() => comcreatejob()}
              >
                Create
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

export default Companydashboard;
