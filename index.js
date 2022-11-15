const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const instagramGetUrl = require("instagram-url-direct");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", function (req, res) {
  res.json({ nama: "Susscess" });
});

app.get("/instagram", async (req, res) => {
  try {
    const url = req.query.url;
    let links = await instagramGetUrl(`${url}`);
    let data = {
      link: url,
      video: links,
    };
    res.json({ data });
    return res.send(data);
  } catch (error) {
    return res.status(500);
  }
});

app.get("/youtube", async (req, res) => {
  try {
    const url = req.query.url;
    const videoId = await ytdl.getURLVideoID(url);
    const metInfo = await ytdl.getInfo(url);

    let data = {
      url: `https://www.youtube.com/embed/${videoId}`,
      info: metInfo.videoDetails,
      link: metInfo.formats,
    };
    res.json({ data });
    return res.send(data);
  } catch (error) {
    return res.status(500);
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT);
