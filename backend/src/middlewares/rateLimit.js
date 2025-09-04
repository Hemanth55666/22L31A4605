const buckets = new Map();


export default function rateLimit({ windowMs = 60_000, limit = 30 } = {}) {
return (req, res, next) => {
const key = req.ip;
const now = Date.now();
const bucket = buckets.get(key) || { count: 0, reset: now + windowMs };


if (now > bucket.reset) {
bucket.count = 0;
bucket.reset = now + windowMs;
}


bucket.count++;
buckets.set(key, bucket);


res.setHeader('X-RateLimit-Remaining', Math.max(0, limit - bucket.count));


if (bucket.count > limit) {
return res.status(429).json({ error: 'Too many requests. Try later.' });
}


next();
};
}