const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
     {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
     }
]
});

module.exports = Workout;