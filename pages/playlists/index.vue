<template>
    <div class="playlists">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h2 class="subtitle">Playlists</h2>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <button class="button is-primary is-medium"
                        @click="openMakePlaylist = true">
                        Make Playlist
                    </button>
                    <b-modal :active.sync="openMakePlaylist" has-modal-card>
                        <make-playlist @added="addPlaylist"></make-playlist>
                    </b-modal>
                </div>
            </div>
        </nav>
        <b-table
            :data="playlists"
            :columns="columns"
            @select="selectPlaylist"
            focusable>
        </b-table>
    </div>
</template>

<script>
import makePlaylist from '~/components/MakePlaylist'
export default {

    middelware : 'auth',

    components : {
        makePlaylist
    },

    async asyncData({error, $axios}){
        try{
            const { playlists } = await $axios.$get('/users/playlists')
            return {
                playlists
            }
        }catch(err){
            error(err)
        }
    },

    data(){
        return {
            columns : [
                // {
                //   field: 'id',
                //   label: '#',
                //   // width: '40',
                //   numeric: true
                // },
                {
                    field: 'name',
                    label: 'Name',
                },
                {
                    field: 'songs.length',
                    label: 'Songs'
                }
            ],
            openMakePlaylist: false
        }
    },

    methods:{
        selectPlaylist(row){
            console.log(row)
            // this.$router.push(`/playlists/${row.}`)
        },

        addPlaylist(name){
            this.playlists.push({
                name,
                songs: []
            })
        }
    }

}
</script>

<style>

</style>
