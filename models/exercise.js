const mongoose = require("mongoose");
const compression = require("compression");
const Schema = mongoose.Schema;

//defines the type of information that will be put into mongodb
const ExerciseSchema = new Schema({
  day: {
    type: Date,
  },
  exercises: [
    {
        type: {
            type:String
        },
        name: {
            type:String
        },
        duration: {
            type:Number
        },
        weight: {
            type:Number
        },
        reps: {
            type:Number
        },
        sets: {
            type:Number
        },
        distance: {
            type:Number
        }
    }
  ]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;