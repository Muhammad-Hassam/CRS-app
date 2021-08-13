import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import "./style.css";
import axios from "axios";
import url from "../../baseurl/baseURL";

const Studsignup = () => {
  const userData = useSelector((state) => state.status);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      uname: userData.user.uname,
      qualification: userData.user.qualification,
      specialization: userData.user.specialization,
      gender: userData.user.gender,
      age: userData.user.age,
      skills: userData.user.skills,
      cgpa: userData.user.cgpa,
      mgrade: userData.user.matricgrade,
      igrade: userData.user.intergrade,
      contact: userData.user.contact,
    },
    onSubmit: (values) => {
      const {
        uname,
        qualification,
        specialization,
        gender,
        age,
        skills,
        cgpa,
        mgrade,
        igrade,
        contact,
      } = values;
      axios({
        method: "post",
        url: url + "/userupdate",
        withCredentials: true,
        data: {
          id: userData.user._id,
          age: age,
          skills: skills,
          gender: gender,
          matricgrade: mgrade.toUpperCase(),
          intergrade: igrade.toUpperCase(),
          qualification: qualification,
          specialization: specialization,
          uname: uname.toUpperCase(),
          cgpa: cgpa,
          contact: contact,
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            console.log("data is not comming");
          } else {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Profile Updated",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/Studprofile");
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
      <Grid container style={{ marginTop: "25px", alignItems: "center" }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={6} item>
          <Card>
            <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
              <h1>Profile Update</h1>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: "15px" }}>
                <TextField
                  label="Name"
                  style={{ margin: 6, marginBottom: "20px" }}
                  placeholder="Enter your Name"
                  helperText=""
                  fullWidth
                  value={formik.values.uname}
                  onChange={formik.handleChange("uname")}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                <FormControl
                  variant="filled"
                  fullWidth
                  style={{ marginLeft: "8px", marginBottom: "20px" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Qualification
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formik.values.qualification}
                    onChange={formik.handleChange("qualification")}
                    selected={formik.values.qualification}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Gradeuate"}>Graduate</MenuItem>
                    <MenuItem value={"Master"}>Masters</MenuItem>
                    <MenuItem value={"PHD"}>PHD</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="filled"
                  fullWidth
                  style={{ marginLeft: "8px" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Specialization
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formik.values.specialization}
                    onChange={formik.handleChange("specialization")}
                    selected={formik.values.specialization}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Engineering"}>Engineering</MenuItem>
                    <MenuItem value={"Science"}>Science</MenuItem>
                    <MenuItem value={"Commerce"}>Commerce</MenuItem>
                  </Select>
                </FormControl>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sm={12}
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={formik.values.gender}
                      onChange={formik.handleChange("gender")}
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Age"
                    style={{ margin: 8 }}
                    placeholder="Enter Your University CGPA"
                    helperText=""
                    fullWidth
                    type="text"
                    margin="normal"
                    value={formik.values.age}
                    onChange={formik.handleChange("age")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="CGPA"
                    style={{ margin: 8 }}
                    placeholder="Enter Your University CGPA"
                    helperText=""
                    fullWidth
                    type="text"
                    margin="normal"
                    value={formik.values.cgpa}
                    onChange={formik.handleChange("cgpa")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    label="Skills"
                    style={{ margin: 8 }}
                    placeholder="Enter Your skills"
                    helperText=""
                    fullWidth
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
                <Grid container>
                  <Grid item xs={5} md={5} sm={5}>
                    <TextField
                      label="Grade"
                      style={{ margin: 8 }}
                      placeholder="Enter Your Inter Grade"
                      helperText=""
                      fullWidth
                      type="text"
                      margin="normal"
                      value={formik.values.igrade}
                      onChange={formik.handleChange("igrade")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={2} md={2} sm={2}></Grid>
                  <Grid item xs={5} md={5} sm={5}>
                    <TextField
                      label="Grade"
                      style={{ margin: 8 }}
                      placeholder="Enter Your matric Grade"
                      helperText=""
                      fullWidth
                      type="text"
                      margin="normal"
                      value={formik.values.mgrade}
                      onChange={formik.handleChange("mgrade")}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} sm={12}>
                <TextField
                  label="Contact"
                  style={{ margin: 8 }}
                  placeholder="Enter Your University CGPA"
                  helperText=""
                  fullWidth
                  type="text"
                  margin="normal"
                  value={formik.values.contact}
                  onChange={formik.handleChange("contact")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
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
export default Studsignup;
