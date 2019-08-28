<template>
  <div class="column">

    <div class="columns is-multiline is-left">
      <p class="title has-text-white">Critères Pricipaux</p>

      <br/>
    </div>



  <div class="columns is-multiline">

      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white">
              <font-awesome-icon icon="birthday-cake" size="2x" color="orange"/>
              &nbsp;Intervalle d'age&nbsp;&nbsp;
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
						<p class="is-size-5 has-text-white"><font-awesome-icon icon="map-marker-alt" size="2x" color="rgba(141, 196, 73, 1)"/>
					&nbsp; Localisation </p>
				</label>
			<div class="field">
				<p class="control has-icons-left">
				<input class="input inputwidth" type="text" placeholder="Ville" v-model="city">
				<span class="icon is-small is-left">
					<font-awesome-icon icon="map-marker-alt" size="1x"/>
				</span>
					</p>
				</div>
			</div>
		</div>


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



    <div class="columns is-multiline">
      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white"><font-awesome-icon icon="user" size="2x" color="#D926D0"/>
              &nbsp;Genre </p>
          </label>
          <div class="field">
            <div class="control has-icons-left">
              <div class="select">
                <select v-model="gender" class="inputwidth">
                  <option>Femme</option>
                  <option>Homme</option>
                  <option>Non-binaire</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <font-awesome-icon icon="user" size="1x"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="field">
          <label class="label has-text-white">
            <p class="is-size-5 has-text-white"><font-awesome-icon icon="venus-mars" size="2x" color="#DDCE3E"/>
              &nbsp; Orientation </p>
          </label>
          <div class="field">
            <div class="control has-icons-left">
              <div class="select ">
                <select v-model="sexualOrientation" class="inputwidth">
                  <option value=""> {{ }}</option>
                  <option>Hétérosexuelle</option>
                  <option>Homosexuelle</option>
                  <option>Bisexuelle</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <font-awesome-icon icon="venus-mars" size="1x"/>
              </div>
            </div>
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
      name: 'InputSearch',
      data () {
          return {
              ageInterval: 5,
              distanceInterval: 5,
              scoreInterval: 50,
              sexualOrientation: 'Bisexuelle',
              gender: "Non-binaire",
              city: null,
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
    .inputwidth {
      min-width: 450px;
    }

    .slider {
      width: 475px;
    }
  }
</style>
