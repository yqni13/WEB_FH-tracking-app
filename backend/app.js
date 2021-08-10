const { response } = require('express');
var express = require('express');
var app = express();
var cors = require('cors');
var { db } = require("../demo_InMemoryDB/db");
const { json } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));

app.post('/register', (req, res) => {
   if (db.register(req.body.username, req.body.firstname, req.body.lastname, req.body.email, req.body.password, "FH Technikum Wien", req.body.room, req.body.date, req.body.begin, req.body.end)) {
       res.status(200).json({
           message: "Registration successful with express"
       });
   } else {
       res.status(404).json({
           message: "Data for registration does already exist"
       });
   }
})

//POST route for login
app.post('/login', (req, res) => {
    
    const loginData = JSON.stringify(req.body);

    //login 
    credentials = db.login(req.body.username, req.body.password);
    //console.log(credentials);
    
    if (credentials != null) {
        res.status(200).json({
            message: 'Login from express.js',
            username: credentials.username,
            token: credentials.token
        });
    } else {
        res.status(401).json({
            message: 'login failed', 
        });
    }
});


app.post('/logout', (req, res) => {

    const logoutData = JSON.stringify(req.body);    

    //logout in db 
    if (db.deleteToken(req.body.token)) {
        res.status(200).json({
            message: 'logout'            
        });
    } else {
        res.status(400).json({
            message: 'logout failed'
        });
    }

    
});

app.post('/tracking', (req, res) => {

    const loginData = JSON.stringify(req.body);
    
    if (db.isAuthenticated(req.body.token)) {
        db.addNewTrackingData(req.body.username, req.body.room, req.body.date, req.body.begin, req.body.end);
        res.status(200).json({
            message: 'posted tracking data'            
        });
    } else {
        res.status(400).json({
            message: 'posting tracking data failed'
        });
    }
});

app.get('/overview', (req, res) => {

    if (db.isAuthenticated(req.query.token)) {
        var data = db.getUserProfile(req.query.username);
        var trackingData = db.getTrackingRecords(req.query.username);
        res.status(200).json({
            message: 'fetched user data',
            userProfileData: data,
            userTrackingData: trackingData,            
        });
    } else {
        res.status(400).json({
            message: 'get user data failed'
        });
    }    
});

module.exports = app;