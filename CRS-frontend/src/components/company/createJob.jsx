import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import url from "../../baseurl/baseURL";

const Createjob = () => {
  const userData = useSelector((state) => state.status);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      uname: "",
      experience: "",
      website: "",
      contact: "",
      email: "",
      description: "",
      jobtype: "",
      skills: "",
    },
    validationSchema: Yup.object({
      uname: Yup.string()
        .required("Required!"),
      experience: Yup.string()
        .required("Required!"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Required!"),
      jobtype: Yup.string()
      .required("Required!"),

    }),

    onSubmit: (values) => {
      const {
        uname,
        experience,
        website,
        contact,
        email,
        description,
        jobtype,
        skills,
      } = values;
      axios({
        method: "post",
        url: url + "/createjobs",
        withCredentials: true,
        data: {
          id: userData.user._id,
          website: website,
          skills: skills,
          description: description,
          contact: contact,
          email: email,
          experience: experience,
          jobtype: jobtype,
          uname: uname,
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            console.log("data is not comming");
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Job Created",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/companydashboard");
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
      <Grid container style={{display:"flex",justifyContent:"center",alignItems:"center",height:"calc(100vh - 142px)"}}>
        <Grid xs={0} md={3} sm={0}></Grid>
        <Grid xs={12} md={6} sm={12} item>
          <Card>
            <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
              <h1>Create Job Form</h1>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: "15px" }}>
                <TextField
                  label="Company Name"
                  style={{ margin: 8, marginBottom: "20px" }}
                  placeholder="Enter Company Name"
                  helperText=""
                  fullWidth
                  margin="normal"
                  value={formik.values.uname}
                  onChange={formik.handleChange("uname")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                 {formik.errors.uname && formik.touched.uname && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.uname}
                  </p>
                )}
                <TextField
                  label="Email"
                  style={{ margin: 8, marginBottom: "20px" }}
                  placeholder="Enter Email"
                  helperText=""
                  fullWidth
                  margin="normal"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                 {formik.errors.email && formik.touched.email && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.email}
                  </p>
                )}
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Description"
                    style={{ margin: 8 }}
                    placeholder="Enter Job Description"
                    helperText=""
                    multiline
                    rowsMax={4}
                    fullWidth
                    type="number"
                    margin="normal"
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sm={12}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Job Type</FormLabel>
                      <RadioGroup
                        aria-label="Job type"
                        name="job1"
                        value={formik.values.jobtype}
                        onChange={formik.handleChange("jobtype")}
                      >
                        <FormControlLabel
                          value="Part-Time"
                          control={<Radio />}
                          label="Part-Time"
                        />
                        <FormControlLabel
                          value="Full-Time"
                          control={<Radio />}
                          label="Full-Time"
                        />
                      </RadioGroup>
                      {formik.errors.jobtype && formik.touched.jobtype && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.jobtype}
                  </p>
                )}
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Skills"
                    style={{ margin: 8 }}
                    placeholder="Enter required skills"
                    helperText=""
                    fullWidth
                    multiline
                    rowsMax={2}
                    type="text"
                    margin="normal"
                    value={formik.values.skills}
                    onChange={formik.handleChange("skills")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Experience"
                    style={{ margin: 8 }}
                    placeholder="Enter required experience"
                    helperText=""
                    fullWidth
                    multiline
                    rowsMax={2}
                    type="text"
                    margin="normal"
                    value={formik.values.experience}
                    onChange={formik.handleChange("experience")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                {formik.errors.experience && formik.touched.experience && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.experience}
                  </p>
                )}
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Website"
                    style={{ margin: 8 }}
                    placeholder="Enter company Website"
                    helperText=""
                    fullWidth
                    type="text"
                    margin="normal"
                    value={formik.values.website}
                    onChange={formik.handleChange("website")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Contact No"
                    style={{ margin: 8 }}
                    placeholder="Enter company contact No"
                    helperText=""
                    fullWidth
                    type="number"
                    margin="normal"
                    value={formik.values.contact}
                    onChange={formik.handleChange("contact")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Grid xs={12} md={12} sm={12} item>
                <Button
                  variant="contained"
                  color="default"
                  style={{
                    marginTop: "10px",
                    marginBottom: "15px",
                    marginLeft: "10px",
                  }}
                  type="submit"
                >
                  Create Job
                </Button>
              </Grid>
            </form>
          </Card>
        </Grid>
        <Grid xs={0} md={3} sm={0}></Grid>
      </Grid>

      <Footer />
    </>
  );
};
export default Createjob;
