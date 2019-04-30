<template>
    <form @submit.prevent="addToPlaylist">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Add to</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Playlists">
                    <b-select v-model="playlistName" placeholder="Select a playlist">
                        <option v-for="name in names" :value="name">{{name}}</option>
                    </b-select>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary">Add</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    data(){
        return{
            names : [],
            playlistName: null
        }
    },
    
    props : ['id'],

    created(){
        this.$axios.$get('/users/playlists').then(({playlists}) =>{
            if(playlists.length){
                
                this.names = playlists.map(playlist => playlist.name)
                this.playlistName = this.names[0]    
            }else{
                this.$toast.open({
                    duration: 5000,
                    message: 'Please create a playlist',
                    position: 'is-bottom',
                    type: 'is-danger'
                })
                this.$parent.close()
            }
        })
    },
    
    methods: {
        addToPlaylist(){
            this.$axios.put(`users/playlists/${this.playlistName}`,{ id: this.id })
                .then(res => {
                    console.log(res)
                    this.$emit('added', this.name)
                    this.$parent.close()
                }).catch(err=> {
                    console.warn(err)
                    this.$toast.open({
                        duration: 5000,
                        message: err.message,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                })
        }
    }

}
</script>

<style>

</style>
