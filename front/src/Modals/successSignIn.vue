<template>
  <div class="container is-centered">

	<div class="container" id="confirme-email-logo-container">
        <figure class="image is-128x128">
          <img src="../assets/logo_matcha_nav_bar.svg">
        </figure>
    </div>

    <h1 class="title">Un mail a été envoyé</h1>


    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button class="button is-rounded" @click="this.$parent.closeModal">Cancel</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SuccessSignIn'
}
</script>
