import MovieItemComponent from './components/movieitem.vue'
import MovieListComponent from './components/movielist.vue'
import MovieEditComponent from './components/movieedit.vue'

export default [
    { path: '/', component: MovieListComponent },
    { path: '/edit/:id', component: MovieEditComponent }
  ];