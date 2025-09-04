import React, { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import axios from "axios";

const UrlForm = ({ onShorten }) => {
  const [url, setUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [shortcode, setShortcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/shorturls", {
        url,
        expiry,
        shortcode
      });
      onShorten(res.data);
      setUrl("");
      setExpiry("");
      setShortcode("");
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Long URL"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Expiry (minutes)"
              fullWidth
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Preferred Shortcode"
              fullWidth
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Shorten URL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UrlForm;
