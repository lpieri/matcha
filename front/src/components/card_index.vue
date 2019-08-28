<template>

<div class="container is-flex-tablet is-flex-mobile">

	<div class="card">
		<div class="card-image">
			<figure class="image is-4by5">
				<img id="img" class="portait" src="../assets/Laura_S.jpg" alt="Placeholder image">
			</figure>
			<button class="class-set-like">
				<font-awesome-icon icon="heart" color="red" size="2x"/>
			</button>
			<button class="class-set-msg">
				<font-awesome-icon icon="comments" color="#3787EE" size="2x"/>
			</button>

		</div>


			<div>
				<div>
					<p class="title is-5 has-text-centered has-text-black">
						Laura Sabbah
					</p>
					<p class="subtitle is-6 has-text-centered has-text-black">32 ans • Paris</p>
				</div>
			</div>
	</div>


	<div class="card">
		<div class="card-image">
			<figure class="image is-4by5">
				<img id="img" class="portait" src="../assets/Thomas_L.jpg" alt="Placeholder image">
			</figure>
			<button class="class-set-like">
				<font-awesome-icon icon="heart" color="red" size="2x"/>
			</button>
			<button class="class-set-msg">
				<font-awesome-icon icon="comments" color="#3787EE" size="2x"/>
			</button>

		</div>


			<div>
				<div>
					<p class="title is-5 has-text-centered has-text-black">
						Thomas Lemay
					</p>
					<p class="subtitle is-6 has-text-centered has-text-black">28 ans • Lille</p>
				</div>
			</div>
	</div>

	<div class="card">
		<div class="card-image">
			<figure class="image is-4by5">
				<img id="img" class="portait" src="../assets/Jeanne_D.jpg" alt="Placeholder image">
			</figure>
			<button class="class-set-like">
				<font-awesome-icon icon="heart" color="red" size="2x"/>
			</button>
			<button class="class-set-msg">
				<font-awesome-icon icon="comments" color="#3787EE" size="2x"/>
			</button>

		</div>


			<div>
				<div>
					<p class="title is-5 has-text-centered has-text-black">
						Jeanne Dufy
					</p>
					<p class="subtitle is-6 has-text-centered has-text-black">24 ans • Paris</p>
				</div>
			</div>
	</div>

</div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'CardIndex',
	data () {
		return {
		}
	},
	methods: {
	},

}

</script>


<style>
#img {
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
}
.card {
	background: white;
	margin: 20px;
	max-width: 250px;
	min-width: 250px;
	max-height: 250px;
	min-height: 450px;
	border-radius: 20px;
	border: none;
	box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
}

.class-set-like {
	border-radius: 9999px;
	height: 60px;
	width: 60px;
	text-align: center;
	position: relative;
	top: -30px;
	left: 50px;
	border: none;
	box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
}
.class-set-msg {
	border-radius: 9999px;
	height: 60px;
	width: 60px;
	text-align: center;
	position: relative;
	top: -30px;
	left: 80px;
	border: none;
	box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.2);
}
</style>
