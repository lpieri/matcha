<template>
  <div class="column">
    <div class="columns is-multiline is-left">
      <p class="title has-text-white">Critères Principaux</p>
      <br/>
    </div>

    <div class="columns is-multiline">

      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white">
              <font-awesome-icon icon="birthday-cake" size="2x" color="orange"/>
              &nbsp;Intervalle d'âge&nbsp;&nbsp;
              <font-awesome-icon :icon="ascA === true ? 'arrow-down' : 'arrow-up'" size="1x" color="white" @click="sortList('age')"/>
            </p>
          </label>

          <div class="columns center-columns slider">
            <p class="column has-text-white is-2 is-size-5">{{ ageInterval }} ans</p>
            <input class="column slider is-large is-circle" step="1" min="0" max="20" v-model="ageInterval" type="range">
          </div>
        </div>
      </div>


      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white">
              <font-awesome-icon icon="star" size="2x" color="rgb(240, 201, 196)"/>
              &nbsp; Popularité&nbsp;&nbsp;
              <font-awesome-icon :icon="ascP === true ? 'arrow-down' : 'arrow-up'" size="1x" color="white" @click="sortList('pop')"/>
            </p>
          </label>
          <div class="columns center-columns slider">
            <p class="column has-text-white is-2 is-size-5">{{ scoreInterval }}</p>
            <input class="column slider is-large is-circle" step="10" min="0" max="200" v-model="scoreInterval" type="range">
          </div>
        </div>
      </div>

    </div>

    <div class="columns is-multiline">
      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white">
              <font-awesome-icon icon="globe" size="2x" color="lightblue"/>
              &nbsp;Distance
            </p>
          </label>
          <div class="columns center-column slider">
            <p class="column has-text-white is-2 is-size-5">{{ distanceInterval }} km</p>
            <input class="column slider is-large is-circle" step="1" min="0" max="30" v-model="distanceInterval" type="range">
          </div>
        </div>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-medium is-success is-rounded" @click="saveSearch">Save</button>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'InputSearchSmall',
        data () {
            return {
                ageInterval: 5,
                distanceInterval: 5,
                scoreInterval: 50,
                ascA: true,
                ascP: true
        }
        },
        methods: {

            sortList (value) {
                if (value === 'pop') {
                    this.ascP = !this.ascP
                    this.$emit('sortList', {type: value, asc: this.ascP})
                } else if (value === 'age') {
                    this.ascA = !this.ascA
                    this.$emit('sortList', {type: value, asc: this.ascA})
                }
            },

            saveSearch () {
                let data = {
                    ageInterval: this.ageInterval,
                    distanceInterval: this.distanceInterval,
                    scoreInterval: this.scoreInterval,
                    sexualOrientation: this.sexualOrientation,
                    gender: this.gender,
                    city: this.city
                }
                this.$emit('saveGenSearch', data)
            }
        }
    }
</script>

<style>
  .center-columns {
    align-items: center;
  }
  @media screen and (min-width: 1023px) {
    .slider {
      width: 475px;
    }
  }


</style>
