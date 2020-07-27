
// activity 15 is a good reference if i get stuck. right now my server works, but it does not redirect properly to a followup page. reference the grading ruburic for how to use each dependence and for a good overview of how to setup the application.

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

app.get("/", (req, res) => {

  db.exercise.find({})
    .then(dbexercise => {
      res.json(dbexercise);

  db.Note.find({})
    .then(dbNote => {
      res.json(dbNote);

    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/exercise", (req, res) => {
  db.Exercise.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/stats", (req, res) => {
  db.Stats.find({})
    .then(dbStats => {
      res.json(dbStats);
    })
    .catch(err => {
      res.json(err);
    });
});

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
