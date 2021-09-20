import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import url from "../../baseurl/baseURL";

const Jobapplicants = (props) => {
  const data = props.location.state;
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: url + "/applyjob",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        if (err) {
        }
      });
  }, []);
  const applicant = user.filter((post) => post.jobID._id === data._id);

  return (
    <>
      <Header />
      <Grid container style={{ marginTop: "25px" }}>
        <Grid xs={3} md={3} sm={3}></Grid>
        <Grid xs={12} md={6} sm={12} item>
        {applicant.length>0?
             <>
             <Grid item xs={12} md={12} sm={12} style={{ textAlign: "center" }}>
               <h1>Company Jobs</h1>
             </Grid>
             {applicant.map((value, index) => {
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
                       // onClick={() => deletejob(value._id)}
                     >
                       <a
                         href={value.cv}
                         style={{ color: "#000", textDecoration: "none" }}
                         target="_blank"
                       >
                         CV
                       </a>
                     </Button>
                   </Grid>
                 </Card>
               );
             })}
             </>
        :<h1 style={{display:"flex",justifyContent:"center",color:"grey", alignItems:"center",height:"700px"}}>No Applicants Available</h1>}  
   
        </Grid>
        <Grid xs={0} md={3} sm={0}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Jobapplicants;
