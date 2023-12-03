import axios from "axios";
import express from "express";

const PORT = 3000;

const API_URL = "https://secrets-api.appbrewery.com/";

// TODO: Fill the fields below
// Generate your crdentials from https://secrets-api.appbrewery.com/
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to retrieve data: ", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
      params: {
        page: 2,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to retrieve data: ", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "filter", {
      params: {
        apiKey: yourAPIKey,
        score: 5,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to retrieve data: ", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const ID = 42;
    const response = await axios.get(API_URL + `secrets/${ID}`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to retrieve data: ", error.message);
  }
});
