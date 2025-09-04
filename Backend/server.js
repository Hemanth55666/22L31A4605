const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const urls = {};

app.post('/shorturls', (req, res) => {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const code = shortcode || Math.random().toString(36).substring(2, 8);
    const expiry = new Date(Date.now() + validity * 60000); 

    urls[code] = {
        url,
        expiry,
        clicks: 0,
        createdAt: new Date(),
        clickDetails: []
    };

    res.status(201).json({
        shortLink: `http://localhost:5000/${code}`,
        expiry
    });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;
    const entry = urls[code];

    if (!entry) {
        return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date() > new Date(entry.expiry)) {
        return res.status(410).json({ error: "Link expired" });
    }

    entry.clicks += 1;
    entry.clickDetails.push({
        timestamp: new Date(),
        referrer: req.get('Referer') || 'direct',
        ip: req.ip
    });

    res.redirect(entry.url);
});

app.get('/shorturls/:code', (req, res) => {
    const { code } = req.params;
    const entry = urls[code];

    if (!entry) {
        return res.status(404).json({ error: "Shortcode not found" });
    }

    res.json({
        originalUrl: entry.url,
        expiry: entry.expiry,
        createdAt: entry.createdAt,
        totalClicks: entry.clicks,
        clickDetails: entry.clickDetails
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

