const express = require('express')
const bodyParser = require('body-parser');
var fs = require("fs");
const app = express()

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded())
app.use( (req, res, next) => {
    // TODO : Vérification ?
    next();
});

// Mise en place du routage
var routes = require('./routes')(app); 

// Lancement du serveur
app.listen(3000, () => console.log("Project's movies API is listening on port 3000!"))


