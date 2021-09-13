//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["buy food", "cook food", "eat food"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    ListTitle: day,
    newlistitems: items
  });
});

app.post("/", function(req, res) {

  let item = req.body.newitem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  // console.log(item);
  items.push(item);
  res.redirect("/");

});

app.get("/work", function(req, res) {
  res.render("list", {
    ListTitle: "work List",
    newlistitems: workItems
  });
})

app.get("/about", function(req, res) {
  res.render("about");
});



app.listen(process.env.PORT ||3000, function() {
  console.log("Server started on port 3000.");
});
