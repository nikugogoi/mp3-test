<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-burger" @click="showMenu=!showMenu">
            <span />
            <span />
            <span />
          </div>
          <a
            class="navbar-item"
            href="/"
          >
            <img
              width="112" 
              src="~/assets/images/spotify.svg"
              alt="Mp3"
            >
          </a>
          <b-dropdown
            position="is-bottom-left"
            aria-role="menu"
            class="navbar-right">
            <a
                class="navbar-item"
                slot="trigger"
                role="button">
                <span>Menu</span>
            </a>

            <b-dropdown-item custom aria-role="menuitem">
                Logged as <b>Rafael Beraldo</b>
            </b-dropdown-item>
            <hr class="dropdown-divider">
            <b-dropdown-item has-link aria-role="menuitem">
                <a href="https://google.com" target="_blank">
                    <!-- <b-icon icon="link"></b-icon> -->
                    Google (link)
                </a>
            </b-dropdown-item>
            <!-- <b-dropdown-item value="home" aria-role="menuitem">
                <b-icon icon="home"></b-icon>
                Home
            </b-dropdown-item>
            <hr class="dropdown-divider" aria-role="menuitem">
            <b-dropdown-item value="settings">
                <b-icon icon="settings"></b-icon>
                Settings
            </b-dropdown-item>
            <b-dropdown-item value="logout" aria-role="menuitem">
                <b-icon icon="logout"></b-icon>
                Logout
            </b-dropdown-item> -->
          </b-dropdown>
        </div>
        <div class="navbar-menu is-hidden-desktop" :class="{'is-active': showMenu}">
          <route-links class="navbar-start"/>
        </div>
      </div>
    </nav>

    <section class="main-content section">
      <div class="container">
        <div class="columns">
          <aside class="column is-2 is-hidden-touch">
            <p class="menu-label">General</p>
            <route-links/>
          </aside>

          <div class="column is-10">
            <player ref="player" :songs="this.getPlaylist.songs"></player>
            <br>
            <nuxt/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Player from '~/components/Player'
import RouteLinks from '~/components/RouteLinks'
import { mapGetters } from 'vuex'

export default {
  components : {
    Player, RouteLinks
  },
  data() {
    return {
      showMenu : false
    }
  },

  computed : {
    ...mapGetters(['getPlaylist'])
  },

  mounted(){
    this.$root.$on('play', id=>{
      this.$refs.player.play(id)
    })
    
  }
}
</script>
<style lang="sass" scoped>
.navbar-burger
  margin-left : unset
.navbar-right
  margin-left : auto
</style>