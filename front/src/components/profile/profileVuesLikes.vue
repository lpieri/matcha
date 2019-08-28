<template>

  <article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">

    <p class="subtitle">
      <font-awesome-icon icon="heart" size="1x" color="red"/>
      &nbsp;{{ userInfos.likes }} personnes ont liké ton profil.
    </p>
    <p class="subtitle">
      <font-awesome-icon icon="eye" size="1x" color="Dodgerblue"/>
      &nbsp;Ton profil a été vu {{ userInfos.views }} fois.
    </p>

  </article>

</template>

<script>
export default {
	name: 'ProfileVuesLikes',
  props: {
	  userInfos: null,
    isMe: null
  }
}
</script>

