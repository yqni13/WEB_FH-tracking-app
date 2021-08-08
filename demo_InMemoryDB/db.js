/** in memory db */
const passwordHash = require('password-hash');
var randomToken = require('random-token');

module.exports.db = {

    users: [
        { username: "tobi1", firstname: "Tobias", lastname: "Meindl", email: "if20b125@technikum-wien.at", password: passwordHash.generate("12345678") },
        { username: "yqni13", firstname: "Lukas", lastname: "Varga", email: "if20b167@technikum-wien.at", password: passwordHash.generate("frameworks") }
    ],
    
    tokens: [],
    
    highscores: [ 
        { username: "tobi1", score: 71 },
        { username: "yqni13", score: 67 }
    ],
    
    register: function(userName, firstName, lastName, email, password, scoreData) {

        let user = this.users.find(u => u.username === userName);
        if(user != undefined){
            return false;
        }
        let emailAddress = this.users.find(u => u.email === email);
        if(emailAddress != undefined) {
            return false;
        }

        this.users.push({ username: userName, firstname: firstName, lastname: lastName, email: email, password: passwordHash.generate(password)});
        this.highscores.push({ username: userName, score: scoreData });
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
    addHighscore: function(username, score) {

        let index = this.highscores.findIndex(i => i.username === username);
        if(index != -1){
            if(this.highscores[index].score < score) {
                this.highscores[index].score = score
            }
        }else{
            this.highscores.push({ username: username, score: score });
        }
        
    },

    // get overview -> all tracking data regarding chosen user
    getUserProfile: function(username) {
        let indexScore = this.highscores.findIndex(i => i.username === username);
        let indexData = this.users.findIndex(i => i.username === username);
        return {
            nameData: this.users[indexData].username,
            emailData: this.users[indexData].email, 
            scoreData: this.highscores[indexScore].score
        };
    },
}
