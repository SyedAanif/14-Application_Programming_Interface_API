import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4000;

const app = express();

// backend-server URL
const API_URL = "http://localhost:3000";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Frontend server started on port: ${PORT}`);
});

// first time load of blogs from backend server
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve blog posts." });
  }
});

// render new post form
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit: "Create Post" });
});

// create new post
app.post("/api/posts", async (req, res) => {
  try {
    await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating blog posts." });
  }
});

// Get a post to edit
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params["id"]}`);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get the post" });
  }
});

// Edit a post
app.post("/api/posts/:id", async (req, res) => {
  try {
    await axios.patch(`${API_URL}/posts/${req.params["id"]}`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post." });
  }
});

// Delete a post
app.get("/api/posts/delete/:id", async (req, res)=>{
    try {
        await axios.delete(`${API_URL}/posts/${req.params["id"]}`);
        res.redirect("/");
      } catch (error) {
        res.status(500).json({ message: "Failed to delete blog post." });
      }
})
