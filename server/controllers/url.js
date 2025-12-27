const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  // ✅ SAFETY CHECK
  if (!req.body) {
    return res.status(400).json({ error: "Request body missing" });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = shortid.generate(); // ✅ correct usage

  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });

  return res.json({
    shortUrl: `http://localhost:8001/${shortID}`,
  });
}

module.exports = { handleGenerateShortUrl };
