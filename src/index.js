const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("tiny"));
const db = require("./database");
console.log("DB==CONEXION===>", db.connection);
// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost:27017/tut-mosh")
//   .then(() => console.log("DB connection is sucessful"));

const courses = require("./db.json");

app.get("/", (req, res) => {
  res.write("Hello dear friends");
  res.end();
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
  res.end();
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((key) => key.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Not found in getBy Id");
  res.send(course);
  res.end();
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
  console.log("Course", course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((key) => key.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Not found for put");

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //update course
  course.name = req.body.name;
  //return the updated course to the client
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((key) => key.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Not found for delete");

  let index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
};

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening for requests on port ${port}`);
});
