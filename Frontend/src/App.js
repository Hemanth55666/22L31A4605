import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [validity, setValidity] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [status, setStatus] = useState(null);

  const handleShorten = async () => {
    try {
      const res = await axios.post("http://localhost:5000/shorturls", {
        url,
        shortcode,
        validity: validity || 30,
      });

      setShortUrl(`http://localhost:5000/${res.data.shortcode}`);
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
      alert("Error shortening URL");
    }
  };

  const fetchStats = async () => {
    if (!shortUrl) return;
    const code = shortUrl.split("/").pop();
    try {
      const res = await axios.get(`http://localhost:5000/shorturls/${code}`);
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          URL Shortener
        </Typography>

        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Enter URL"
              variant="outlined"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              variant="outlined"
              value={shortcode}
              onChange={(e) => setShortcode(e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              type="number"
              label="Validity in minutes (default 30)"
              variant="outlined"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleShorten}
            >
              Shorten
            </Button>
          </Grid>
        </Grid>

        {shortUrl && status && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6">Shortened URL:</Typography>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>

              <Box mt={2}>
                <Typography variant="body1">
                  <b>Total Count:</b> {status.totalCount}
                </Typography>
                <Typography variant="body1">
                  <b>Expiry:</b> {new Date(status.expiry).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <b>Created At:</b> {new Date(status.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  <b>Details:</b> {status.details}
                </Typography>
              </Box>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={fetchStats}
                >
                  Refresh Stats
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default App;
