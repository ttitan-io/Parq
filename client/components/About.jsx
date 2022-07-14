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
          about
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Info about parq...</Typography>
          <Typography gutterBottom>info about booker...</Typography>
          <Typography gutterBottom>info about host...</Typography>
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
