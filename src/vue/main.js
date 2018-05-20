import Vue from 'vue' //librairie "vue" dans node_modules
import VueRouter from 'vue-router'
import app from './app.vue' //fichier app.vue local
import myStore from './store'
import routes from './routes.js';
import MovieItemComponent from './components/movieitem.vue'

Vue.component('movie-item', MovieItemComponent);
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store: myStore
});