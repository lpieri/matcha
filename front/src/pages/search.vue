<template>
  <section class="section is-centered">
    <div class="vide is-hidden-desktop"></div>
    <div class="container is-centered">
      <div class="has-background-grey-dark box is-centered">
        <InputSearch @saveGenSearch="newDataSearch" @sortList="sortInfos"></InputSearch>
        <TagsSearch @saveTagSearch="newTagsSearch"></TagsSearch>
      </div>

      <div class="columns is-multiline">
        <div v-for="info in infos">
          <cardComponent  :infos="info"></cardComponent>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  import InputSearch from '../components/search/inputSearch'
  import TagsSearch from '../components/search/tagsSearch'
  import cardComponent from "../components/cardComponent";

  export default {
    name: 'Search',
    components: {
        TagsSearch,
        InputSearch,
        cardComponent
    },
    data () {
      return {
          data: null,
          tags: null,
          infos: [],
          orderKey: 'age'
      }
    },
    methods: {

        compareAAge (a, b) {
          if (a.age > b.age) {
              return 1
          } else if (a.age === b.age) {
              return 0
          } else {
              return -1
          }
        },

        compareDAge (a, b) {
            if (a.age > b.age) {
                return -1
            } else if (a.age === b.age) {
                return 0
            } else {
                return 1
            }
        },

        compareAScore (a, b) {
            if (a.score > b.score) {
                return 1
            } else if (a.score === b.score) {
                return 0
            } else {
                return -1
            }
        },

        compareDScore (a, b) {
            if (a.score > b.score) {
                return -1
            } else if (a.score === b.score) {
                return 0
            } else {
                return 1
            }
        },


        sortInfos (data) {
          if (data.type === 'pop') {
              this.infos.sort((data.asc === true) ? this.compareAScore : this.compareDScore)
          } else if (data.type === 'age') {
              this.infos.sort((data.asc === true) ? this.compareAAge : this.compareDAge)
          }
        },

        search () {
            axios.get('/search/get-search/', {
                params: {
                    data: this.data,
                    tags: this.tags
                },
            })
                .then(res => {
                    if (res.status == 200) {
                      this.infos = res.data
                    }
                })
        },

        newDataSearch (data) {
            this.data = data
            this.search()
        },

        newTagsSearch (tags) {
            this.tags = tags
            this.search()
        }

    },
    created () {
      if (this.$session.exists() === false) {
          this.$router.push('/')
      }
    }
  }
</script>

<style>
  #search-logo-container {
    display: grid;
    justify-items: center;
    justify-content: center;
    padding: 20px;

  }

  .search {
    padding: 40px;
    margin: 0px;
    width: 100%;
    border: none;
    height: 600px;
  }

  .search-button-tag {
    margin: 0px 0px 10px 0px;
  }

  #search-box-tags {
    display: flex;
    flex-flow: column;
    align-items: center;
    height: 101px;
    overflow: auto;
  }

  .changeInput {
    width: 190px;
  }

</style>
