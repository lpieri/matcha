// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import axios from 'axios'
import VueSession from 'vue-session'
import VueGeolocation from 'vue-browser-geolocation';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**
 * Icons from Awesome Font
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserSecret,
  faQuoteLeft,
  faQuoteRight,
  faHandHoldingHeart,
  faEdit,
  faCamera,
  faCocktail,
  faDumbbell,
  faSignOutAlt,
  faHeart,
  faEye,
  faMapMarkerAlt,
  faFilm,
  faLaughBeam,
  faMusic,
  faEnvelope,
  faGlobe,
  faVenusMars,
  faUser,
  faBell,
  faBirthdayCake,
  faMinusCircle,
  faStar,
  faExclamationTriangle,
  faBan,
  faHistory,
  faComments,
  faCircle,
  faPencilAlt,
  faArrowDown,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons'

library.add(faHandHoldingHeart)
library.add(faUserSecret)
library.add(faQuoteLeft)
library.add(faQuoteRight)
library.add(faEdit)
library.add(faCamera)
library.add(faCocktail)
library.add(faDumbbell)
library.add(faSignOutAlt)
library.add(faHeart)
library.add(faEye)
library.add(faMapMarkerAlt)
library.add(faFilm)
library.add(faLaughBeam)
library.add(faMusic)
library.add(faEnvelope)
library.add(faGlobe)
library.add(faVenusMars)
library.add(faUser)
library.add(faBell)
library.add(faBirthdayCake)
library.add(faMinusCircle)
library.add(faStar)
library.add(faExclamationTriangle)
library.add(faBan)
library.add(faHistory)
library.add(faComments)
library.add(faCircle)
library.add(faPencilAlt)
library.add(faArrowDown, faArrowUp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VeeValidate)
Vue.use(VueSession)
Vue.use(VueGeolocation)

require('./scss/styles.sass');

Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.baseURL = process.env.BACK_URL
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.withCredentials = true
axios.defaults.headers.credentials = 'same-origin'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created () {
    navigator.geolocation
    if (this.$session.get('token')) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$session.get('token')}`
    }
  }
})
