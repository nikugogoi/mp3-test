<template>
    <div class="playlist_songs">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h2 class="subtitle">{{ playlist.name }}</h2>
                </div>
            </div>
        </nav>
        <b-table
            :data="playlist.songs"
            :columns="columns"
            @select="changeSong"
            focusable>
        </b-table>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'PlaylistSongs',
  
  middleware : 'auth',

  async asyncData ({ query, params, error, $axios }) {
    try{
      const { playlist } = await $axios.$get(`/users/playlists/${params.name}`)
      return {
        playlist
      }
    }catch(err){
      error(err)
    }
  },

  data(){
    return {
      selected: null,
      columns : [
        // {
        //   field: 'id',
        //   label: '#',
        //   // width: '40',
        //   numeric: true
        // },
        {
          field: 'title',
          label: 'Title',
        },
        {
          field: 'artist',
          label: 'Artist'
        }
      ]
    }
  },

  computed : {
    ...mapGetters(['getPlaylist'])
  },

  methods : {
    changeSong(row){
      if(this.getPlaylist.name !== name){
        this.setPlaylist(this.playlist)
      }
      this.$nextTick(() => {
        this.$root.$emit('play', row._id)
      })
    },
    
    ...mapMutations(['setPlaylist'])
  }
}
</script>
