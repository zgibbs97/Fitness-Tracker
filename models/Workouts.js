const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            name: {
                type: String,
                trim: true,
                // required: "Enter exrcise name."
            },
            type: {
                type: String,
                trim: true,
                // required: "Enter type of exercise (ie. cardio, cycling)."
            },
            weight: {
                type: Number,
            },
            sets: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            duration: {
                type: Number,

                // required: "Duration is required."
            },
            distance: {
                type: Number,
            },

            totalDuration: {
                type: Number,
            }
        },
    ]
}, { toJSON: { virtuals: true } });


// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;