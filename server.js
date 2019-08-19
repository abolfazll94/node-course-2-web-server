const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server');
    }
  });
  next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  // res.send("hello world");
  // res.send({
  //   name: "abolfazl",
  //   likes: ["running", "programming"]
  // });
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to home page",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page",
  });
});

app.get("/projects", (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'projects'
  })
});


app.get("/bad", (req, res) => {
  res.send({
    errormessage: "Sorry unable to handle request"
  });
});

app.listen(port, () => {
  console.log(`server is up on port: ${port}`);
});