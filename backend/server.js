import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';


import shortenRouter from './src/routes/shorten.js';
import statsRouter from './src/routes/stats.js';
import Url from './src/models/Url.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));


// API routes
app.use('/', shortenRouter); // POST /shorten, GET /:code (redirect)
app.use('/stats', statsRouter); // GET /stats/:code


// Global error handler
app.use((err, req, res, next) => {
console.error(err);
const status = err.status || 500;
res.status(status).json({ error: err.message || 'Internal Server Error' });
});


// Start
async function start() {
try {
await mongoose.connect(process.env.MONGODB_URI);
console.log('✅ MongoDB connected');


app.listen(PORT, () => {
console.log(`🚀 URL Shortener running at ${process.env.BASE_URL || 'http://localhost:' + PORT}`);
});
} catch (e) {
console.error('MongoDB connection error:', e.message);
process.exit(1);
}
}


start();