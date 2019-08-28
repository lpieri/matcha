<template>
  <div id="main">
    <br>
    <div id="slider"></div>
    <br>
    <input id="slider-input" v-model="third" v-on:change="updateSlider" />
  </div>
</template>

<script>
  export default {
    name: 'Slider',
    data () {
      return {
        minRange: 40,
        slider: {
          min: 0,
          max: 100,
          start: 40,
          step: 1
        },
        Slider: document.getElementById('slider')
      }
    },
    methods () {
      updateSlider: function updateSlider() {
          this.Slider.noUiSlider.set(this.minRange)
      }
      ready: function ready() {
          noUiSlider.create(this.Slider, {
          start: this.slider.start,
          step: this.slider.step,
          range: {
            'min': this.slider.min,
            'max': this.slider.max
          }
        });
      }
    }

  }
</script>


