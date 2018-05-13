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
            tempdata.movies.push(
                {
                    "titre": "Le destructeur",
                    "année_sortie": "2019",
                    "langue": "anglais",
                    "réalisateur": {
                        "nom": "Marcilloux",
                        "prénom": "Nicolas",
                        "nationalité": "français",
                        "date_de_naissance": "12/03/1997"
                    },
                    "genre": "Super-Heros"
                }
            );
            fs.writeFileSync(filename, JSON.stringify(tempdata, null, 4));
            res.send('TODO : créé un nouveau film')
        }
    );

}