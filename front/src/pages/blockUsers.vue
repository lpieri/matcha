<template>
  <div class="section" id="block-users-section">
    <div class="container" id="block-users-container">

      <div class="container" id="block-users-logo-container">
        <figure class="image is-128x128">
          <img src="../assets/logo_matcha_nav_bar.svg">
        </figure>
        <h3 class="title" v-if="byMe">Vous avez bloqué cet utilisateur {{ username }}</h3>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <div class="control" v-if="byMe">
          <button class="button is-success is-rounded" @click="unblockUser">Débloquer</button>
        </div>
        <div class="control">
          <router-link class="button is-rounded" :to="'/profile/' + $session.get('username')">Cancel</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'blockUsers',
  data () {
    return {
      username: null,
      byMe: null
    }
  },
  methods: {
    unblockUser () {
      axios.post('/users-block/remove-block-users/' + this.username)
        .then(res => {
          if (res.status === 201) {
            this.$router.push('/profile/' + this.username)
          }
        })
    }
  },
  created () {
    this.username = this.$route.params.username
    if (this.$route.query.byMe === 'true') {
      this.byMe = true
    }
    if (!this.username) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #block-users-logo-container {
    display: grid;
    justify-items: center;
    justify-content: center;
    padding: 20px;
  }

  #block-users-container {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px gray;
    padding: 20px;
    flex-flow: column;
    align-items: center;
  }

  #block-users-section {
    padding: 21vh 0vh 21vh 0vh;
    height: 80vh;
  }
</style>
