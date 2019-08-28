<template>
  <article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">
    <p class="title">Ma popularité</p>
    <p class="subtitle">Up ta popularité en te rendant plus visible</p>
    <div class="content">
      <progress
        class="progress is-large is-success"
        :value="userInfos.score"
        max="100"
      >{{ userInfos.score }}</progress>
    </div>
  </article>
</template>

<script>
export default {
  name: "ProfilePopularity",
  props: {
    userInfos: null,
    isMe: null
  }
};
</script>
