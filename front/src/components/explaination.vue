<template>
<div class="section">
	<div class="columns" id="love_pres">




		<div class="columns is-one-third" id="center_elem">
			<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			<font-awesome-icon icon="hand-holding-heart" size="6x" color="hsl(348, 100%, 61%)"/>
			<p class="content is-large"><b>Dites-nous qui vous êtes !</b></p>
			<p class="content is-medium is-one-third" id="size">Présentez-vous, votre age, votre genre, ce que vous cherchez, bref... une bio courte et efficace ! N'oubliez pas de partager ce que vous aimez et des photos!</p>
			<p class="content is-medium is-one-third" id="size"><b>8 millions de couples se sont déjà formés sur Matcha; soyez le prochain !</b></p>
			<button class="button is-rounded is-medium is-success is-danger" @click="showModal('SignUpForm')">
				<strong>Sign up</strong>
			</button>
			<div class="columns is-one-third" id="center_elem">
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
			<img id="image_2" src="../assets/hand_using.jpg" alt="Image">
			</div>
		</div>






		<div id="center_colum">
			<div class="columns is-one-third" id="center_elem">
				<img id="image_1" src="../assets/expla_pic.jpeg" alt="Image">
				<br/>
			</div>

			<div id="carde">
			<div class="columns is-one-third" id="center_elem">
				<img src="../assets/logo_m.svg" alt="logo_matcha" id="logo"/>
			</div>
				<p class="content is-large"><b>Recherchez... MATCHEZ !</b></p>
				<p class="content is-medium" id="text">Recherchez la personne qu'il vous faut en fonction de vos affinités. Découvrez notre sélection personnalisée de profils détaillés pour vous.</p>
			</div>
		</div>


	</div>


	<div class="is-centered">
  		<Modal :isShowArg="modalIsShow" :childArg="modalContentName" @changeModalContentName="modalContentName = $event" @changeModalIsShow="modalIsShow = $event"></Modal>
	</div>


</div>
</template>


<script>
import Modal from '../Modals/modal'

export default {
	name:"Explaination",
	data () {
		return {
		  modalIsShow: false,
      modalContentName: null
		}
  },
 	components: {
    	Modal
  },
  methods: {

    /**
     *  showModal show the Modal
     *
     * @param ContentName it's the name of component child that the Modal must choose (ref in Modal.vue)
     */
    showModal (ContentName) {
      this.modalIsShow = true
      this.modalContentName = ContentName
    }
  }
}


</script>

<style>

#center_elem {
	flex-flow: column;
    align-items: center;
	border: solid 20px transparent;
}
#size {
	width: 300px;
	align-self: center;
	text-align: justify;
}
#love_pres {
	align-items: center;
	justify-content: center;
}
#grey {
	border: solid 20px transparent;
	margin: 60px;
}

#image_1 {
	border-radius: 20px;
	height: 600px;
	width: auto;
}

#image_2 {
	border-radius: 20px;
	height: 600px;
	width: auto;
}
</style>
