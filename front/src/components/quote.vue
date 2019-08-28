<template>
		<div class="container is-flex-mobile is-flex-tablet">
					<figure class="image is-128x128">
						<img class="is-rounded" id="is-round" src="../assets/slide_img_1.jpeg">
					</figure>

					<div id="carde">
						<p class="title">
						<font-awesome-icon icon="quote-left"/>
						C'est grace à Matcha que Anthony et moi nous nous sommes rencontrés, aujourd'hui j'attends mon premier enfant !
						<font-awesome-icon icon="quote-right"/>
						</p>
					</div>
			</div>

</template>

<script>
export default {
	name: 'Quote'
}
</script>

<style>
#is-round {
	position: relative;
	top: 100px;
	left: 450px;
	z-index: -1;
}
#carde {
	width: 300px;
	height: 300px;
	margin: 4rem;
}
</style>
