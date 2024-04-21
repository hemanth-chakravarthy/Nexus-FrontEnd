const express = require("express");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("landingPage");
});
app.get('/landingPage', (req, res) => {
  res.render('landingPage');
});
app.get('/login', (req, res) => {
    res.render('loginPage');
});
app.get('/postPage', (req, res) => {
  res.render('postPage');
});
app.get('/studentHomePage', (req, res) => {
    res.render('studentHomePage');
});
app.get('/searchPage', (req, res) => {
    res.render('searchPage');
});
app.get('/hirePage', (req, res) => {
  res.render('hirePage');
});
app.get('/messagePage', (req, res) => {
  res.render('messagePage');
});
app.get('/notificationPage', (req, res) => {
    res.render('notificationPage');
});
app.get('/collabPage', (req, res) => {
    res.render('collabPage');
});
app.get('/profilePage', (req, res) => {
    res.render('profilePage');
});



app.post("/signup", async (req, res) => {
  try {
    const data = {
      Full_Name: req.body.fullname,
      Phone_number: req.body.phno,
      mail_id: req.body.gmail,
      password: req.body.password1,
    };

    const existingUser = await collection.findOne({ mail_id: data.mail_id });

    if (existingUser) {
      return res.send('<script>alert("User already exists");</script>')
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    await collection.create(data);
    res.redirect("/login"); // Redirect to login page after successful signup
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ mail_id: req.body.email });

    if (!user) {
      return res.send('<script>alert("Wrong username/password");</script>');
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.send('<script>alert("Wrong username/password");</script>');
    }

    res.render("studentHomePage"); // Redirect to home page after successful login
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on Port : ${port}`);
});
