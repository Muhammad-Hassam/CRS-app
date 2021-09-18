import React,{useState} from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userStatus from "../store/action/index";
import axios from "axios";
import url from "../baseurl/baseURL";
import CircularProgress from '@material-ui/core/CircularProgress';

const Login = () => {
  const userData = useSelector((state) => state.Status);
  const dispatch = useDispatch();
  const [isLoading,setIsloading]=useState(false)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is Required!"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      setIsloading(true)
      axios({
        method: "post",
        url: url + "/login",
        withCredentials: true,
        data: {
          email: email.toLowerCase(),
          password: password,
        },
      })
        .then((res) => {
          if (res.data.status === 200) {
            dispatch(
              userStatus({
                loginStatus: true,
                role: res.data.data.role,
                user: res.data.data,
              })
            );
            setIsloading(false)
          } else {
            setIsloading(false)
            alert("Invalid Credential")
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          alert("Invalid Credential")
          setIsloading(false)
          console.log(err);
        });
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
            height: "calc(100vh - 142px)"
          }}
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
                <h1>Login Form</h1>
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
                  <p style={{ color: "red" }}>{formik.errors.password}</p>
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
                  >{isLoading?<CircularProgress size={20}/>:"Login"}
                  </Button>
                </Grid>
                <Grid xs={6} md={6} sm={6} style={{ marginTop: "15px",textAlign:"right",paddingRight:"10px" }} item>
                  <Link
                    style={{ color: "#000" }}
                    to="/Signup"
                  >
                    Not have account!
                  </Link>
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
export default Login;
