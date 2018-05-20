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
        Synopsis : <textarea v-model="movie_to_add.synopsis"></textarea><br />
        Director :  <br/> 
            Last name : <input type="text" v-model="movie_to_add.director.lastname" /><br />
            First name : <input type="text" v-model="movie_to_add.director.firstname" /><br />
            Nationality : <input type="text" v-model="movie_to_add.director.nationality" /><br />
            Birth Date : <input type="date" v-model="movie_to_add.director.birthdate" /><br />
        <button v-on:click="add">Add</button>
    </p>
    Search : <input type="text" v-model="search" />

    <ul>
        <movie-item v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie" v-on:edit="edit" v-on:remove="remove(index)"></movie-item>
    </ul>

   
</div>
</template>

<script>
export default {
    data() {
        return {
            message: "Hello",
            movie_to_add: {},
            movie_to_edit: "",
            search: "",
        }
    },
    created: function() {
        this.$store.dispatch('loadMovies');
        var director = {};
        this.movie_to_add.director = director;
    },
    methods: {
        add: function() {
            this.$store.dispatch("addMovie", this.movie_to_add);
            this.movie_to_add = {}
            var director = {};
            this.movie_to_add.director = director;
        },
        edit: function() {
            // Edit
        },
        remove: function(index) {
            this.$store.commit('removeMovie', index);
        }
    },
    computed: {
        movies_search: function() {            
            return this.$store.state.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        },
    },
}
</script>

<style>
#msg {
  color: red;
}
</style>