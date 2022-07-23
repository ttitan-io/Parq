import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "../styles.scss";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import topoBackground from "../assets/topoBackground.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Login } from "./Login.jsx";
import Maps from "./Map.jsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const GetDirectionsPopup = ({ bookingDate, address, location, length, price }) => {
//   const [createDate, setCreateDate] = useState("");
//   const [createLength, setCreateLength] = useState(0);

  const [open, setOpen] = useState(false);

  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

 function returnLocation(location) {
    // console.log("location is ->", location.coords)
    const longitude = location.coords.longitude;
    const latitude = location.coords.latitude;
    window.sessionStorage.setItem('originLongitude', longitude);
    window.sessionStorage.setItem('originLatitude', latitude);
    return location.coords;
}

navigator.geolocation.getCurrentPosition(returnLocation);


  if (!open) {
    return (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "20ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          {" "}
          <Typography
          variant="h6"
          component="div"
          sx={{
            textTransform: "none",
            fontWeight: "light",
            color: "#36454F",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
        >
          {address && length && (
                <p style={{ 
                    fontWeight: "lighter",
                    marginTop: "0rem", 
                    marginBottom: "0rem",
                    fontSize: "25px" 
                }}>{address}</p>
            )}
            {location && length && (
               <p style={{ 
                    fontWeight: "lighter",
                    marginTop: "0rem", 
                    marginBottom: "0rem",
                    fontSize: "25px" 
                }}>{location}</p>
            )}
            {length === 1 && (
                  <p style={{ 
                    fontWeight: "lighter", 
                    marginTop: "0rem",
                    marginBottom: "2rem", 
                    fontSize: "15px" 
                }}>booked {bookingDate} for {length} day</p>
              )}
              {length > 1 && (           
                   <p style={{ 
                    fontWeight: "lighter", 
                    marginTop: "0rem",
                    marginBottom: "2rem", 
                    fontSize: "15px" 
                }}>booked {bookingDate} for {length} days</p>
              )}
        </Typography>
            <Link to={{
                pathname: '/directions',
                state: 
                    { 
                    address: address,
                    location: location,
                    // origin: origin,
                    }
                }} style={{ textDecoration: "none" }}>
                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                    border: ".75px solid #36454F",
                    color: "#BBD1D1",
                    "&:hover": {
                        backgroundColor: "#BBD1D1",
                        color: "#F8F6F2",
                        boxShadow: "none",
                    },
                    background: "#F8F6F2",
                    textTransform: "none",
                    boxShadow: "none",
                    width: "84%",
                    marginBottom: ".5rem",
                    marginLeft: ".2rem",
                    paddingTop: ".75rem",
                    paddingBottom: ".75rem",
                    fontWeight: "bold",
                    }}
                >
                    {/* {" "} */}
                    get directions!
                </Button>
            </Link>
        </div>
      </Box>
    );
  } else
    return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent dividers>
          <Login />
        </DialogContent>
      </BootstrapDialog>
    );
};
