<template>
  <section class="section">
    <div class="vide is-hidden-desktop"></div>

    <div class="title">Ils ont liké ton profil</div>
    <div v-if="noImage" class="subtitle is-italic is-size-5 has-text-grey">
      Complète ton profil pour liker...
    </div>
    <div class="container" v-if="history">

      <div class="columns is-multiline">
        <div v-for="like in likes">
          <cardComponent :infos="like"></cardComponent>
        </div>
      </div>
    </div>

    <br/>
    <br/>
    <br/>


    <div class="title">Ils ont vu ton profil</div>
    <div v-if="noImage" class="subtitle is-italic is-size-5 has-text-grey">
      Complète ton profil pour liker...
    </div>
    <div class="container" v-if="history">

      <div class="columns is-multiline">
        <div v-for="hist in history">
          <cardComponent  :infos="hist"></cardComponent>
          <div class="has-text-black has-text-centered has-text-grey">{{  new Date(hist.view_at).toLocaleString() }}</div>
        </div>
      </div>
    </div>



  </section>

</template>

<script>
    import axios from 'axios'
    import cardComponent from './../components/cardComponent'

    export default {
        name: 'History',
        data () {
            return {
                noImage: null,
                history: [],
                likes: []
            }
        },
        components: {
            cardComponent
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
            getUserHistory () {
                axios.get('/users-history/get-history')
                    .then ((res) => {
                        if (res.status === 200) {
                            this.history = res.data.history
                        }
                    })
            },
            getUserLike () {
                axios.get('/likes/get-likes')
                    .then ((res) => {
                        if (res.status === 200) {
                            this.likes = res.data.likes
                        }
                    })
            }
        },
        created () {
		if (this.$session.exists() === false) {
			this.$router.push('/')
		} else {
            this.getUserHistory()
            this.getUserLike()
            this.getPictures()
		}
	}
}

</script>
