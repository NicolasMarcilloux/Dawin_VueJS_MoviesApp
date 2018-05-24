<template>
<li>
    <span @click="display_details=!display_details">
        <b>{{movie.title}} ({{movie.year}})</b><br />
        <span v-if="display_details">

            <div v-if="movie.rate" >
                <span  style="margin:2px;" class="fa fa-star checked" v-for="star in movie.rate" v-bind:key="star+4"></span>
                <span  style="margin:2px;" class="fa fa-star" v-for="uncheckStar in (5 - movie.rate)" v-bind:key="uncheckStar"></span>
            </div>

            <router-link tag="button" :to="{ name: 'edit' , params: this.movie }">Edit</router-link>
            <button @click="remove">Remove</button>
            <button v-if="!movie.rate" @click="display_rate=!display_rate">Rate</button>

        </span>
    </span>

    <br />

    <div ref="ratestars" v-if="!movie.rate && display_rate">
        <span id="0" v-on:click="check($event)" class="rate fa fa-star checked"></span>
        <span id="1" v-on:click="check($event)" class="rate fa fa-star checked"></span>
        <span id="2" v-on:click="check($event)" class="rate fa fa-star checked"></span>
        <span id="3" v-on:click="check($event)" class="rate fa fa-star"></span>
        <span id="4" v-on:click="check($event)" class="rate fa fa-star"></span>  
        <button @click="rate">Send</button>
    </div>

    <br /><br />
</li>

</template>

<script>
export default {
    props: [ "movie" ],
    data: function(){
        return {
            display_details: false,
            display_rate: false,
            temprate: null
        }
    },
    methods: {
        remove() {
            this.$store.dispatch("deleteMovie", this.movie.id);
        },
        check(event){
            var stars = this.$refs.ratestars.children;
            var id = parseInt(event.target.id);
            this.temprate = id + 1;

            if(event.target.className == "rate fa fa-star")
            {
                for(var i = 0; i <= id; i++){
                    stars[i].classList.add('checked');
                }
            }
            else
            {
                for(var i = 4; i > id; i--){
                    stars[i].classList.remove('checked');
                }
            }
        },
        rate(){
            this.movie.rate = this.temprate;
            this.$store.dispatch("editMovie", this.movie);
        },
    },
    
    
}
</script>