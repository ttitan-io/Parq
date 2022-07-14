import * as React from "react";
import { Link , Redirect, useHistory} from "react-router-dom";
import "../styles.scss";
import axios from "axios";
import logo from "../assets/blueParq.png";
import topoBackground from "../assets/topoBackground.png";
import bookArchway from "../assets/book archway.png";
import hostArchway from "../assets/host archway.png";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@mui/material/TextField";
import LoginPopup from "./LoginPopup.jsx"
import AboutPage from "./About.jsx"
import Host from "./Host.jsx"


export default function LandingPage() {
  const useStyles = makeStyles(() => ({
    textField: {
      width: "98%",
      height: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500,
      borderRadius: 0,
    },
    input: {
      color: "white",
    },
  }));

  const classes = useStyles();

  const [address, setAddress] = useState("");
  // const [data, setData] = useState({
  //   lat: 34.052235,
  //   lng: -118.243683,
  //   listings: [],
  // });

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/all", {
        address: address,
      })
      .then((res) => {
        history.push({
          pathname: '/dashboard',
          data: res.data})
        })
      .catch((err) => {
        console.log(`Error occured in useEffect: ${err}`);
      });

  };


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="navBar" style={{ height: "70px" }} sx={{ flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                book
              </Typography>
              </ Link>
            </Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                <Host />
              </Typography>
            </Button>
            <Button>
              <img className="websiteLogo" src={logo} />
            </Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                <AboutPage />
              </Typography>
            </Button>
            <Button color="inherit" sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textTransform: "none",
                  fontWeight: "light",
                  color: "#36454F",
                }}
              >
                <LoginPopup />
              </Typography>
            </Button>
          </Toolbar>
        </Box>
      </div>

      <div className="topoSearch" style={{ height: "350px" }}>
        <img className="topo" src={topoBackground} width="100%"></img>
        <div className="landingSearch">
          <form onSubmit={handleSubmit} >
            <TextField
              id="standard-search"
              variant="outlined"
              label="city, state, zip code"
              className={classes.textField}
              value={address}
              size="small"
              onChange={(e) => setAddress(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#B9D8D8" }} />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </form>
        </div>
      </div>

      <div className="archways" style={{ height: `calc( 100vh - 440px)` }}>
        <div
          className="leftArch"
          style={{ width: "49%", height: "100%", float: "left" }}
        >
          <Link to="/dashboard">
            <button className="leftArchText">book</button>
          </Link>
          <img className="archway" src={bookArchway} width="100%"></img>
        </div>
        <div
          className="rightArch"
          style={{ width: "50%", height: "100%", float: "right" }}
        >
          <Link to="/dashboard">
            <button className="rightArchText">host</button>
          </Link>
          <img className="archway" src={hostArchway} width="100%"></img>
        </div>
      </div>
    </div>
  );
}
