import axios from "axios";
import express from "express";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://bored-api.appbrewery.com/filter",
      {
        params: {
          type: req.body["type"],
          participants: req.body["participants"],
        },
      }
    );
    const result = response.data;
    // console.log(result[Math.floor(Math.random() * response.data.length)]);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * response.data.length)],
    });
  } catch (error) {
    if (error.response.status === 404) {
      res.render("index.ejs", {
        error: "No activities that match your criteria.",
      });
    } else {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  }
});
