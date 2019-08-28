<template>
<body>

	<div class="section" id="love">
		<div id="description">
			<div class="mainTitle"><p id="top">Matchez Discutez</p> <br><b>VOUS</b> trouver</div>
		</div>
	</div>

	<div class="section trapeze"></div>

	<section>
			<transition appear name="slide">
				<Quote></Quote>
			</transition>

			<div class="transition-example">
				<transition appear name="leftslide">
				<ImageSlider></ImageSlider></transition>
			</div>
	</section>

	<div>
		<Explaination></Explaination>
	</div>

	<div id="white"></div>
	<div id="white"></div>

	<section class="hero has-background-light">
		<div class="hero-body is-centered">
			<section class="is-centered">
			<div class="title is-centered is-flex-mobile is-flex-tablet">
				Inscrivez-vous vite et commencez à matchez !
			</div>
			</section>
		</div>

		<div class="container">
			<div class="exemple_user">
				<CardIndex></CardIndex>
			</div>
		</div>
	</section>


	<div id="white"></div>
	<div id="white"></div>


	<div class="trapeze"></div>
	<div class="rect"></div>


</body>
</template>

<script>
import axios from 'axios'
import CardIndex from '../components/card_index'
import Quote from '../components/quote'
import Explaination from '../components/explaination'
import ImageSlider from '../components/imageSlider'

export default {
	name: 'Index',
	components: {
		CardIndex,
		Quote,
		Explaination,
		ImageSlider
	}
}

</script>

<style>


.slide-enter-active {
  transition: transform 1s ease;
}

.slide-enter {
  transform: translateX(-50%);
}

.leftslide-enter-active {
  transition: transform 1s ease;
}

.leftslide-enter {
  transform: translateX(50%);
}

.transition-example {
    justify-content: center;
	display: grid;
}


.mainTitle {
	position: relative;
	left: 400px;
	width: 200px;
	line-height: 90px;
	border: solid 50px transparent;
}

#description {
	display: flex;
	align-items: center;
	color: white;
	font-size: 101px;
	font-family: 'Gill Sans Medium';
}

.exemple_user {
	display: flex;
	border: solid 50px transparent;
}

#love {
  background-position: center;
  background-image: url("../assets/lover_index.jpeg");
  background-size: cover;
  display: flex;
	justify-content: center;
	height: 1000px;
}

#white {
	height: 150px;;
}

.trapeze {
	width: auto;
	height: 300px;
	transform-origin: top-right;
	transform: skew(0deg,4deg);
	background-color: white;
	margin: -100px;
	z-index:1;
}

.notification{
	z-index: 4;
}

.main {
	height: 500px;
	width: 100%;
	z-index:3;
	/* position: absolute; */
}

.rect {
	width: auto;
	height: 500px;
	background-color: rgb(250, 218, 223);
	z-index:2;
}
</style>
