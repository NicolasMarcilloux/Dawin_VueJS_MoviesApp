import Vue from 'vue' 
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        movies: [],
        INCREMENTED_ID: 0
    },
    actions: {
        loadMovies(context) {
            let url = 'http://localhost:3000/api/movies/all';
            axios.get(url).then((response) => {
                this.commit('updateMovies', response.data.movies);
            });
        },
        addMovie(context, movie) {
            let url = 'http://localhost:3000/api/movies';
            axios.post(url, { movie: movie }).then((response) => {
                this.dispatch('loadMovies');
            });
        }
    },
    mutations: {
        addMovie(state, movie) {
            state.movies.push(movie);
        },
        removeMovie(state, id) {
            state.movies.splice(id, 1);
        },
        updateMovies(state, movies){
            state.movies = movies;
        }
    }
});