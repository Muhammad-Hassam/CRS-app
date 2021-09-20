import React from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import url from "../baseurl/baseURL";

import * as Yup from "yup";
const SignUp = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      role: Yup.string().min(3, "Select an option"),
    }),
    onSubmit: (values) => {
      const { email, password, role } = values;

      if (role === "student") {
        axios({
          method: "post",
          url: url + "/signup",
          withCredentials: true,
          data: {
            email: email.toLowerCase(),
            password: password,
            role: role,
            imageURL: "",
            gender: "N/A",
            cgpa: "N/A",
            matricgrade: "N/A",
            uname: "N/A",
            contact: "N/A",
            allow: true,
            skills: "N/A",
            intergrade: "N/A",
            qualification: "N/A",
            specialization: "N/A",
            age: "N/A",
          },
        })
          .then((res) => {
            if (res.data.error==="Email exist") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email exist!",
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Signup SuccessFully",
                showConfirmButton: false,
                timer: 2000,
              });
              history.push("/");
            }
          })
          .catch((err) => {
            alert(err)
          });
      } else {
        axios({
          method: "post",
          url: "http://localhost:4000/signup",
          withCredentials: true,
          data: {
            email: email,
            password: password,
            role: role,
            uname: "N/A",
            imageURL: "",
            status: "N/A",
            services: "N/A",
            website: "N/A",
            contact: "N/A",
            allow: "yes",
          },
        })
          .then((res) => {
            if (!res.status === 200) {
              console.log("data is not comming");
            } else {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Signup SuccessFully",
                showConfirmButton: false,
                timer: 2000,
              });
              history.push("/Login");
            }
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  });

  return (
    <>
      <Header />
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          style={{  
            display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 142px)"}}
        >
          <Grid xs={0} md={4} sm={0}></Grid>
          <Grid xs={12} md={4} sm={12} item>
            <Card>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{ textAlign: "center" }}
              >
                <h1>Signup Form</h1>
              </Grid>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: "15px" }}>
                <TextField
                  label="Email"
                  style={{ margin: 8, marginBottom: "20px" }}
                  placeholder="Enter your email"
                  helperText=""
                  fullWidth
                  value={formik.values.email}
                  margin="normal"
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
                <TextField
                  label="Password"
                  style={{ margin: 8 }}
                  placeholder="Enter your Password"
                  helperText=""
                  type="password"
                  onChange={formik.handleChange("password")}
                  fullWidth
                  value={formik.values.password}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="filled"
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.password}
                  </p>
                )}
              </Grid>
              <Grid xs={12} md={12} sm={12} style={{ marginRight: "15px" }}>
                <FormControl
                  variant="filled"
                  fullWidth
                  style={{ marginLeft: 8, marginTop: 18, marginBottom: 15 }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    SignUp As
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={formik.role}
                    onChange={formik.handleChange("role")}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="company">Company</MenuItem>
                  </Select>
                </FormControl>
                {formik.errors.role && formik.touched.role && (
                  <p style={{ color: "red", marginLeft: "5px" }}>
                    {formik.errors.role}
                  </p>
                )}
              </Grid>
              <Grid container>
                <Grid xs={6} md={6} sm={6} item>
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
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid xs={0} md={4} sm={0}></Grid>
        </Grid>
      </form>
      <Footer />
    </>
  );
};
export default SignUp;
