<template>
    <div class="login box">
        <section>
            <b-field label="Email">
                <b-input type="email"
                    v-model="email"
                    maxlength="30">
                </b-input>
            </b-field>
            <b-field label="Password">
                <b-input v-model="password" type="password" maxlength="30"></b-input>
            </b-field>
            <b-button @click="fireLogin" type="is-success">Login</b-button>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            email : '',
            password : ''
        }
    },

    methods : {
        fireLogin(){
            this.login({
                email : this.email,
                password : this.password
            }).then(()=>{
                this.$router.push('/playlists')
            }).catch((err) => {
                this.$toast.open({
                    duration: 5000,
                    message: err.message,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            })
        },
        ...mapActions(['login'])
    }
}
</script>

<style>

</style>
