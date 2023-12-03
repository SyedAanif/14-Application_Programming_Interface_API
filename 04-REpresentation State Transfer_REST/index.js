import axios from "axios";
import express from "express";

const PORT = 3000;

const app = express();

const API_URL = "https://secrets-api.appbrewery.com/secrets";

// NOTE:: Generate auth-token from seeing documentation on https://secrets-api.appbrewery.com
const yourBearerToken = "";

const config = {
  headers: {
    Authorization: `Bearer ${yourBearerToken}`,
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

// Each form action

app.post("/get-secret", async (req, res) => {
  const searchId = req.body["id"];
  try {
    const result = await axios.get(API_URL + `/${searchId}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const data = {
    secret: req.body["secret"],
    score: req.body["score"],
  };
  try {
    const result = await axios.post(API_URL, data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body["id"];
  const data = {
    secret: req.body["secret"],
    score: req.body["score"],
  };
  try {
    const result = await axios.put(API_URL + `/${searchId}`, data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body["id"];
  const data = {
    secret: req.body["secret"],
    score: req.body["score"],
  };
  try {
    const result = await axios.patch(API_URL + `/${searchId}`, data, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body["id"];
  try {
    const result = await axios.delete(API_URL + `/${searchId}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});
