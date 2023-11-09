const cors = require("cors");
const express = require("express");
const app = express();
// const translate = require("google-translate-api");
const translate = require("@iamtraction/google-translate");

app.use(cors());
app.get("/", function (req, res) {
  res.send("API running ...");
});

app.get("/api/translator", async function (req, res) {
  const keywords = req.query.keywords;
  const input = req.query.input;
  const output = req.query.output;
  if (keywords && input && output) {
    try {
      const result = await translate(keywords, { from: "vi", to: "en" });
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
});

app.listen(3000, function () {
  console.log("success");
});
