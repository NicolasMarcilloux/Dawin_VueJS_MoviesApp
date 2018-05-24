<template>
    <p>
        Edit movie<br />

        Title : <input type="text" v-model="movie_to_edit.title" /><br />
        Year : <input type="text" v-model="movie_to_edit.year" /><br />
        Genre : <input type="text" v-model="movie_to_edit.genre"/><br />
        Language : <input type="text" v-model="movie_to_edit.language"/><br />
        Director :  <br/> 
            Last name : <input type="text" v-model="movie_to_edit.director.lastname" /><br />
            First name : <input type="text" v-model="movie_to_edit.director.firstname" /><br />
            Nationality : <input type="text" v-model="movie_to_edit.director.nationality" /><br />
            Birth Date : <input type="date" v-model="movie_to_edit.director.birthdate" /> (currently {{this.movie_to_edit.director.birthdate}})<br />

        <button v-on:click="save">Save</button>
        <button v-on:click="cancel">Cancel</button>
    </p>
</template>

<script>

export default {
    props: [ "movie" ],
     data() {
        return {
            movie_to_edit: this.$route.params
        }
    },
    created: function() {
        this.movie_to_edit = this.$route.params;
    },
    methods: {
        save: function() {
            this.$store.dispatch("editMovie", this.movie_to_edit);
            this.movie_to_edit = {};
            this.$router.push({ name: 'home' });
        },
        cancel: function() {
            this.$router.push({ name: 'home' });
        }
    }
}

</script>

<style>

</style>