const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors"); /* CORS is a node.js package for providing a Connect/Express middleware that can be used to */
const mongoose = require("mongoose");
const DbConnection = require("./DataAccess/DbConnection");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const PORT = (process.env.PORT || 3000);
app.use(cors());

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

let Job = require("./DataAccess/JobSchema.model");
let User = require("./DataAccess/UserSchema.model");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

/****** Helper functions *****/
//
const Authentication = function(req, res, next) {
    const token =
        req.headers['x-access-token'];

    if (!token) {
        res.send('Unauthorized: No token provided');
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.send('Unauthorized: Invalid token');
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
};


/****** Routes *****/
app.get("/api/jobs", (req, res) => {
    Job.find((err, Job) => {
        res.json(Job);
    });
});
app.get("/api/filteredjobs", (req, res) => {
    Job.find({job_area: req.query.area, job_category: req.query.categ},(err, Job) => {
        res.json(Job);
    });
});

app.post('/api/registerjob', Authentication, function(req, res) {
    console.log(req.body);
    const { job_title, job_description, job_area, job_category } = req.body;
    const job = new Job({ job_title, job_description, job_area, job_category });
    job.save(res.send());
});

//invisible command for registration
// app.post('/api/register', function(req, res) {
//     const { username, password } = req.body;
//     const user = new User({ username, password });
//     user.save(res.send());
//     });

app.get('/api/loginpage', Authentication, function(req, res) {
    res.send('Success, please post your AD!');
});

app.post('/api/authenticate', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        let msg = "Username or password missing!";
        console.error(msg);
        res.status(401).json({msg: msg});
        return;
    }
    User.findOne({ username }, function(err, user) {
        if (user) {
            user.checkpassword(password, (err, result) => {
                if (result) {
                    const payload = {
                        username: username,
                        admin: false
                    };
                    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                    res.json({
                        msg: 'User authenticated successfully',
                        token: token
                    });
                }
                else res.status(401).json({msg: "Password mismatch!"})
            });
        } else {
            res.status(404).json({msg: "User not found!"});
        }
    })
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/', 'index.html'));
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
