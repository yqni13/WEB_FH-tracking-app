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
        { username: "tobi1", room: "BR_F7.04", date: "01.04.2021", begin: "08:00:00", end: "09:30:15", timeInSeconds:  5415},
        { username: "yqni13", room: "EDV_A5.10", date: "03.05.2021", begin: "08:00:00", end: "11:10:49", timeInSeconds: 11449},
        { username: "alf1", room: "Bro_F6.04", date: "04.05.2021", begin: "08:00:00", end: "11:45:12", timeInSeconds: 13512 },
        { username: "yqni13", room: "EDV_A2.06", date: "05.05.2021", begin: "09:40:00", end: "11:10:03", timeInSeconds: 5403 },
        { username: "yqni13", room: "EDV_A6.08", date: "06.05.2021", begin: "12:50:00", end: "14:19:07", timeInSeconds: 5347 },
        { username: "yqni13", room: "EDV_E0.11", date: "10.05.2021", begin: "16:00:00", end: "17:39:22", timeInSeconds: 5362 },
        { username: "yqni13", room: "EDV_F1.01", date: "12.05.2021", begin: "08:00:00", end: "11:10:49", timeInSeconds: 10849 },
        { username: "yqni13", room: "EDV_A6.08", date: "13.05.2021", begin: "12:50:00", end: "14:22:38", timeInSeconds: 5558 },
        { username: "yqni13", room: "EDV_E1.07", date: "17.05.2021", begin: "16:00:00", end: "17:44:31", timeInSeconds: 5671 },
        { username: "yqni13", room: "EDV_A2.06", date: "19.05.2021", begin: "09:40:00", end: "11:10:17", timeInSeconds: 5417 },
        { username: "yqni13", room: "HS_A3.14", date: "26.05.2021", begin: "09:40:00", end: "10:41:08", timeInSeconds: 3668 },
        { username: "yqni13", room: "HS_A1.04B", date: "27.05.2021", begin: "12:05:00", end: "13:10:56", timeInSeconds: 3959 },
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

    addNewTrackingData: function(username, roomData, dateData, beginData, endData, timeInSecondsData) {
        this.trackingRecords.push({username: username, room: roomData, date: dateData, begin: beginData, end: endData, timeInSeconds: timeInSecondsData});
    },

    getUserProfile: function(username) {
        // .findIndex-method looks for user -> only one user can be found
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
        let trackingData = [];
        let j = 0;

        // travers through trackingRecords Array because one user can have multiple data
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
        // new registered users with no tracked data will show placeholder instead
        if (trackingData.length == 0) {
            trackingData.push({
                roomData: "N/A",
                dateData: "N/A",
                startTimeData: "N/A",
                endTimeData: "N/A",
                timeInSecondsData: "N/A"
            });
        }
        return trackingData;        
    }
}
