import Vue from 'vue' 
import Vuex from 'vuex'
import axios from 'axios';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        movies: [],
        selected_movie: {},
        next_id: 0
    },
    actions: {
        getMoviesFromAPI(context) {
            let url = 'http://localhost:3000/';
            axios.get(url).then((response) => {
                if(response.data.movies.length > 0)
                    this.state.next_id = response.data.movies.slice(-1)[0].id + 1;
                else
                    this.state.next_id = 0;
                this.commit('updateMovies', response.data.movies);
            });
        },
        getMovie(context, id) {
            let url = 'http://localhost:3000/movies/' + id;
            axios.get(url).then((response) => {
                this.commit('selectMovie', response.data);
            });
        },
        addMovie(context, movie) {
            let url = 'http://localhost:3000/movies/create';
            axios.post(url, { movie: movie }).then((response) => {
                this.state.next_id++;
                this.dispatch('getMoviesFromAPI');
            });
        },
        editMovie(context, movie) {
            let url = 'http://localhost:3000/movies/' + movie.id + '/edit';
            axios.post(url, { movie: movie }).then((response) => {
                this.dispatch('getMoviesFromAPI');
            });
        },
        deleteMovie(context, id) {
            let url = 'http://localhost:3000/movies/' + id + '/delete';
            axios.post(url).then((response) => {
                this.dispatch('getMoviesFromAPI');
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
        },
        selectMovie(state, movie){
            state.selected_movie = movie;
        }
    }
});