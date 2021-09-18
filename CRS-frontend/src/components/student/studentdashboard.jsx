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
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

const Studdashboard = () => {
  const history = useHistory();

  const stdprofile = () => {
    history.push("/Studprofile");
  };
  const stdJob = () => {
    history.push("/Studentjob");
  };
  const jobhistory = () => {
    history.push("/applyJobHistory");
  };
  return (
    <>
      <Header />
      <Grid container style={{  display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 142px)" }}>
        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          style={{ textAlign: "center", textDecoration: "underline" }}
        >
          <h1>Student DashBoard</h1>
        </Grid>
        <Grid item xs={0} md={4} sm={0}></Grid>
        <Grid item xs={12} md={4} sm={12}>
          <Card>
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
                onClick={() => stdprofile()}
              >
                Check
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={0} md={4} sm={0}></Grid>
        <Grid item xs={0} md={4} sm={0}></Grid>
        <Grid item xs={0} md={4} sm={0} style={{ marginTop: "4px" }}>
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
                  Jobs
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ backgroundColor: "skyblue" }}>
              <Button
                variant="contained"
                color="default"
                style={{ margin: "0 auto" }}
                onClick={() => stdJob()}
              >
                Check
              </Button>
              <Button
                variant="contained"
                color="default"
                style={{ margin: "0 auto" }}
                onClick={() => jobhistory()}
              >
                Job history
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={0} md={4} sm={0}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Studdashboard;
