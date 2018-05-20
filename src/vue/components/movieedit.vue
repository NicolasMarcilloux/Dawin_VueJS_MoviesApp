<template>
    <p>
        New movie<br />
        Title : <input type="text" v-model="movie_to_edit.title" /><br />
        Year : <input type="text" v-model="movie_to_edit.year" /><br />
        Synopsis : <textarea v-model="movie_to_edit.synopsis"></textarea><br />
        <button v-on:click="save">Save</button>
    </p>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {
        /*edit: function(movie) {
            this.movie_to_edit = movie
        },
        save: function() {
            this.movie_to_edit = null
        }*/
    },
    computed: {
        movie_to_edit: function() {
            for(var movie in this.$store.state.movies)
            {
                if(movie.id == this.$route.params.id)
                {
                    return movie;
                }
            }
        }
    }
}

</script>

<style>

</style>
