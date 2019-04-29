<template>
    <form @submit.prevent="makePlaylist">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">New Playlist</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Email">
                    <b-input
                        type="text"
                        v-model="name"
                        placeholder="Your Playlist Name"
                        required>
                    </b-input>
                </b-field>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary">Create</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
    data(){
        return{
            name : ''
        }
    },

    methods: {
        makePlaylist(){
            this.$axios.post('users/playlists',{ name: this.name })
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
