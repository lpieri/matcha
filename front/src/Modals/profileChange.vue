<template>
  <div v-if="infos">
    <div class="title">Change my informations</div>

    <div class="box has-background-white-ter">

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label has-text-left-tablet">Edit Name :</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('first_name')}" type="text" name="first_name" :placeholder="infos.first_name" v-model="first_name" v-validate="'required|alpha'">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('last_name')}" type="text" name="last_name" :placeholder="infos.last_name" v-model="last_name" v-validate="'required|alpha'">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label has-text-left-tablet">Edit Email :</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('email')}" type="text" name="email" v-model="email" :placeholder="infos.email" v-validate="'required|email'">
            </p>
          </div>
          <span class="error">{{ errors.first('email') }}</span>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label has-text-left-tablet">Old Password :</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('oldPassword')}" name="oldPassword" type="password" placeholder="Old Password" ref="password" v-validate="'required|min:8'" v-model="oldPassword">
            </p>
          </div>
        </div>
      </div>
      <span class="error">{{ errors.first('password') || errors.first('confirmationPassword') }}</span>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label has-text-left-tablet">New Password :</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('newPassword')}" name="newPassword" type="password" placeholder="New Password" ref="password" v-validate="'required|min:8'" v-model="newPassword">
            </p>
          </div>
          <div class="field">
            <p class="control">
              <input class="input is-rounded" :class="{'is-danger': errors.has('confirmationPassword')}" name="confirmationPassword" type="password" placeholder="Confirmation Password" v-model="confirmationPassword" v-validate="'required|confirmed:password|min:8'">
            </p>
          </div>
        </div>
      </div>
      <span class="error">{{ errors.first('password') || errors.first('confirmationPassword') }}</span>
      <span class="error">{{ error_post }}</span>
    </div>


    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-success is-rounded" @click="handler">Save</button>
      </div>
      <div class="control">
        <button class="button is-rounded" @click="this.$parent.closeModal">Cancel</button>
      </div>
    </div>
  </div>

  <div v-else></div>

</template>

<script>
    import axios from 'axios'

    export default {
        name: 'ProfileChange',
        data () {
            return {
                infos: null,
                first_name: null,
                last_name: null,
                email: null,
                newPassword: null,
                oldPassword: null,
                confirmationPassword: null,
                error_post: null
            }
        },
        methods: {

            getInfos () {

                axios.get('users/get-basic-info/' + this.$session.get('username'))
                    .then(res => {
                        if (res.status === 200) {
                            this.infos = res.data
                        }
                    })
            },

            changeModalChild () {
                this.$parent.changeChildArg('ProfileChange')
            },

            changeLastName () {
                let alphaRegex = new RegExp("^(?=.*[a-z])", "g")
                if (this.last_name != null) {
                    if (alphaRegex.test(this.last_name)) {
                        axios.put('users/update-last-name/' + this.$session.get('username'), {
                            data: {'last_name': this.last_name}
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    this.$parent.closeModal();
                                }
                            })
                    } else {
                        this.error_post = 'Votre nom de famille est invalide.'
                    }
                }
            },

            changeFirstName () {
                let alphaRegex = new RegExp("^[a-z]+$", "i")
                if (this.first_name != null) {
                    if (alphaRegex.test(this.last_name)) {
                        axios.put('users/update-first-name/' + this.$session.get('username'), {
                            data: {'first_name': this.first_name}
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    this.$parent.closeModal();
                                }
                            })
                    } else {
                        this.error_post = 'Votre prénom est invalide.'
                    }
                }
            },

            changeEmail () {
                let emailR = new RegExp("^\\w+([\--\.]?\\w+)*@\\w+([\--\.]?\\w+)*([\.]\\w{2,3})")
                if (this.email != null) {
                    if (emailR.test(this.email)) {
                        axios.put('users/update-email/' + this.$session.get('username'), {
                            data: {'email': this.email}
                        })
                            .then((res) => {
                                if (res.status === 200) {
                                    this.$parent.closeModal();
                                }
                            })
                    } else {
                        this.error_post = 'Votre email est invalide.'
                    }
                }
            },

            updatePassword () {
                let pwdR = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g")
                if (this.newPassword != null && this.oldPassword != null && this.confirmationPassword != null) {
                    if (this.confirmationPassword === this.newPassword) {
                        if (pwdR.test(this.newPassword)) {
                            let connectData = {
                                'new_password': this.newPassword,
                                'old_password': this.oldPassword,
                                'confirmation_password': this.confirmationPassword
                            }
                            axios.put('users/update-password/' + this.$session.get('username'), {
                                data: connectData
                            })
                                .then(res => {
                                    this.$parent.changeChildArg();
                                    if (res.status === 200) {
                                        this.$parent.closeModal();
                                    }
                                })
                        } else {
                            this.error_post = 'Vos mots de passses sont invalides.'
                        }
                    }
                }
            },

            handler () {
                this.changeEmail()
                this.changeLastName()
                this.changeFirstName()
                this.updatePassword()
            }
        },
        created () {
            this.getInfos()
        }
    }
</script>
