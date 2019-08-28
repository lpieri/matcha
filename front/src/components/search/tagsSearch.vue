<template>
<div class="column">
<p class="title has-text-white">Centre d'intérêts</p>
  <div class="columns is-multiline ">
	<div class="column is-half">
    <div class="box has-background-grey is-inline-block  beforeTags">
      <button class="button is-rounded is-small is-green" v-for="(tag, index) in tags" @click="openTag(tag, index)">
        <font-awesome-icon :icon="tag.picture_tag" size="1x"/>
        &nbsp;{{ tag.name_tag }}
      </button>

	</div>
  </div>

		<div class="column auto">
		<div class="box has-background-grey tags">
		<transition name="fade">
			<div class="block">
			<button @click="deleteTag(index, searchTag)" class="button has-background-white-ter is-rounded is-small" v-for="(searchTag, index) in sTags">
				<font-awesome-icon :icon="searchTag.user_picture_tag" size="1x" color="grey"/>
				&nbsp;{{ searchTag.user_name_tag }}&nbsp;
				<button class="delete is-small"></button>
			</button>
			</div>
		</transition>
		</div>
	</div>
	</div>


	<div class="field is-grouped is-grouped-right">
		<div class="control">
			<button class="button is-medium is-success is-rounded" @click="saveTags">Save</button>
		</div>
	</div>

</div>
</template>

<script>
  import axios from 'axios'

  export default {
      name: 'TagsSearch',
      data () {
        return {
            tags: null,
            sTags: [],
            searchTags: []
        }
      },
      methods: {

          openTag(tag, index) {
              this.sTags.push({user_name_tag: tag.name_tag, user_picture_tag: tag.picture_tag})
              this.searchTags.push(tag.name_tag)
              this.tags.splice(index, 1)
          },

          getATags () {
              axios.get('/tags/get-all-tags')
                  .then(res => {
                      if (res.status === 200) {
                          this.tags = res.data.tags
                      }
                  })
          },

          saveTags () {
              let tags = this.searchTags
              this.$emit('saveTagSearch', tags)
          },

          deleteTag(id, tag) {
              this.sTags.splice(id, 1)
              this.searchTags.splice(id, 1)
              this.tags.push({name_tag: tag.user_name_tag, picture_tag: tag.user_picture_tag})
          },
      },
      created () {
          this.getATags()
      }
  }
</script>

<style>

  @media screen and (min-width: 1023px) {
    .beforeTags {
      min-height: 250px;
      min-width: 450px;
      max-width: 475px;
    }
    .tags {
      min-height: 250px;
      min-width: 450px;
      max-width: 475px;
    }
  }

</style>
