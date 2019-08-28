<template>
  <div class="section" id="confirme-email-section">
    <div class="container" id="confirme-email-container">

      <div class="container" id="confirme-email-logo-container">
        <figure class="image is-128x128">
          <img src="../assets/logo_matcha_nav_bar.svg">
        </figure>
        <h3 class="title">{{ message }}</h3>
      </div>

      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-success is-rounded" @click="modalIsShow =! modalIsShow, modalContentName = 'SignInForm'">Log In</button>
          <Modal :is-show-arg="modalIsShow" :child-arg="modalContentName" @changeModalContentName="modalContentName = $event" @changeModalIsShow="modalIsShow = $event"></Modal>
        </div>
        <div class="control">
          <router-link class="button is-rounded" to="/">Cancel</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Modal from '../Modals/modal'

export default {
  name: 'ConfirmeEmail',
  data () {
    return {
      modalIsShow: false,
      modalContentName: 'SignInForm',
      message: null
    }
  },
  components: {
    Modal
  },
  created () {
    const token = this.$route.params.token
    if (!token) {
      this.$router.push('/')
    }
    axios.get('/users/confirme-email/' + token)
      .then(response => {
        if (response.status === 200) {
          this.message = 'Ton compte est désormais activé.'
        } else {

        }
      })
  }
}
</script>

<style>
  #confirme-email-logo-container {
    display: grid;
    justify-items: center;
    justify-content: center;
    padding: 20px;
  }

  #confirme-email-container {
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px gray;
    padding: 20px;
    flex-flow: column;
    align-items: center;
  }

  #confirme-email-section {
    padding: 21vh 0vh 21vh 0vh;
    height: 80vh;
  }
</style>
