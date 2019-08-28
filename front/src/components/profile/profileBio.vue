<template>
	<div class="tile is-parent is-8 ">
    <article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">
      <div class="content">
        <p class="title">Ma bio</p>
        <p class="subtitle">Ma description</p>
        <div class="content">
          <div class="field">
            <div class="control">
              <div class="field">
                <div class="control">
                    <textarea :keyup="charCounter()" :maxlength="maxCount" v-if="isMe" class="textarea" row="5" name="message" v-model="message" placeholder="Soyez bref, mais surtout sincère"
                    :class="{'is-danger': errors.has('message')}"
                    v-validate="'max:200'"></textarea>
                    <p v-if="isMe">{{ currentCount }} caractères restants.</p>
                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                          <button v-if="isMe" class="button is-medium is-success is-rounded" @click="sendBio">Valider</button>
                        </div>
                        <div class="control">
                          <button v-if="isMe" class="button is-medium is-rounded" @click="clearContents()">Clear</button>
                        </div>
                    </div>
                    <p style="white-space: pre-line;">{{ message }}</p>

					<div class="content">
						<p class="is-medium">{{ userInfos.bio }}</p>
					</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ProfileBio',
  props: {
	  userInfos: null,
    isMe: null
  },
	data () {
		return {
			maxCount: 200,
			currentCount: 200,
			message: ''
		}
	},
	methods: {
		charCounter() {
			this.currentCount = this.maxCount - this.message.length;
		},

		sendBio () {
			let data = {
				'message': this.message
			}
		axios.put('users-infos/update-bio/' + this.userInfos.username, {
					data: data
				})
			.then(res => {
			if (res.status === 200) {
				this.userInfos.bio = this.message
			}
			})
		},

		clearContents() {
 			this.message = '';
		}
	}
}
</script>
