import React, { useState } from "react";
import topoBackground from "../assets/topoBackground.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles.scss";
import '../index.css';
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
// import { BookingForm } from "./BookingForm.jsx";
import { GetDirectionsPopup } from "./GetDirectionsPopup.jsx";
import logo from "../assets/blueParq.png";

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
    <DialogTitle
      sx={{
        position: "relative",
        marginLeft: "10rem",
        width: "50%",
        height: "auto",
      }}
      {...other}
    >
      {children}
      <img className="websiteLogo" src={logo} />
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            marginLeft: "3rem",
            color: "#BBD1D1",
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

export default function ParkingSpotTest({ info, isVisible }) {
  const { address, options, price, size, hostName , location, bookingDate, length} = info;
  const [open, setOpen] = useState(false);

  const onSpotClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="card">
      <div className="profileTileOutter" onClick={onSpotClick}>
        <div className="profileTile" onClick={onSpotClick}>
          <img className="tileTopoProfile" src={topoBackground} width="100%"></img>
          <span>
            {address && (
                <h1 className="spotAddressProfile">{address}</h1>
            )}
            {location && (
                <h1 className="spotAddressProfile">{location}</h1>
            )}
          </span>
        </div>
        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            ></BootstrapDialogTitle>
            <DialogContent
              dividers
              sx={{
                fontFamily: "Helvetica",
                fontWeight: "thin",
                textAlign: "center",
              }}
            >
              {/* <div className="spotPrice"
                style={{
                  fontSize: "x-large",
                  fontWeight: "bold",
                  color: "#BBD1D1",
                }}
              >
                ${price}/hr
              </div> */}
              <br></br>
              <div style={{ fontWeight: "lighter" }}>{address}</div>
              {size === 1 && (
                <div style={{ fontWeight: "lighter" }}>
                  {options} | {size} car
                </div>
              )}
              {size > 1 && (
                <div style={{ fontWeight: "lighter" }}>
                  {options} | {size} cars
                </div>
              )}
              <GetDirectionsPopup bookingDate={bookingDate} price={price} length={length} address={address} location={location}/>
            </DialogContent>
          </BootstrapDialog>
        </div>
      </div>
    </div>
  );
}
