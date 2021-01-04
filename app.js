const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");
const ExpressError = require("./utils/ExpressError");
mongoose.connect("mongodb://localhost:27017/notareDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Open Connection!");
});

const app = express();

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//Landing page
app.get("/", (req, res) => {
  res.send("Landing Page!");
});

//Note Routes
app.use("/notes", noteRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found :(", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong :(";
  res.status(statusCode).render("error", { err });
});

//Listening on port
app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
