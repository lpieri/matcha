<template>
  <div class="section" id="reset-password-section">
    <div class="container" id="reset-password-container">

      <div class="container" id="reset-password-logo-container">
        <figure class="image is-128x128">
          <img src="../assets/logo_matcha_nav_bar.svg">
        </figure>
        <h3 class="title">Salut {{ username }},</h3>
        <h4 class="subtitle is-4">Entre ton nouveau mot de passe</h4>
      </div>

      <div class="columns">
        <div class="field-label column is-one-quarter">
          <label class="label">Nouveau mot de passe</label>
        </div>
        <div class="field-body column">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('password')}" name="password" type="password" placeholder="Password" v-model="password" v-validate="'required'">
            </p>
          </div>
        </div>
        <span class="error">{{ errors.first('password') }}</span>
      </div>

      <div class="columns">
        <div class="field-label column is-one-quarter">
          <label class="label">Confirme ton nouveau mot de passe</label>
        </div>
        <div class="field-body column">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('confirmationPassword')}" name="confirmPassword" type="password" placeholder="Password" v-model="confirmPassword" v-validate="'required'">
            </p>
          </div>
        </div>
        <span class="error">{{ errors.first('confirmationPassword') }}</span>
      </div>
	<span class="error">{{ error_post }}</span>
      <div class="field is-grouped is-grouped-centered">
        <div class="control">
          <button class="button is-success is-rounded" @click="resetPassword">Change my password</button>
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

export default {
  name: 'ResetPassword',
  data () {
    return {
      username: null,
      resetToken: null,
	  password: null,
	  confirmPassword: null,
	  error_post: null
    }
  },
  methods: {
    resetPassword () {
		let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")
		console.log(this.confirmPassword === this.password)
		if (this.confirmPassword === this.password) {
			if (strongRegex.test(this.password)) {
				let data = {
				username: this.username,
				password: this.password,
				confirmPassword: this.confirmPassword
				}
				axios.post('/users/reset-password/' + this.resetToken, {
				data: data
				})
				.then(response => {
					this.$router.push({path: `/`})
				})
			} else {
				this.error_post = 'Votre mot de passe n\'est pas sécurisé'
			}
		}
    }
  },
  created () {
    if (!this.$route.params.token) {
      this.$router.push({path: '/'})
    }
    this.resetToken = this.$route.params.token
    axios.get('/users/reset-password/' + this.resetToken)
      .then(response => (
        this.username = response.data.username
      ))
    //   .catch(() => (
    //     this.$router.push({path: '/'})
    //   ))
  }
}
</script>

<style>
.field-columns {
  align-items: center;
}

#reset-password-logo-container {
  display: grid;
  justify-items: center;
  justify-content: center;
  padding: 20px;
}

#reset-password-container {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px gray;
  padding: 20px;
  flex-flow: column;
  align-items: center;
}

#reset-password-section {
  padding: 21vh 0vh 21vh 0vh;
  height: 80vh;
}
</style>
