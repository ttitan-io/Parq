import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import "../styles.scss";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [createFirstName, setCreateFirstname] = useState("");
  const [createLastname, setCreateLastname] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  const handleSignup = (e) => {
    const firstName = createFirstName;
    const lastName = createLastname;
    const username = createUsername;
    const password = createPassword;
    e.preventDefault();
    console.log("handleSignup post called");

    axios
      .post("/api/users/signup", {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log("response from axios:", res);
        if (res.status === 201) {
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (loggedIn) {
    setTimeout(() => {
      history.push("/dashboard");
    }, 0);
  }



  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr'}}>
        <TextField
          onChange={(e) => setCreateFirstname(e.target.value)}
          required
          id="outlined-required"
          label="First Name"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreateLastname(e.target.value)}
          required
          id="outlined-required"
          label="Last Name"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreateUsername(e.target.value)}
          required
          id="outlined-required"
          label="Username"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreatePassword(e.target.value)}
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          onClick={handleSignup}
          type="submit"
          color="primary"
          variant="contained"
          // style={btnstyle}
          sx={{ 
            border: ".75px solid #36454F",
            color: '#BBD1D1',
            '&:hover': {
              backgroundColor: '#BBD1D1',
              color: '#F8F6F2',
              boxShadow: "none",
          },
            background: '#F8F6F2',
            textTransform: "none",
            boxShadow: "none",
            width: "92%",
            marginLeft: ".5rem",
            marginTop: ".5rem",
            paddingTop: ".75rem",
            paddingBottom: ".75rem",
            fontWeight: "bold",
            marginBottom: ".5rem",
            }}
        >
          {" "}
          create account
        </Button>
      </div>
    </Box>
  );
};

