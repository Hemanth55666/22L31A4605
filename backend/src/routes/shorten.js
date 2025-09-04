import { Router } from 'express';
import Url from '../models/Url.js';
import { isValidHttpUrl } from '../utils/validators.js';
import { generateCode } from '../utils/codeGen.js';


const router = Router();

router.post('/shorten', async (req, res, next) => {
  try {
    const { longUrl, customCode, expireIn } = req.body || {};

    if (!longUrl || !isValidHttpUrl(longUrl)) {
      return res.status(400).json({ error: 'Provide a valid http/https longUrl' });
    }

    let shortCode = customCode?.trim();

    if (shortCode) {
      if (!/^[a-zA-Z0-9_-]{3,32}$/.test(shortCode)) {
        return res.status(400).json({ error: 'customCode must be 3-32 chars: a-z, A-Z, 0-9, _ or -' });
      }

      const exists = await Url.findOne({ shortCode });
      if (exists) return res.status(409).json({ error: 'customCode already in use' });
    } else {
      const len = Number(process.env.CODE_LENGTH) || 7;
      for (let i = 0; i < 5; i++) {
        shortCode = generateCode(len);
        const exists = await Url.findOne({ shortCode });
        if (!exists) break;
        if (i === 4) return res.status(500).json({ error: 'Could not generate a unique code, try again' });
      }
    }

    const expiresAt = expireIn ? new Date(Date.now() + expireIn * 1000) : new Date(Date.now() + 7*24*60*60*1000);

    const doc = await Url.create({ shortCode, longUrl, expiresAt });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortCode}`,
      code: shortCode,
      longUrl: doc.longUrl,
      createdAt: doc.createdAt,
      expiresAt: doc.expiresAt
    });
  } catch (e) {
    next(e);
  }
});


router.get('/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const doc = await Url.findOne({ shortCode: code });

    if (!doc) return res.status(404).json({ error: 'Short URL not found' });

    if (doc.expiresAt && doc.expiresAt < new Date()) {
      return res.status(410).json({ error: 'This short URL has expired' }); 
    }
    doc.visitCount++;
    await doc.save();

    res.redirect(302, doc.longUrl);
  } catch (e) {
    next(e);
  }
});

export default router;