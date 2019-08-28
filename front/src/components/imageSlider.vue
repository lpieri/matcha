<template>
		<div class="container is-flex-tablet is-flex-mobile">

					<figure class="image is-256x256">
						<img class="is-rounded" id="is-round_2" src="../assets/2.jpg">
					</figure>

					<div id="carde_2">
						<p class="is-size-3 has-text-weight-semibold has-text-white">
						<font-awesome-icon icon="quote-left"/>
						</p>
						<p class="is-size-5 has-text-weight-bold has-text-white">Les rencontres sur internet peuvent être
						magnifiques et laisser place à une merveilleuse histoire et
						pourtant je n’y croyais plus après tous les « beaux parleurs » que j’avais rencontrés.</p>
						<p class="is-size-3 has-text-weight-semibold has-text-white">
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
#is-round_2 {
	position: relative;
	top: -40px;
	left: 450px;
	z-index: -1;
}

#is-round_3 {
	position: relative;
	top: -10px;
	left: 470px;
	z-index: 0;
}
#carde_2 {
	width: 1000px;
	height: 200px;
	margin: 4rem;
}
</style>
