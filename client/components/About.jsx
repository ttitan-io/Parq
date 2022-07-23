import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
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
    <DialogTitle sx=
    {{
      position: "relative",
      marginLeft: "10rem",
      width: "50%",
      height: "auto",
    }}
     {...other}>
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

export default function AboutPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   const useStyles = makeStyles(() => ({
  //     textField: {
  //       width: "98%",
  //       height: "50%",
  //       marginLeft: "auto",
  //       marginRight: "auto",
  //       paddingBottom: 0,
  //       marginTop: 0,
  //       fontWeight: 500,
  //       borderRadius: 0,
  //     },
  //     input: {
  //       color: "white",
  //     },
  //   }));

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button color="inherit" sx={{ flexGrow: 1 }} onClick={handleClickOpen}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textTransform: "none",
            fontWeight: "light",
            color: "#36454F",
          }}
        >
          about
        </Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
              <div style={{textAlign: "center", fontWeight: "lighter"}}>
              <h1 style={{color: "#6C7983"}}>Description</h1>
              Parq makes it easy to find your favorite parking spot. 
            Just enter your destination into the Parq website, and it will tell you exactly where to park. 
              </div>
          
            <div style={{textAlign: "center", fontWeight: "bold", color: "#6C7983"}}>
              <h1>Product Features</h1>
            </div>
            <div style={{textAlign: "center"}}>
              <div >
                <li>Find your best parking spot before you leave.</li>
                <li>Get detailed information about where you parked.</li>
                <li>Park anywhere in the city.</li>
                <li>Save money and time by no longer feeding meters.</li>
                <li>No more circling around looking for a spot.</li>
                <li>View maps on your device.</li>
              </div>
            </div>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
