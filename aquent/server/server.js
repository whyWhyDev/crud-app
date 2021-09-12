/**
 * ************************************************************************
 *
 * @description IMPORTS AND SERVER SETUP
 *
 * ************************************************************************
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
const PORT = 3000;

// parses incoming request bodies
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * ************************************************************************
 *
 * @description BOILERPLATE ROUTES/MIDDLEWARE
 *
 * ************************************************************************
 */

const companyRouter = require('./routes/companyRoutes');
const contactRouter = require('./routes/contactRoutes');

/**
 * handle requests for static files
 */
app.use("/build", express.static(path.join(__dirname, "../build")));

// serves index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.use('/contact', contactRouter);
app.use('/company', companyRouter);
/**
 * define route handlers
 */



// app.get("/contacts", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// app.get("/companies", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// catch-all route handler for requests to unknown routes
app.use((req, res) => res.redirect("/"));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log("Error message: ", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.export = app;
