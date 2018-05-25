module.exports = function(app) {
    const fs = require("fs");
    const filename = "src/node/movies.json";
    const directory = "src/node/posters/";
    var IMAGE_ID = 0;
    
    function loadAPIFile(){
        return fs.readFileSync(filename);
    }

    function loadAPIContent(){
        return JSON.parse(loadAPIFile());
    }

    function base64_encode(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
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
                    "genre": movie.genre?movie.genre:"",
                    "rate": null,
                    "poster": null
                }
            );
            
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send();
        }
    );

    // Upload d'un poster
    app.route('/movies/:id/poster')
        .post(function (req, res, next) {
            let moviesData = loadAPIContent();
            let movie = moviesData.movies.find(movie => movie.id == req.params.id)
            let movieIndex = moviesData.movies.indexOf(movie);

            let poster = req.body.poster;
            let img = poster.dataURL;
            let extension = poster.upload.filename.split('.')[1];
            let postername = directory + IMAGE_ID + "." + extension;

            if (!fs.existsSync(directory)){
                fs.mkdirSync(directory);
            }

            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buffer = new Buffer(data, 'base64');
            fs.writeFileSync(postername, buffer);

            movie.poster = postername;

            moviesData.movies.splice(movieIndex, 1, movie);
            fs.writeFileSync(filename, JSON.stringify(moviesData, null, 4));

            IMAGE_ID++;


      }
    );
}