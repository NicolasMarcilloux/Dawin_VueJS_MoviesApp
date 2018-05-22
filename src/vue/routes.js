import MovieItemComponent from './components/movieitem.vue'
import MovieListComponent from './components/movielist.vue'
import MovieEditComponent from './components/movieedit.vue'

export default [
    { path: '/',
      name: 'home', 
      component: MovieListComponent },
    { path: '/edit/:id',
      name: 'edit', 
      component: MovieEditComponent 
    }
  ];