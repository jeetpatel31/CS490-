const mongoose = require('mongoose');

const healthAndWellnessUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  workouts: [{
    date: String,
    bodyPart: String,
    title: String
}]
});

module.exports = mongoose.model('HealthAndWellnessUser', healthAndWellnessUserSchema);
