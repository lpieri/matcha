<template>
  <div class="section" v-if="notifs">
    <div class="vide is-hidden-desktop"></div>
    <div v-for="(notif, index) in notifs" class="notification" :class="notif.vu ? 'is-show' : 'is-danger'"  @click="seeNotif(notif.id, index)">
      <a :href="notif.link">{{ notif.notif }}</a>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'NotifsMobile',
        data () {
            return {
                notifs: null,
                notifsRead: true,
            }
        },
        methods: {
            checkNotifRead () {
                this.notifsRead = true
                for (let i = 0; i < this.notifs.length; i++) {
                    if (this.notifs[i].vu === 0) {
                        this.notifsRead = false
                        break
                    }
                }
            },
            seeNotif (id, index) {
                axios.put('/users-notifs/set-see/' + id, {
                    data: {
                        username: this.$session.get('username'),
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            this.notifs[index].vu = 1
                            this.checkNotifRead()
                        }
                    })
            },
            getNotifs () {
                if (this.$session.get('username')) {
                    axios.get('/users-notifs/get-notifs/' + this.$session.get('username'))
                        .then((response) => {
                            if (response.status === 200) {
                                this.notifs = response.data
                                this.checkNotifRead()
                            }
                        })
                }
            },        },
        created () {
            this.getNotifs()
        }
    }
</script>
