<template>
    <form id="editForm">
        <h3>Edit movie</h3>

<div class="row">
    <div class="col-sm-6">
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" v-model="movie_to_edit.title" class="form-control" id="title" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="year">Year</label>
            <input type="text" v-model="movie_to_edit.year" class="form-control" id="year" placeholder="Enter Year">
        </div>
        <div class="form-group">
            <label for="genre">Genre</label>
            <input type="text" v-model="movie_to_edit.genre" class="form-control" id="genre" placeholder="Enter Genre">
        </div>
        <div class="form-group">
            <label for="language">Language</label>
            <input type="text" v-model="movie_to_edit.language" class="form-control" id="language" placeholder="Enter Language">
        </div>
    </div>

    <hr>
    <div class="col-sm-6">

        <div class="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" v-model="movie_to_edit.director.lastname" class="form-control" id="lastname" placeholder="Enter Last Name">
        </div>
        <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" v-model="movie_to_edit.director.firstname" class="form-control" id="firstname" placeholder="Enter First Name">
        </div>
        <div class="form-group">
            <label for="nationality">Nationality</label>
            <input type="text" v-model="movie_to_edit.director.nationality" class="form-control" id="nationality" placeholder="Enter Nationality">
        </div>
        <div class="form-group">
            <label for="birthdate">Birthdate</label>
            <input type="date" v-model="movie_to_edit.director.birthdate" class="form-control" id="birthdate" placeholder="Enter Birthdate">(currently {{this.movie_to_edit.director.birthdate}})
        </div>
    </div>

    <div id="editButtons">
        <button v-on:click="save" type="submit" class="btn btn-success">Save</button>
        <button v-on:click="cancel" class="btn btn-warning">Cancel</button>
    </div>
</div> 
        
    </form>
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