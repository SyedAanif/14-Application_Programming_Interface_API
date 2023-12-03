import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;

const app = express();

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// retrieve all posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// get a specific post
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params["id"]);
  const post = posts.find((post) => post.id === id);
  res.status(200).json(post);
});

// create a post
app.post("/posts", (req, res) => {
  const post = {
    id: posts.length + 1,
    title: req.body["title"],
    content: req.body["content"],
    author: req.body["author"],
    date: new Date(),
  };
  posts.push(post);
  res.status(201).json(post);
});

// update a post
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params["id"]);
  const index = posts.findIndex((post) => post.id === id);
  const replacementPost = {
    id: id,
    title: req.body["title"],
    author: req.body["author"],
    content: req.body["content"],
    date: posts[index].date,
  };
  posts[index] = replacementPost;
  res.status(200).json(replacementPost);
});

// delete a post
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex(
    (post) => post.id === parseInt(req.params["id"])
  );
  posts.splice(index, 1);
  res.status(200).json({ message: "Post Deleted." });
});

app.listen(PORT, () => {
  console.log(`Backend server started on port: ${PORT}`);
});
