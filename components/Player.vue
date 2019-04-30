<template>
    <div class="player">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item" v-if="songs.length">
                    <h2 class="subtitle has-text-weight-bold">{{ songs[currentlyPlaying].title }} - {{ songs[currentlyPlaying].artist }}</h2>
                </div>
            </div>
            <div class="level-right">
                
            </div>
        </nav>
        <nav class="level is-mobile">
            <div class="level-item is-block">
                <p>Volume {{ volume }}</p>
                <vue-slider ref="slider" v-model="volume"></vue-slider>    
            </div>
            <div class="level-item has-text-centered">
                <div class="controls">
                    <b-icon
                        pack="fas"
                        @click.native="next()"
                        icon="step-backward"
                        size="is-medium"
                        type="is-info">
                    </b-icon>
                    <b-icon
                        @click.native="togglePlay"
                        pack="fas"
                        :icon="playing?'pause':'play'"
                        size="is-large"
                        type="is-info">
                    </b-icon>
                    <b-icon
                        pack="fas"
                        @click.native="previous"
                        icon="step-forward"
                        size="is-medium"
                        type="is-info">
                    </b-icon>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import {Howl, Howler} from 'howler'
export default {
    props : ['songs'],

    data(){
        return {
            playing : false,
            currentlyPlaying : 0,
            howlers : [],
            volume: 80
        }
    },

    watch : {
        volume(vol){
            Howler.volume(vol/100)
        },
        songs : {
            handler(newSongs){
                this.stop()
                this.currentlyPlaying = 0
                this.howlers = []
            }
        }
    },

    created(){
        Howler.volume(this.volume/100)
    },

    methods : {
        play(id){
            this.stop()
            this.currentlyPlaying = this.songs.findIndex(song => song._id==id)
            this.resume()
        },

        stop(){
            this.howlers[this.currentlyPlaying] && this.howlers[this.currentlyPlaying].stop()
            this.playing = false
        },

        resume(){
            if(!this.howlers[this.currentlyPlaying]){
                this.howlers[this.currentlyPlaying] = new Howl({
                    src: [ this.songs[this.currentlyPlaying].file ]
                })
            }
            this.howlers[this.currentlyPlaying].play()
            this.playing = true
        },

        pause(){
            this.howlers[this.currentlyPlaying].pause()
            this.playing = false
        },

        togglePlay(){
            this.playing?this.pause():this.resume()
        },

        next(){
            this.stop()
            if(++this.currentlyPlaying >= this.songs.length){
                this.currentlyPlaying = 0
            }
            this.resume()
        },

        previous(){
            this.stop()
            if(--this.currentlyPlaying < 0){
                this.currentlyPlaying = 0
            }
            this.resume()
        }
    }
}
</script>

<style>

</style>
