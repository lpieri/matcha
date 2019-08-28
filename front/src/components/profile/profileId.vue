<template>
	  <div class="tile is-ancestor">
		  <div class="tile is-parent box" id="header_profile">


          <figure class="image is-480x480">
            <img class="is-rounded" :src="require(`../../../../back/UsersPhotos/pictures/${userInfos.pic}`)"/>
          </figure>

        <div class="tile is-parent is-8">

          <article class="tile is-child">

				<!-- Right side -->
				<div class="is-pulled-right is-marginless is-paddingless">

				<p class="is-pulled-right is-marginless" v-if="isMe === false">
					<button @click="addFakeAccounts" class="button is-rounded is-rounded is-text title is-medium">
						<font-awesome-icon icon="exclamation-triangle" size="1x" color="orange"/>
					</button>

				</p>
				<p class="is-pulled-right" v-if="isMe === false">
				<button @click="blockUser" class="button is-rounded is-rounded is-text title is-medium">
					<font-awesome-icon icon="ban" size="1x" color="red"/>
				</button>
				</p>

				</div>

			<br/>
			<br/>
			<br/>

			<p v-if="userInfos.is_connected" class="is-italic is-size-6">
        <font-awesome-icon icon="circle" size="1x" color="green"/>
        &nbsp;Connected
      </p>
            <p v-else class="is-italic is-size-6">
              <font-awesome-icon icon="circle" size="1x" color="red"/>
              &nbsp;Disconnected,
              the last connection is {{ userInfos.last_connect }}
            </p>

			<br/>
			<p class="has-text-whit is-size-2">
				<router-link class="has-text-white" :to="'/profile/' + userInfos.username">
					<strong>{{ userInfos.first_name }} {{ userInfos.last_name }}</strong>
				</router-link>
				<span>
					<button v-if="isMe" class="button is-rounded is-text is-medium" @click="showModal('ProfileChange')"><font-awesome-icon icon="edit" size="1x" color="white"/></button>
				</span>
			</p>



            <p class="subtitle has-text-white has-text-weight-semibold is-size-5">
				{{ userInfos.age }} ans, {{ userInfos.gender }} -- {{ userInfos.city }}
			</p>
            <ProfileUploadImg :user-infos="userInfos" :is-me="isMe"></ProfileUploadImg>

            <button v-if="isMe === false && noImage === false && liked === false" class="button is-rounded is-outlined is-medium is-danger" @click="likeUsers">
              Ajouter aux favoris&nbsp;
              <font-awesome-icon icon="heart" size="1x" color="pink"/>
            </button>

            <button v-if="isMe === false && liked === true " class="button is-rounded is-medium is-danger" @click="unlikeUsers">
              <font-awesome-icon icon="heart" size="1x" color="white"/>
            </button>


 			<router-link v-if="this.$session.exists() === true || userConnect === true" to="/chat">
				<button v-if="isMe === false && matched === true" class="button is-rounded is-medium is-info">
				Envoyer un message&nbsp;
				<font-awesome-icon icon="comments" size="1x" color="white"/>
				</button>
       	 	</router-link>

          </article>

        </div>
      </div>
      <Modal :isShowArg="modalIsShow" :childArg="modalContentName" @changeModalContentName="modalContentName = $event" @changeModalIsShow="modalIsShow = $event"></Modal>
    </div>
</template>


<script>
import axios from 'axios'
import Modal from '../../Modals/modal'
import ProfileUploadImg from './profileIdUploadImg'

export default {
  name: 'ProfileId',
  components: {
    ProfileUploadImg,
      Modal
  },
	props: {
		userInfos: null,
		isMe: null,
	},
  data () {
	  return {
	  		noImage: null,
		 	selectedFile: null,
			userConnect: null,
			modalIsShow: false,
			modalContentName: null,
			liked: null,
			matched: null,
			fakeAccount: null,
			count_pic: null
		}
	 },
  methods: {

	getPictures () {
		axios.get('/users-photos/get-all/' + this.$session.get('username'))
			.then(res => {
				if (res.status === 200) {
					this.images = res.data.images
				this.count_pic = res.data.count_pic
				if (this.count_pic === 0) {
					this.noImage = true
				} else {
					this.noImage = false
				}
			}
			})
		},

    unlikeUsers () {
      axios.post('/likes/unlike', {
        data: {
          from_username: this.$session.get('username'),
          to_username: this.userInfos.username
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.liked = false
            this.matched = false

			axios.post('/users-chat/delete-room', {
			data: {
				username_1: this.$session.get('username'),
				username_2: this.userInfos.username
				}
			})

            axios.put('users-popularity/remove-likes/' + this.userInfos.username)
              .then((res) => {
                if (res.status === 200) {
                  this.userInfos.score = res.data.score
                  this.userInfos.likes = res.data.likes
                }
			  })


            axios.post('/users-notifs/create/' + this.userInfos.username, {
              data: {
                reason: 'unlike'
              }
            })
          }
        })
    },



    likeUsers () {
      axios.post('/likes/like', {
        data: {
          from_username: this.$session.get('username'),
          to_username: this.userInfos.username
        }
      })
        .then(res => {
          if (res.status === 201) {
            this.liked = true
            let reason = 'like'
            if (res.data.matched === true) {
              this.matched = true
			  reason = 'match'


			axios.post('/users-chat/new-room', {
				   data: {
					username_1: this.$session.get('username'),
					username_2: this.userInfos.username
					}
			  })
            }

            axios.put('users-popularity/add-likes/' + this.userInfos.username)
              .then((res) => {
                if (res.status === 200) {
                  this.userInfos.score = res.data.score
                  this.userInfos.likes = res.data.likes
                }
              })

            axios.post('/users-notifs/create/' + this.userInfos.username, {
              data: {
                reason: reason
              }
            })
          }
        })
    },

    getLike () {
      axios.get('/likes/check-like/' + this.userInfos.username)
        .then(res => {
          if (res.status === 200 && res.data.liked === true) {
            if (res.data.matched === true) {
			  this.matched = true
			}
            this.liked = true
          } else if (res.status === 200 && res.data.liked === false) {
            this.liked = false
          }
        })
	},

    addFakeAccounts () {
      axios.post('/fake-account/add-fake-account/' + this.userInfos.username)
        .then(res => {
          if (res.status === 200) {
            this.userInfos.username = response.data.username
          }
        })
	  },

    blockUser () {
      axios.post('/users-block/add-block-users/' + this.userInfos.username)
        .then(res => {
          if (res.status === 201) {
            this.$router.push(`/block-users/${this.userInfos.username}?byMe=true`)
          }
        })
    },

		/**
		 *  showModal show the Modal
		 *
		 * @param ContentName it's the name of component child that the Modal must choose (ref in Modal.vue)
		 */
		showModal (ContentName) {
      this.modalIsShow = true
      this.modalContentName = ContentName
		},
	},
  created () {
	this.getLike()
	this.getPictures()
  }
}
</script>
