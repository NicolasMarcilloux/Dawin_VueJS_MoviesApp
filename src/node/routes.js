module.exports = function(app) {
    const fs = require("fs");
    const filename = "movies.json";
    
    function loadAPIFile(){
        return fs.readFileSync(filename);
    }

    function loadAPIContent(){
        return JSON.parse(loadAPIFile());
    }

    app.route('/api/movies/all')
        .get(function(req, res) {
            res.json(loadAPIContent());
        }
    );

    app.route('/api/movies/:id')
        .get(function(req, res) {
            res.json(loadAPIContent().movies[req.params.id])
        })
        .post(function(req, res) {
            var tempdata = loadAPIContent();
            tempdata.movies[req.params.id].titre = "test";

            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send('TODO : met à jour le film avec l’identifiant id')
        }
    );

    app.route('/api/movies')
        .post(function(req, res) {
            var tempdata = loadAPIContent();
            let movie = req.body.movie;
            tempdata.movies.push(
                {
                    "title": movie.title?movie.title:"",
                    "year": movie.year?movie.year:"",
                    "language": movie.language?movie.language:"",
                    "genre": movie.genre?movie.genre:"",
                    "synopsis": movie.synopsis?movie.synopsis:"",
                    "director": {
                        "lastname": movie.director.lastname?movie.director.lastname:"",
                        "firstname": movie.director.firstname?movie.director.firstname:"",
                        "nationality": movie.director.nationality?movie.director.nationality:"",
                        "birthdate": movie.director.birthdate?movie.director.birthdate:""
                    },
                    
                }
            );
            
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send();
        }
    );

}