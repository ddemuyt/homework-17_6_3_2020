const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String
        },
        name: {
            type: String
        },
        distance: {
            type: Number
        },
        duration: {
            type: Number
        },
        weight: {
            type: Number
        },
        reps: {
            type: Number
        },
        sets: {
            type: Number
        }
    }]
}, {
    toJSON: {
        virtuals: true
    }
}
);

WorkoutSchema.virtual('totalDuration').get(function() {
    return this.exercises.reduce((acc, curr) => {
        return acc + curr.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;