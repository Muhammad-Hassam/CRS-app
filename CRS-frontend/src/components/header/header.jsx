import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Crsicon from "../../assets/images/CRsIcon.png";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import userStatus from "../../store/action/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import url from "../../baseurl/baseURL";

const Header = () => {
  const userData = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    axios({
      method: "post",
      url: url + "/logout",
      withCredentials: true,
    })
      .then((res) => {
        dispatch(
          userStatus({
            loginStatus: false,
          })
        );
      })
      .catch((err) => {
        dispatch(
          userStatus({
            loginStatus: false,
          })
        );
      });
  };
  return (
    <Grid container style={{ backgroundColor: "skyblue" }}>
      <Grid item xs={9} md={9} sm={9}>
        <h1 style={{ paddingLeft: "30px", display: "flex" }}>
          <span>
            <Avatar alt="CrsIcon" src={Crsicon} />
          </span>
          <span style={{ paddingLeft: "5px" }}> CRMs</span>
        </h1>
      </Grid>
      <Grid item xs={1} md={1} sm={1}>
        {userData.loginStatus === true ? (
          <Button
            variant="contained"
            color="default"
            startIcon={<AccountCircleIcon />}
            style={{ marginTop: "19px" }}
            onClick={() => logout()}
          >
            Logout
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={2} md={2} sm={2}></Grid>
    </Grid>
  );
};
export default Header;
