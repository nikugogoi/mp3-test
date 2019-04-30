<template>
  <div class="songs">
    <h2 class="subtitle">All Songs</h2>
    <b-table
      :data="songs"
      :selected.sync="selected"
      @select="changeSong"
      focusable>
      <template slot-scope="props">
        <b-table-column label="#" width="40">
            {{ props.index + 1 }}
        </b-table-column>
        
        <b-table-column field="title" label="Title">
            {{ props.row.title }}
        </b-table-column>
  
        <b-table-column field="artist" label="Artist">
            {{ props.row.artist }}
        </b-table-column>
        
        <b-table-column v-if="getAuth" label="Action">
          <button @click="addToPlaylist(props.row._id)" class="is-success button">Add to playlist</button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import addToPlaylist from '~/components/AddToPlaylist'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AllSongs',

  components: {
    addToPlaylist
  },

  async asyncData ({ query, error, $axios }) {
    try{
      const { songs } = await $axios.$get('/songs', { params : query })
      return {
        songs
      }
    }catch(err){
      error(err)
    }
  },

  data(){
    return {
      selected: null,
    }
  },

  computed : {
    ...mapGetters(['getPlaylist', 'getAuth'])
  },

  mounted(){
    if(!this.getPlaylist.name){
      this.setPlaylist({
        name : null,
        songs : this.songs
      })
    }
  },

  methods : {
    changeSong(row){
      this.setPlaylist({
        id : null,
        name : 'All Songs',
        songs : this.songs
      })
      this.$nextTick(()=>{
        this.$root.$emit('play', row._id)
      })
    },
    
    addToPlaylist(id){
      this.$modal.open({
          parent: this,
          component: addToPlaylist,
          props: { id },
          hasModalCard: true
      })
    },
    
    ...mapMutations(['setPlaylist'])
  }
}
</script>
