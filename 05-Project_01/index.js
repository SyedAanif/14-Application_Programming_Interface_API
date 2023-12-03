import axios from "axios";
import express from "express";

const PORT = 3000;

const app = express();

const API_URL = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.render("index.ejs", {
      user: response.data["username"],
      secret: response.data["secret"],
    });
  } catch (error) {
    console.log("Failed to retrieve a secret: ", error.message);
    res.status(500); // Server side error
  }
});
