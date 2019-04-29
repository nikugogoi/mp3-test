<template>
  <div class="songs">
    <h2 class="subtitle">All Songs</h2>
    <b-table
      :data="songs"
      :columns="columns"
      :selected.sync="selected"
      @select="changeSong"
      focusable>
    </b-table>
  </div>
</template>

<script>
import Card from '~/components/Card'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'AllSongs',

  components: {
    Card
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

  mounted(){
    if(!this.getPlaylist.id){
      this.setPlaylist({
        id : null,
        name : 'All Songs',
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
      console.log(row._id)
      this.$root.$emit('play', row._id)
    },
    ...mapMutations(['setPlaylist'])
  }
}
</script>
