<template>
<div>
    <span id="msg">{{message}}</span>

    <p>Movie number : {{this.$store.state.movies.length}}</p>
    <p>
        New movie<br />
        Title : <input type="text" v-model="movie_to_add.title" /><br />
        Year : <input type="text" v-model="movie_to_add.year" /><br />
        Genre : <input type="text" v-model="movie_to_add.genre"/><br />
        Language : <input type="text" v-model="movie_to_add.language"/><br />
        Director :  <br/> 
            Last name : <input type="text" v-model="movie_to_add.director.lastname" /><br />
            First name : <input type="text" v-model="movie_to_add.director.firstname" /><br />
            Nationality : <input type="text" v-model="movie_to_add.director.nationality" /><br />
            Birth Date : <input type="date" v-model="movie_to_add.director.birthdate" /><br />
        <button v-on:click="add">Add</button>
    </p>
    Search : <input type="text" v-model="search" />

    <ul>
        <movie-item v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie" v-on:remove="remove(index)"></movie-item>
    </ul>

    <button v-on:click="getMovie">TEST GET BY ID</button>

   
</div>
</template>

<script>
export default {
    data() {
        return {
            message: "Hello",
            movie_to_add: {},
            search: "",
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
        remove: function(index) {
            this.$store.commit('removeMovie', index);
        },
        getMovie(){
            this.$store.dispatch("getMovie", 2);
        },
        deleteMovie(){
            this.$store.dispatch("deleteMovie", 2);
        },
         
    },
    computed: {
        /**
         * Désolé je sais que c'est abominable mais au moins ça marche
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

<style>
#msg {
  color: red;
}
</style>