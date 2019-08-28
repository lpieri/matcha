<template>
  <article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">
    <p class="title">Ce que j'aime</p>
    <div v-if="isMe" class="box">
      <button
        class="button is-rounded is-small is-green"
        v-for="(tag, index) in tags"
        v-if="!userTags.includes(tag)"
        @click="openTag(tag, index)">
        <font-awesome-icon :icon="tag.picture_tag" size="1x" />
        &nbsp;{{ tag.name_tag }}
      </button>
    </div>

    <div v-if="isMe" class="box">
      <transition name="fade">
        <div class="block tags">
          <button
            @click="deleteTag(index, userTag)"
            class="button has-background-white-ter is-rounded is-small"
            v-for="(userTag, index) in userTags"
            v-if="userTags && isMe">
            <font-awesome-icon :icon="userTag.user_picture_tag" size="1x" color="grey" />
            &nbsp;{{ userTag.user_name_tag }}&nbsp;
            <button class="delete is-small" v-if="isMe"></button>
          </button>
        </div>
      </transition>
    </div>
    <div v-else class="box">
      <div class="block tags">
        <span
          class="tag is-rounded is-small has-background-white-ter"
          v-for="userTag in userTags"
          v-if="userTags">
          <font-awesome-icon :icon="userTag.user_picture_tag" size="1x" color="gray" />
          &nbsp;{{ userTag.user_name_tag }}&nbsp;
        </span>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileTagBar",
  data() {
    return {
      tags: [],
      userTags: []
    };
  },
  props: {
    userInfos: null,
    isMe: null
  },
  methods: {
    openTag(tag, index) {
      let data = {
        userNameTag: tag.name_tag,
        userPictureTag: tag.picture_tag
      };
      axios
        .post("/users-tags/add-users-tags/" + this.userInfos.username, {
          data: data
        })
        .then(res => {
          if (res.status === 201) {
            this.userTags.push({
              user_name_tag: tag.name_tag,
              user_picture_tag: tag.picture_tag
            });
            this.tags.splice(index, 1);
          }
        });
    },

    deleteTag(id, userTag) {
      this.userTags.splice(id, 1);
      this.tags.push({
        name_tag: userTag.user_name_tag,
        picture_tag: userTag.user_picture_tag
      });

      let data = {
        id: userTag.id
      };
      axios.put("/users-tags/delete-users-tags/" + this.userInfos.username, {
        data: data
      });
    },

    getUserTags() {
      axios
        .get("/users-tags/get-users-tags/" + this.userInfos.username)
        .then(response => {
          if (response.status === 200) {
            this.userTags = response.data.userTags;
          }
        });
    }
  },
  created() {
    axios.get(`/tags/get-all/${this.userInfos.username}`).then(response => {
      if (response.status === 200) {
        this.tags = response.data.tags;
      }
    });
    this.getUserTags();
  }
};
</script>
