<template>
  <body>
  <div class="section">
  <div class="vide is-hidden-desktop"></div>
    <div class="container is-centered">

      <div class="title is-centered">
        <h3>Chat Group</h3>
        <hr>
      </div>

      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div class="content">
              <p class="title">My friends </p>
              <hr has-text-white>
              <div class="friends content" v-for="(friend, index) in friends" :key="index" @click="changeConversation(friend)">

                &nbsp;
                <figure class="image is-48x48">
                  <img class="is-rounded" :src="require(`./../../../back/UsersPhotos/pictures/${friend.pic}`)"/>
                </figure>
                <p class="has-text-weight-bold">{{ friend.first_name}} {{ friend.last_name}}</p>

              </div>
            </div>
          </article>
        </div>

        <div class="tile is-vertical is-8">
          <div class="tile">

            <div class="tile is-parent">
              <article class="tile is-child notification conversation box">
                <p class="title">Conversation</p>


                <div class="window has-background-white scroll box" id="messageBody">

                  <div class="messages"  v-for="(msg, index) in messages" :key="index">
                    <div class="bulleMsg is-flex-tablet is-flex-mobile">
                      &nbsp;
                      <figure class="image is-48x48">
                        <img class="is-rounded" :src="require(`./../../../back/UsersPhotos/pictures/${msg.pic}`)"/>
                      </figure>
                      <p class="has-text-weight-bold">
                        &nbsp;{{ msg.username }}
                      </p>
                      <p>
                        &nbsp;{{ msg.message }}
                      </p>
                    </div>
                  </div>

                </div>
              </article>
            </div>
          </div>
          <div class="tile is-parent">
            <article class="tile is-child notification box">
              <p class="title"></p>
              <div class="content">

                <form @submit.prevent="sendMessage">
                  <div class="field is-grouped">
                    <p class="control is-expanded has-icons-left">
                      <input class="input" type="text" v-model="message" placeholder="Send your message...">
                      <span class="icon is-small is-left">
                        <font-awesome-icon icon="pencil-alt" size="1x"/>
                      </span>

                    </p>
                    <p class="control">
                      <button class="button is-info" :disabled="message === ''">
                        Send
                      </button>
                    </p>
                  </div>
                </form>

              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
    import io from 'socket.io-client'
    import axios from 'axios'
    export default {
        data() {
            return {
                user: this.$session.get('username'),
                message: '',
                id_room: null,
                to_user: this.to_user,
                messages: [],
                infos_messages: null,
                socket : io('localhost:3001'),
                friends: []
            }
        },
        props: {
            isMe: null,
            infos: null
        },
        methods: {
            sendMessage(e) {
                e.preventDefault();
                if (this.id_room != null) {
                    this.socket.emit('SEND_MESSAGE', {
                        username: this.user,
                        message: this.message,
                        id_room: this.id_room
                    });
                    this.message = ''
                }
            },
            changeConversation(friend) {
                this.infos_messages = friend
                if (friend != null) {
                    this.socket.emit('sendIdRoom', {
                        id: friend.id
                    });
                    this.socket.on('RECEIVE_MESSAGE', (data) => {
                        this.messages = [...data]
                        this.id_room = friend.id
                    });
                }
            },

        },
        mounted() {
            this.socket.on('MESSAGE', (data) => {
				this.messages = [...this.messages, data];
				let notif_username = (data.username === this.infos_messages.username_1) ? this.infos_messages.username_2 : this.infos_messages.username_1
				if (notif_username != this.$session.get('username')) {
					axios.post('/users-notifs/create/' + notif_username, {
						data: {
							reason: 'message'
						}
					})
				}
            });

        },
        updated() {
            var messageBody = document.querySelector('#messageBody')
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
        },
        created () {

            // axios.put('/users-notifs/update-msg-notifs/' + this.$session.get('username'))
            //     .then((res) => {
            //         if (res.status === 200) {
            //             message: 'Notif message seen'
            //         }
			//     })

			if (this.$session.exists() === false) {
			this.$router.push('/')
			}

            this.socket.emit('GET_MESSAGE', {
                id_room: this.id_room
            });
            this.socket.on('RECEIVE_MESSAGE', (data) => {
                this.messages = [...data.reverse()]
            });

            this.socket.emit('GET_USERNAME', {
                user: this.user,
                to_user: this.to_user
            });
            this.socket.on('GET_IDROOM', (data) => {
                this.infos_messages = data[0]
                // console.log(this.infos_messages)
            });

            this.socket.emit('getMyFriends', {
                user: this.user,
                to_user: this.to_user
            });
            this.socket.on('getIdRoom', (data) => {
                this.friends = data
                this.changeConversation(data[0])
                // console.log(this.friends)
			});



        }
    }

</script>

<style>
  .friends {
    display: flex;
    align-content: center;
  }

  .bulleMsg {
    margin: 5px;
  }
  .messages {
    display: flex;
    align-items: center;
  }

  .conversation {
    height: 650px;
  }

  .window {
    height: 500px;
    background-color: white;
    border-radius: 15px;
    overflow-y: scroll;
  }

  .list {
    width: 80px;
  }
</style>

ˆ
