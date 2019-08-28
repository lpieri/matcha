<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">


      <article class="tile is-child has-background-grey-dark box is-hidden-touch">
        <div class="">
          <div class="" v-if="(userInfos.bio !== '' || userInfos.bio !== NULL) && !noImage && getTags.length !== 0" class="column is-fullwidth">
            <p class="title has-text-white is-fullwidth">Match with...</p>
            <div class="has-background-grey-dark box">
              <InputSearchSmall @saveGenSearch="newDataSearch" @sortList="sortInfos"></InputSearchSmall>
            </div>
            <div class="columns is-multiline">
              <div v-for="info in infos">
                <cardComponent  :infos="info"></cardComponent>
              </div>
            </div>
          </div>
          <div v-else class="subtitle is-italic is-size-5 has-text-grey-lighter">Complète ton profil pour voir tes Matchas</div>
        </div>
      </article>
      <article class="is-hidden-desktop">
        <div class="">
          <div class="" v-if="(userInfos.bio !== '' || userInfos.bio !== NULL) && !noImage && getTags.length !== 0" class="column is-fullwidth">
            <p class="title has-text-dark is-fullwidth">
              Match with...
            </p>
            <div class="has-background-grey-dark box">
              <InputSearchSmall @saveGenSearch="newDataSearch" @sortList="sortInfos"></InputSearchSmall>
            </div>
            <div class="columns is-multiline">
              <div v-for="info in infos">
                <cardComponent  :infos="info"></cardComponent>
              </div>
            </div>
          </div>
          <div v-else class="subtitle is-italic is-size-5 has-text-grey-lighter">Complète ton profil pour voir tes Matchas</div>
        </div>
      </article>


    </div>
  </div>
</template>

<script>
    import cardComponent from './../cardComponent'
    import InputSearchSmall from '../search/inputSearchSmall'
    import axios from 'axios'

    export default {
        name: 'ProfileMatch',
        props: {
            userInfos: null,
            isMe: null
        },
        data () {
            return {
                data: null,
                infos: null,
                noImage: null,
                getTags: this.getUserTags
            }
        },
        components: {
            cardComponent,
            InputSearchSmall
        },
        methods: {

            compareAAge (a, b) {
                if (a.age > b.age) {
                    return 1
                } else if (a.age === b.age) {
                    return 0
                } else {
                    return -1
                }
            },

            compareDAge (a, b) {
                if (a.age > b.age) {
                    return -1
                } else if (a.age === b.age) {
                    return 0
                } else {
                    return 1
                }
            },

            compareAScore (a, b) {
                if (a.score > b.score) {
                    return 1
                } else if (a.score === b.score) {
                    return 0
                } else {
                    return -1
                }
            },

            compareDScore (a, b) {
                if (a.score > b.score) {
                    return -1
                } else if (a.score === b.score) {
                    return 0
                } else {
                    return 1
                }
            },


            sortInfos (data) {
                if (data.type === 'pop') {
                    this.infos.sort((data.asc === true) ? this.compareAScore : this.compareDScore)
                } else if (data.type === 'age') {
                    this.infos.sort((data.asc === true) ? this.compareAAge : this.compareDAge)
                }
            },

            search () {
                axios.get('/search/get-search/', {
                    params: {
                        data: this.data,
                    },
                })
                    .then(res => {
                        if (res.status == 200) {
                            this.infos = res.data
                        }
                    })
            },

            newDataSearch (data) {
                this.data = data
                this.search()
            },

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
            getUserTags() {
                axios.get('/users-tags/get-users-tags/' + this.userInfos.username)
                    .then ((response) => {
                        if (response.status === 200) {
                            this.getTags = response.data.userTags
                        }
                    })
            }
        },
        created () {
            this.search()
            this.getPictures()
            this.getUserTags()
        }
    }
</script>
