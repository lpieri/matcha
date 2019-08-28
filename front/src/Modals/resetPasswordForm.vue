<template>
  <div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username :</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-rounded" :class="{'is-danger': errors.has('username')}" type="text" name="username" placeholder="Your username" v-model="username" v-validate="'required'">
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <span class="error">{{ errors.first('username') || error_submit }}</span>
    </div>



    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button :disabled="!username" class="button is-success is-rounded" @click="requestResetPassword">Reset your password</button>
      </div>
      <div class="control">
        <button class="button is-rounded" @click="this.$parent.closeModal">Cancel</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ResetPasswordForm',
  data () {
    return {
      username: null,
      error_submit: null
    }
  },
  methods: {
    /**
     *  Send request for reset password in Api
     */
    requestResetPassword () {
      axios.get('users/request-reset-password/' + this.username)
        .then(() => {
          this.$parent.changeChildArg('SuccessSignIn')
        })
    }
  }
}
</script>
