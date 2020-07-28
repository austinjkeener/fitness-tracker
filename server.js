// activity 15 is a good reference if i get stuck. right now my server works, but it does not redirect properly to a followup page. reference the grading ruburic for how to use each dependence and for a good overview of how to setup the application.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Recoverable } = require("repl");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Left to do...
//1. Set up an api workout to see the stats. api/workout/range (this will be a get route)
//2. I need to create routes that allow me to create a new workout. Use app.post instead of app.put 

//updating the existing document within the workout database
app.put("/api/workouts/:id", (req,res) => {
  console.log(req.params.id);
//this will add a new exercise into my existing array
db.Workout.findOneAndUpdate({ _id: req.params.id }, 
{ $push: { exercises: req.body}}, { new: true })
.then(dbWorkout => {
    res.json(dbWorkout)
})
})
//sending the html file so that the client can see it
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
});
//sending the html file so that the client can see it
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'))
});
//this is finding information within the database because it is an api route and then is sending the information
// back to the front end.
app.get("/api/workouts", (req, res) => {
  console.log(db.Workout)
 db.Workout.find({}).then(dbWorkout => {
   console.log(dbWorkout);
   //sends back an array of objects response
   res.json(dbWorkout);
 })
});

//adding new exercises
// app.post("/", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
