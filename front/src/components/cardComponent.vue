<template>
  <section>
    <div class="card">
      <div class="card-image">
        <router-link :to="'/profile/' + infos.username">
          <figure class="image is-4by4">
            <img
              id="img"
              class="portait"
              :src="require(`./../../../back/UsersPhotos/pictures/${infos.pic}`)"
              alt="Placeholder image"
            />
          </figure>
        </router-link>
        <!-- <button v-if="" class="class-set-like" @click="">
			<font-awesome-icon icon="heart" color="grey" size="2x"/>
        </button>-->

        <button
          v-if="infos.liked"
          :class="infos.matched ? 'class-set-unlike' : 'class-set-like'"
          @click="unlikeUsers(infos)"
        >
          <font-awesome-icon icon="heart" color="red" size="2x" />
        </button>

        <button v-else-if="noImage === false" class="class-set-like" @click="likeUsers(infos)">
          <font-awesome-icon icon="heart" color="pink" size="2x" />
        </button>

        <router-link v-if="this.$session.exists() === true || userConnect === true" to="/chat">
          <button v-if="infos.matched" class="class-set-msg">
            <font-awesome-icon icon="comments" color="#91DED0" size="2x" />
          </button>
        </router-link>
      </div>

      <div>
        <div>
          <p class="title is-5 has-text-centered">{{ infos.first_name}} {{infos.last_name}}</p>
          <p class="subtitle is-6 has-text-centered">{{infos.age}} • {{infos.localization}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "CardComponent",
  data() {
    return {
      noImage: null
    };
  },
  props: {
    infos: null
  },
  methods: {
    getPictures() {
      axios
        .get("/users-photos/get-all/" + this.$session.get("username"))
        .then(res => {
          if (res.status === 200) {
            this.images = res.data.images;
            this.count_pic = res.data.count_pic;
            if (this.count_pic === 0) {
              this.noImage = true;
            } else {
              this.noImage = false;
            }
          }
        });
    },

    unlikeUsers(infos) {
      axios
        .post("/likes/unlike", {
          data: {
            from_username: this.$session.get("username"),
            to_username: infos.username
          }
        })
        .then(res => {
          if (res.status === 200) {
            infos.liked = false;
            infos.matched = false;

            axios.post("/users-chat/delete-room", {
              data: {
                username_1: this.$session.get("username"),
                username_2: this.infos.username
              }
            });

            axios.put("users-popularity/remove-likes/" + infos.username);

            axios.post("/users-notifs/create/" + infos.username, {
              data: {
                reason: "unlike"
              }
            });
          }
        });
    },

    likeUsers(infos) {
      axios
        .post("/likes/like", {
          data: {
            from_username: this.$session.get("username"),
            to_username: infos.username
          }
        })
        .then(res => {
          if (res.status === 201) {
            infos.liked = true;
            let reason = "like";
            if (res.data.matched === true) {
              infos.matched = true;
              reason = "match";

              axios.post("/users-chat/new-room", {
                data: {
                  username_1: this.$session.get("username"),
                  username_2: this.infos.username
                }
              });
            }

            axios.put("users-popularity/add-likes/" + infos.username);

            axios.post("/users-notifs/create/" + infos.username, {
              data: {
                reason: reason
              }
            });
          }
        });
    }
  },
  created() {
    this.getPictures();
  }
};
</script>

<style>
#img {
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
</style>
