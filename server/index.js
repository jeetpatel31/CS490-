const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const HealthAndWellnessUserModel = require('./models/HealthAndWellnessUser')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/HealthAndWellnessUser");

app.post('/addWorkout', (req, res) => {
    console.log("Request body:", req.body);
    const { username, date, bodyPart, title } = req.body;

    HealthAndWellnessUserModel.findOneAndUpdate(
        { name: username }, // 'name' is the field in your schema
        { $push: { workouts: { date, bodyPart, title } } },
        { new: true }
    )
    .then(user => {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).send('Error updating workout: ' + err.message);
    });
});



app.post("/login", (req, res) => {
    const { email, password } = req.body;

    HealthAndWellnessUserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Sending success status with user's name
                    res.json({ success: true, message: "Success", name: user.name });
                } else {
                    // Sending error status when password is incorrect
                    res.json({ success: false, message: "The password is incorrect" });
                }
            } else {
                // Sending error status when email is not registered
                res.json({ success: false, message: "Email is not registered." });
            }
        })
        .catch(err => {
            // Sending error status in case of an exception
            console.error("Login error:", err);
            res.status(500).json({ success: false, message: "Internal server error" });
        });
});

app.post('/Register', (req, res) => {
    HealthAndWellnessUserModel.create(req.body)
    .then(HealthAndWellnessUser => res.json(HealthAndWellnessUser))
    .catch(err => res.json(err))

})

// Assuming you have the necessary setup for Express, Mongoose, and HealthAndWellnessUserModel

app.get('/getUserName', (req, res) => {
    HealthAndWellnessUserModel.findOne({}, 'name') // Adjust query according to your schema
        .then(user => {
            res.json({ name: user.name }); // Send user's name as JSON response
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

app.get('/getUserWorkouts', (req, res) => {
    const username = req.query.username; // Get the username from query parameters

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    HealthAndWellnessUserModel.findOne({ name: username }, 'workouts')
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user.workouts); // Send the workouts in the response
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal server error' });
        });
});



app.listen(3001, () => {
    console.log("Server is running")
})
