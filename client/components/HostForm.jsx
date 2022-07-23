import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom"; // useHistory, Redirect
import "../styles.scss";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function HostForm() {
  const [createAddress, setCreateAddress] = useState("");
  const [createPrice, setCreatePrice] = useState(0);
  const [createSize, setCreateSize] = useState(0);
  const [createOptions, setCreateOptions] = useState("");

  const [locationCreated, setLocation] = useState(false);

  const history = useHistory();

  const handleHost = (e) => {
    const address = createAddress;
    const price = createPrice;
    const options = createOptions;
    const size = createSize;

    e.preventDefault();
    console.log("handleHost post called");

    axios
      .post(
        "/api/location",
        {
          address: address,
          price: price,
          options: options,
          size: size,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        console.log("response from axios:", res);
        if (res.status === 200) {
          alert("Location saved");
          history.push({
            pathname: "/dashboard",
            data: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // if (setLocation) {
  //   setTimeout(() => {
  //     history.push({
  //       pathname: "/dashboard",
  //       data: res.data});
  //   }, 0);
  // }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          onChange={(e) => setCreateAddress(e.target.value)}
          required
          id="outlined-required"
          label="Address"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreatePrice(e.target.value)}
          required
          id="outlined-required"
          label="Price"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreateOptions(e.target.value)}
          required
          id="outlined-required"
          label="Options"
          defaultValue=""
        />
        <TextField
          onChange={(e) => setCreateSize(e.target.value)}
          required
          id="outlined-input"
          label="Size"
        />
        <Button
          onClick={handleHost}
          type="submit"
          color="primary"
          variant="contained"
          // style={btnstyle}
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
            width: "74%",
            marginBottom: ".5rem",
            marginLeft: ".2rem",
            paddingTop: ".75rem",
            paddingBottom: ".75rem",
            fontWeight: "bold",
          }}
        >
          Submit Form
        </Button>
      </div>
    </Box>
  );
}
