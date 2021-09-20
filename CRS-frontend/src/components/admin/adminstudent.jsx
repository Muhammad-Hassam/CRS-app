import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import User from "../../assets/images/user.png";
import Swal from "sweetalert2";
import axios from "axios";
import url from "../../baseurl/baseURL";
const AdminStudent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: url + "/user",
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

  const deletejob = (id) => {
    axios({
      method: "post",
      url: url + "/userremove",
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
            position: "center",
            icon: "success",
            title: "Job Deleted",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const update = (val) => {
    if (val.allow === "true") {
      axios({
        method: "post",
        url: url + "/userupdate",
        withCredentials: true,
        data: {
          id: val.id,
          allow: false,
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            console.log("data is not comming");
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile Updated",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      axios({
        method: "post",
        url: url + "/userupdate",
        withCredentials: true,
        data: {
          id: val.id,
          allow: true,
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            console.log("data is not comming");
          } else {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Profile Updated",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  const student = data.filter((post) => post.role === "student");

  return (
    <>
      <Header />
      <Grid container style={{ display:"flex",justifyContent:"center",alignItems:"center",height:"calc(100vh - 300px)" }}>
        {student.length>0?
      <>
      <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
        <h1>Student Profile</h1>
      </Grid>
      <Grid xs={0} md={3} sm={0}></Grid>
      <Grid xs={12} md={6} sm={12} item>
        {student.map((value, index) => {
          return (
            <Card style={{ marginTop: "20px" }} key={index}>
              <Grid container>
                <Grid
                  xs={12}
                  md={12}
                  sm={12}
                  item
                  style={{ display:"flex",justifyContent:"center"}}
                >
                  <Avatar
                    alt="User Image"
                    src={value.imageURL ? value.imageURL : User}
                    style={{
                      width: "160px",
                      height: "160px",
                      alignItems: "center",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} md={12} sm={12} item>
                <h4 style={{ textAlign: "center" }}>{value.uname}</h4>
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
                    <b>Age: </b>
                  </span>
                  <span>{value.age}</span>
                </p>
                <p>
                  <span>
                    <b>Gender: </b>
                  </span>
                  <span>{value.gender}</span>
                </p>
                <p>
                  <span>
                    <b>Qualification: </b>
                  </span>
                  <span>{value.qualification}</span>
                </p>
                <p>
                  <span>
                    <b>Specialization: </b>
                  </span>
                  <span>{value.specialization}</span>
                </p>
                <p>
                  <span>
                    <b>CGPA: </b>
                  </span>
                  <span>{value.cgpa}</span>
                </p>
                <p>
                  <span>
                    <b>Skills: </b>
                  </span>
                  <span>{value.skills}</span>
                </p>
                <p>
                  <span>
                    <b>Inter Grade: </b>
                  </span>
                  <span>{value.intergrade}</span>
                </p>
                <p>
                  <span>
                    <b>Matric Grade: </b>
                  </span>
                  <span>{value.matricgrade}</span>
                </p>
                <p>
                  <span>
                    <b>Contact: </b>
                  </span>
                  <span>{value.contact}</span>
                </p>
                <p>
                  <span>
                    <b>Allow: </b>
                  </span>
                  <span>{value.allow}</span>
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
                    padding: "4px 50px",
                  }}
                  onClick={() =>
                    update({ id: value._id, allow: value.allow })
                  }
                >
                  Allow
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{
                    marginTop: "10px",
                    marginBottom: "15px",
                    marginLeft: "10px",
                    padding: "4px 50px",
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
      </>  
      :<h1 style={{display:"flex",justifyContent:"center",color:"grey", alignItems:"center",height:"700px"}}>No Profile Available</h1>}
        
      </Grid>

      <Footer />
    </>
  );
};
export default AdminStudent;
