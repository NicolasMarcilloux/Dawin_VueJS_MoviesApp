<template>
<div>
    <div class="row">
        <div class="col-sm-6">
            <h3>New movie</h3>
            <p>Movie number : {{this.$store.state.movies.length}}</p>

            <form>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" v-model="movie_to_add.title" class="form-control" id="title" placeholder="Enter Title">
                </div>
                <div class="form-group">
                    <label for="year">Year</label>
                    <input type="text" v-model="movie_to_add.year" class="form-control" id="year" placeholder="Enter Year">
                </div>
                <div class="form-group">
                    <label for="genre">Genre</label>
                    <input type="text" v-model="movie_to_add.genre" class="form-control" id="genre" placeholder="Enter Genre">
                </div>
                <div class="form-group">
                    <label for="language">Language</label>
                    <input type="text" v-model="movie_to_add.language" class="form-control" id="language" placeholder="Enter Language">
                </div>

                <hr>
                <h4>Director</h4>

                <div class="form-group">
                    <label for="lastname">Last Name</label>
                    <input type="text" v-model="movie_to_add.director.lastname" class="form-control" id="lastname" placeholder="Enter Last Name">
                </div>
                <div class="form-group">
                    <label for="firstname">First Name</label>
                    <input type="text" v-model="movie_to_add.director.firstname" class="form-control" id="firstname" placeholder="Enter First Name">
                </div>
                <div class="form-group">
                    <label for="nationality">Nationality</label>
                    <input type="text" v-model="movie_to_add.director.nationality" class="form-control" id="nationality" placeholder="Enter Nationality">
                </div>
                <div class="form-group">
                    <label for="birthdate">Birthdate</label>
                    <input type="date" v-model="movie_to_add.director.birthdate" class="form-control" id="birthdate" placeholder="Enter Birthdate">
                </div>
                
                <button v-on:click="add" type="submit" class="btn btn-primary">Add</button>
            </form>

        </div>

        <div class="col-sm-6">
                <input type="text" v-model="search" placeholder="Search movies..." class="form-control" /><br/><br/>
                <ul class="row">
                    <movie-item v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie" v-on:remove="remove(index)"></movie-item>
                </ul>
        </div>
    </div>
    

</div>
</template>






<script>

export default {
    data() {
        return {
            message: "Hello",
            movie_to_add: {},
            search: ""
        }
    },
    created: function() {
        this.$store.dispatch('getMoviesFromAPI');
        var director = {};
        this.movie_to_add.director = director;
    },
    methods: {
        add: function() {
            this.movie_to_add.id = this.$store.state.next_id;
            this.$store.dispatch("addMovie", this.movie_to_add);
            this.movie_to_add = {}
            var director = {};
            this.movie_to_add.director = director;
        },
    },
    computed: {
        /**
         * Désolé je sais que c'est abominable mais au moins ça marche (et j'ai pas trouvé d'alternatives)
         */
        movies_search: function() {
            var movies = [];

            movies.push(...this.$store.state.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.year.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.language.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.genre.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.director.firstname.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.director.lastname.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.director.nationality.toLowerCase().indexOf(this.search.toLowerCase())!=-1));
            movies.push(...this.$store.state.movies.filter(m => m.director.birthdate.toLowerCase().indexOf(this.search.toLowerCase())!=-1));

            return [...new Set(movies)];
        }
    }
}

</script>

