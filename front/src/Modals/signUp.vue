<template>
  <div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Your Name :</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('firs_name')}" type="text" name="first_name" placeholder="First Name" v-model="first_name" v-validate="'required|alpha'">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('last_name')}" type="text" name="last_name" placeholder="Last Name" v-model="last_name" v-validate="'required|alpha'">
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username :</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('username')}" name="username" type="text" placeholder="Username" v-validate="'required|alpha'" v-model="username">
          </p>
        </div>
        <span class="error">{{ errors.first('username') }}</span>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Email :</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('email')}" type="text" name="email" v-model="email" placeholder="Email" v-validate="'required|email'">
          </p>
        </div>
        <span class="error">{{ errors.first('email') }}</span>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password :</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('password')}" name="password" type="password" placeholder="Password" ref="password" v-model="password">
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input class="input is-fullwidth is-rounded" :class="{'is-danger': errors.has('confirmationPassword')}" name="confirmationPassword" type="password" placeholder="Password" v-model="confirmePassword">
          </p>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="conditions">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>

    <span class="error">{{ error_post }}</span>

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button :disabled="!conditions" class="button is-success is-rounded" @click="sendSignUp">Sign Up</button>
      </div>
      <div class="control">
        <button class="button is-rounded" @click="this.$parent.closeModal">Cancel</button>
      </div>
      <div class="control">
        <button class="button is-rounded" @click="test">Test</button>
      </div>
    </div>

  </div>
</template>

<script>
    import axios from 'axios'
    import crypto from 'crypto'

    export default {
        name: 'SignUpForm',
        data () {
            return {
                first_name: null,
                last_name: null,
                username: null,
                email: null,
                password: null,
                confirmePassword: null,
                conditions: false,
                error_post: null,
            }
        },
        methods: {
            checkData (data) {
                let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")
                let alphaRegex = new RegExp("^[a-z]+$", "g")
                let emailRegex = new RegExp("^\\w+([\--\.]?\\w+)*@\\w+([\--\.]?\\w+)*([\.]\\w{2,3})")
                if (strongRegex.test(data.password) === false) {
                    this.error_post = 'Votre mot de passe n\'est pas sécurisé'
                    return false
                } if (alphaRegex.test(data.username) === false) {
                    this.error_post = 'Votre username n\'est pas valide'
                    return false
                } if (data.password !== this.confirmePassword) {
                    this.error_post = 'Vos mots de passes sont différents'
                    return false
                } if (emailRegex.test(data.email) === false) {
                    this.error_post = 'Ton email n\'est pas valide'
                    return false
                }
                return true
            },

            sendSignUp () {
                let data = {
                    'first_name': this.first_name,
                    'last_name': this.last_name,
                    'username': this.username,
                    'email': this.email,
                    'password': this.password,
                }
                if (this.checkData(data) === true) {
                    axios.post('/users/create', {data: data})
                        .then(res => {
                            if (res.status === 201) {
                                this.$emit('changeChild', 'SuccessSignIn')
                            } else if (res.status === 200 && res.data.message === 'Username exist try again !') {
								this.error_post = 'Ton username existe déjà batard <3'
							}
                        })
                } else {
                    this.error_post += '\nVos informations sont invalides.'
                }
            },

            test () {
                let data = {
                    'first_name': 'Louise',
                    'last_name': 'Pieri',
                    'username': crypto.randomBytes(2).toString('hex'),
                    'email': 'pieri.louisse@gmail.com',
                    'password': '1',
                }
                axios.post('/users/create', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    withCredentials: true,
                    credentials: 'same-origin',
                    data: data
                }).then(response => {
                    this.$emit('changeChild', 'SuccessSignIn')
                })
            }
        }
    }
</script>
