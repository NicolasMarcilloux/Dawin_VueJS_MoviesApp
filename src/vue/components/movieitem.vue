<template>
<li class="col-sm-6">
    <span @click="display_details=!display_details">
        <div class="card border-success mb-3" style="max-width: 18rem;">
            <div class="card-header bg-transparent border-success"><b>{{movie.title}} ({{movie.year}})</b></div>
            <div class="card-body text-success">
                <vue-dropzone ref="dz" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-success="poster"></vue-dropzone>
            </div>
            
            <div class="card-footer bg-transparent border-success">
                <div ref="ratestars" v-if="!movie.rate && display_rate">
                    <span id="0" v-on:click="check($event)" class="rate fa fa-star checked"></span>
                    <span id="1" v-on:click="check($event)" class="rate fa fa-star checked"></span>
                    <span id="2" v-on:click="check($event)" class="rate fa fa-star checked"></span>
                    <span id="3" v-on:click="check($event)" class="rate fa fa-star"></span>
                    <span id="4" v-on:click="check($event)" class="rate fa fa-star"></span>  
                    <button @click="rate">Send</button>
                </div>
                <div v-if="movie.rate" >
                    <span  style="margin:2px;" class="fa fa-star checked" v-for="star in movie.rate" v-bind:key="star+4"></span>
                    <span  style="margin:2px;" class="fa fa-star" v-for="uncheckStar in (5 - movie.rate)" v-bind:key="uncheckStar"></span>
                </div>
                <span v-if="display_details">
                    <br/>
                    <router-link tag="button" class="btn btn-primary" :to="{ name: 'edit' , params: this.movie }">Edit</router-link>
                    <button v-if="!movie.rate" @click="display_rate=!display_rate" class="btn btn-primary">Rate</button>
                    <button @click="remove" class="btn btn-danger">Remove</button>
                </span>
            </div>
        </div>
    </span>
</li>

</template>

<script>

import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
    components: {
        vueDropzone: vue2Dropzone
    },
    props: [ "movie" ],
    data: function(){
        return {
            display_details: false,
            display_rate: false,
            temprate: null,
            dropzoneOptions: {
                url:"https://httpbin.org/post",
                thumbnailWidth: 195, // px
                thumbnailHeight: 295,
                maxFilesize: 10,
                chunkSize: 500,
            }
        }
    },
    mounted: function(){
        if(this.movie.poster){
            var file = { name: "Poster " + this.movie.title };
            var url = this.movie.poster;
            this.$refs.dz.manuallyAddFile(file, url);
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
        poster: function() {
            if(this.$refs.dz.getAcceptedFiles().length > 0){
                this.$store.dispatch("uploadPoster",  {id:this.movie.id, img:this.$refs.dz.getAcceptedFiles()[0]});                
                this.$refs.dz.disable();
            }
        }
    },
    
    
}
</script>


<style>

#dropzone {
    max-height: 300px;
    max-width: 200px;
    padding: 0px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

.dropzone .dz-preview {
    margin: 0px;
}
 
</style>