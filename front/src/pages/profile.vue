<template>
  <div class="container" v-if="userInfos">
    <div class="section" id="banniere"></div>
    <div class="container" id="photo"></div>
    <!------------------HEADER---------------------->
    <ProfileId :user-infos="userInfos" :is-me="isMe"></ProfileId>
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child box">

              <p class="title" v-if="isMe">MON PROFIL</p>
              <p class="title" v-else>{{ userInfos.username.toUpperCase() }}</p>

              <div class="tile is-ancestor">
                <div class="tile is-vertical">
                  <div class="tile">
                    <div class="tile is-parent is-vertical">
                      <ProfileTagBar :user-infos="userInfos" :is-me="isMe"></ProfileTagBar>
                      <ProfileVuesLikes :user-infos="userInfos" :is-me="isMe"></ProfileVuesLikes>
                    </div>
                    <ProfileBio :user-infos="userInfos" :is-me="isMe"></ProfileBio>
                  </div>
                </div>
              </div>

              <div class="tile is-ancestor">
                <div class="tile is-parent">
                  <ProfilePopularity :user-infos="userInfos" :is-me="isMe"></ProfilePopularity>
                </div>
                <div class="tile is-parent is-8">
                  <ProfileAboutMe :user-infos="userInfos" :is-me="isMe"></ProfileAboutMe>
                </div>
              </div>

              <div class="tile is-ancestor">
                <ProfileLocalisation :user-infos="userInfos" :is-me="isMe"></ProfileLocalisation>
              </div>
              <ProfileMatch v-if="isMe" :user-infos="userInfos" :is-me="isMe"></ProfileMatch>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-else></div>
</template>

<script>
import axios from 'axios'
import ProfileTagBar from '../components/profile/profileTagBar'
import ProfileId from '../components/profile/profileId'
import ProfileBio from '../components/profile/profileBio'
import ProfileVuesLikes from '../components/profile/profileVuesLikes'
import ProfilePopularity from '../components/profile/profilePopularity'
import ProfileAboutMe from '../components/profile/profileAboutMe'
import ProfileSearch from '../components/profile/profileLookingFor'
import ProfileLocalisation from '../components/profile/profileLocalisation'
import ProfileMatch from '../components/profile/profileMatch'

export default {
	name:'Profile',
  data () {
	  return {
			userInfos: null,
			isMe: null
    }
  },
	components: {
		ProfileTagBar,
		ProfileId,
		ProfileBio,
		ProfileVuesLikes,
		ProfilePopularity,
		ProfileAboutMe,
		ProfileSearch,
		ProfileLocalisation,
		ProfileMatch
	},
  methods: {
	  getInfos (username2get) {
      axios.get('/users-infos/get-infos/' + username2get)
        .then(response => {
          if (response.status === 200) {
            if (response.data.blockedTo === true || response.data.blockedBy === true) {
              if (response.data.blockedTo === true) {
                return this.$router.push(`/block-users/${response.data.username}?byMe=${response.data.blockedTo}`)
              } else {
                this.$router.push('/profile/' + this.$session.get('username'))
              }
            } else {

              this.userInfos = response.data

              if (this.userInfos.last_connect != null) {
                this.userInfos.last_connect = new Date(this.userInfos.last_connect).toUTCString()
              }

              if (this.userInfos.username === this.$session.get('username')) {
                this.isMe = true
              } else {

                this.isMe = false
                axios.put('users-popularity/add-views/' + this.userInfos.username)
                  .then((res) => {
                    if (res.status === 200) {
                      this.userInfos.score = res.data.score
                      this.userInfos.views = res.data.views
                    }
                  })

                axios.post('/users-notifs/create/' + this.userInfos.username, {
                  data: {
                    reason: 'visite'
                  }
                })

                axios.post('/users-history/add-history/' + this.userInfos.username, {
                  data: {
                    from_username: this.$session.get('username'),
                    to_username: this.userInfos.username
                  }
                })
              }
            }
          }
        })
    }
  },
  created () {
		this.userInfos = null
		this.getInfos(this.$route.params.username)
	},
	beforeRouteUpdate (to, from, next) {
		this.userInfos = null
		this.getInfos(to.params.username)
		next();
  }
}
</script>

<style>

#box {
	width: 800px;
	padding:40px;
	margin: 50px auto;
	background:burlywood;
}

#header_profile {
	background-image: url(../assets/banniere.jpg);
	background-size: cover;
	color: white;
}
#banniere {
 height: 200px;
 background-image: none;
}
#photo {
	height: 100%;
	width: 500px;
	background-color: none;
}
.p {
	color: white;
}
</style>
