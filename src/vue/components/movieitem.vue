<template>
<li @click="display_details=!display_details">
    <b>{{movie.title}} ({{movie.year}})</b><br />
    <span v-if="display_details">
        {{movie.synopsis}}<br />
        
        <router-link tag="button" :to="{ name: 'edit' , params: this.movie }">Edit</router-link>
        <button @click="remove">Remove</button>
    </span>
    <br /><br />
</li>
</template>

<script>
export default {
    props: [ "movie" ],
    data: function(){
        return {
            display_details: false
        }
    },
    methods: {
        remove() {
            this.$store.dispatch("deleteMovie", this.movie.id);
        }
    },
}
</script>