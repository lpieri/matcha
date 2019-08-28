<template>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'GeneratorPage',
    created () {
      if (this.$route.params.counter) {
        const counter = this.$route.params.counter
        axios.get(`/generator/${counter}`)
        this.$router.push('/')
      }
    }
  }
</script>
