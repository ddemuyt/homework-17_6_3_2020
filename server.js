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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
//    .populate("Workouts")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });



  app.get("/", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


  // May need to change { body } because of req.params.id
app.post("/api/workouts/:id", ({ body }, res) => {
  db.Workout.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { Workouts: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });