/** in memory db */
const passwordHash = require('password-hash');
var randomToken = require('random-token');
const { start } = require('repl');

module.exports.db = {

    users: [
        { username: "tobi1", firstname: "Tobias", lastname: "Meindl", email: "if20b125@technikum-wien.at", password: passwordHash.generate("12345678"), university: "FH Technikum Wien" },
        { username: "yqni13", firstname: "Lukas", lastname: "Varga", email: "if20b167@technikum-wien.at", password: passwordHash.generate("frameworks"), university: "FH Technikum Wien" },
        { username: "alf1", firstname: "Alf", lastname: "Müller", email: "alf@demo.at", password: passwordHash.generate("alphacutie"), university: "FH Technikum Wien" }
    ],
    
    tokens: [],
    
    trackingRecords: [ 
        { username: "tobi1", room: "A0.0", date: "01.04.2021", begin: "08:00:00", end: "09:30:00", timeInSeconds:  5400},
        { username: "yqni13", room: "A2.09", date: "03.05.2021", begin: "08:00:00", end: "11:10:00", timeInSeconds: 11400},
        { username: "yqni13", room: "A3.01", date: "06.05.2021", begin: "09:40:00", end: "11:10:00", timeInSeconds: 5400 }
    ],
    
    register: function(userName, firstName, lastName, email, password) {

        let user = this.users.find(u => u.username === userName);
        if(user != undefined){
            return false;
        }
        let emailAddress = this.users.find(u => u.email === email);
        if(emailAddress != undefined) {
            return false;
        }

        this.users.push({ username: userName, firstname: firstName, lastname: lastName, email: email, password: passwordHash.generate(password), university: "FH Technikum Wien"});
        return true;
    },

    login: function(username, password) {
        let user = this.users.find(u => u.username === username);
        if (user != undefined && passwordHash.verify(password, user.password)) {        
            let credentials = {
                token: randomToken(64),
                username: user.username
            }
    
            this.tokens.push(credentials);
            return credentials;
        } 

        return null;    
    },

    deleteToken(authToken)  {
        this.tokens = this.tokens.filter(e => e.token != authToken);
        return true;
    },

    isAuthenticated: function(authToken) {
        //console.log(this.tokens);
        return this.tokens.find(auth => auth.token == authToken) != undefined;
    },

    getAuthUser: function(authToken) {
        return this.tokens.find(auth => auth.token == authToken);
    },    

    // add new tracked data
    addNewTrackingData: function(username, roomData, dateData, beginData, endData, timeInSecondsData) {
        this.trackingRecords.push({username: username, room: roomData, date: dateData, begin: beginData, end: endData, timeInSeconds: timeInSecondsData});
    },

    // get overview -> all tracking data regarding chosen user
    getUserProfile: function(username) {
        let indexData = this.users.findIndex(i => i.username === username);
        return {
            nameData: this.users[indexData].username,
            firstnameData: this.users[indexData].firstname,
            lastnameData: this.users[indexData].lastname,
            emailData: this.users[indexData].email,
            universityData: this.users[indexData].university
        };
    },

    getTrackingRecords: function(username) {
        //let indexTracking = this.trackingRecords.findIndex(i => i.username === username);
        let trackingData = [];
        let j = 0;
        for(let i = 0; i < this.trackingRecords.length; ++i) {     
            if (this.trackingRecords[i].username === username) {
                trackingData.push({
                    roomData: this.trackingRecords[i].room,
                    dateData: this.trackingRecords[i].date,
                    startTimeData: this.trackingRecords[i].begin,
                    endTimeData: this.trackingRecords[i].end,
                    timeInSecondsData: this.trackingRecords[i].timeInSeconds
                });                
            }
        }
        if (trackingData.length == 0) {
            trackingData.push({
                roomData: "N/A",
                dateData: "N/A",
                startTimeData: "N/A",
                endTimeData: "N/A",
                timeInSecondsData: "N/A"
            })
        }
        return trackingData;        
    }
}
