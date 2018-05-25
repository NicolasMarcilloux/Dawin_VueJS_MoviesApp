const express = require('express')
const bodyParser = require('body-parser');



const app = express()

app.use(bodyParser.json({limit: '500mb'})); 
app.use(bodyParser.urlencoded({limit: '500mb'}));
app.use( (req, res, next) => {
    console.log('url : ' + req.originalUrl);
    console.log('body : ' + req.body);
    console.log('method : ' + req.method);
    console.log('-------------------------------');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



// Mise en place du routage
var routes = require('./routes')(app); 

// Lancement du serveur
app.listen(3000, () => console.log("Project's movies API is listening on port 3000!"))


