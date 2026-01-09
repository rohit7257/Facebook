const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const USERS_FILE = "users.json";

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  if (users.find(u => u.username === username)) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
