module.exports = function(app) {
    const fs = require("fs");
    const filename = "src/node/movies.json";
    
    function loadAPIFile(){
        return fs.readFileSync(filename);
    }

    function loadAPIContent(){
        return JSON.parse(loadAPIFile());
    }

    // Récupération de tous les films
    app.route('/')
        .get(function(req, res) {
            res.json(loadAPIContent());
        }
    );

    // Récupération d'un film avec son id
    app.route('/movies/:id')
        .get(function(req, res) {
            res.json(loadAPIContent().movies.find(movie => movie.id == req.params.id));
        });

    // Modification d'un film avec son id
    app.route('/movies/:id/edit')
        .post(function(req, res) {
            var tempdata = loadAPIContent();
            movieIndex = tempdata.movies.indexOf(tempdata.movies.find(movie => movie.id == req.params.id));
            tempdata.movies.splice(movieIndex, 1, req.body.movie);
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
        }
    );

    // Suppression d'un film avec son id
    app.route('/movies/:id/delete')
        .post(function(req, res) {
            var tempdata = loadAPIContent();
            movieIndex = tempdata.movies.indexOf(tempdata.movies.find(movie => movie.id == req.params.id));
            tempdata.movies.splice(movieIndex, 1);
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send();
        }
    );

    // Creation d'un film d'un film
    app.route('/movies/create')
        .post(function(req, res) {
            var tempdata = loadAPIContent();
            let movie = req.body.movie;
            tempdata.movies.push(
                {
                    "id": movie.id?movie.id:null,
                    "title": movie.title?movie.title:"",
                    "year": movie.year?movie.year:"",
                    "language": movie.language?movie.language:"",
                    "director": {
                        "lastname": movie.director.lastname?movie.director.lastname:"",
                        "firstname": movie.director.firstname?movie.director.firstname:"",
                        "nationality": movie.director.nationality?movie.director.nationality:"",
                        "birthdate": movie.director.birthdate?movie.director.birthdate:""
                    },
                    "genre": movie.genre?movie.genre:""
                }
            );
            
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send();
        }
    );

}