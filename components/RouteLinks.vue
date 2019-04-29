<template>
    <div class="navbar-item is-block">
        <ul class="menu-list">
            <li
            v-for="(link, key) of links"
            :key="key"
            >
            <nuxt-link
                :to="link.to"
                exact-active-class="is-active"
            >
                <!-- <b-icon :icon="link.icon" />  -->
                {{ link.title }}
            </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            links: [
                {
                    title: 'All',
                    icon: 'home',
                    to: { name: 'index' }
                },
                {
                    title: 'Playlists',
                    icon: 'lightbulb',
                    to: { name: 'playlists' }
                },
                {
                    title: 'Account',
                    icon: 'lightbulb',
                    to: { name: 'login' }
                }
            ],
        }
    }
}
</script>

<style>

</style>
