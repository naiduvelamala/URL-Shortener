const express = require("express");
const cors = require("cors");
const connectToDB = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB connected"));

app.use(cors());            // ✅ REQUIRED
app.use(express.json());    // ✅ REQUIRED

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const entry = await URL.findOneAndUpdate(
    { shortId: req.params.shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );

  if (!entry) return res.status(404).send("Not found");
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>
  console.log(`Server Started at PORT:${PORT}`)
);
