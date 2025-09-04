import { Router } from 'express';
import Url from '../models/Url.js';


const router = Router();


router.get('/:code', async (req, res, next) => {
try {
const { code } = req.params;
const doc = await Url.findOne({ shortCode: code });
if (!doc) return res.status(404).json({ error: 'Not found' });


res.json({
  code: doc.shortCode,
  longUrl: doc.longUrl,
  visitCount: doc.visitCount,
  createdAt: doc.createdAt,
  expiresAt: doc.expiresAt,
  shortUrl: `${process.env.BASE_URL}/${doc.shortCode}`
});

} catch (e) {
next(e);
}
});


export default router;