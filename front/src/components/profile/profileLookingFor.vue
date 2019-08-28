<template>
	     <div class="tile is-parent is-8">
        <article class="tile is-child box has-background-grey-dark">
          <p class="title  has-text-white-bis">Je recherche...</p>
          <p class="subtitle">&nbsp;</p>
          <div class="content">
            <div class="field is-horizontal">
				<div class="field-label">
					<label class="label has-text-white-bis">Gender</label>
				</div>
				<div v-if="isMe" class="field-body">
					<div class="control has-icons-left">
						<div class="select field-body">
						<select v-model="searchGender">
							<option value=""> {{ userInfos.search_gender }}</option>
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


				<div v-if="!isMe" class="has-text-white-bis field-body">
					<span class="icon is-small is-left">
						<font-awesome-icon icon="user" color="#D926D0" size="1x"/>
					</span>  &nbsp;
					{{ userInfos.search_gender }}
				</div>

				</div>


		  <div v-if="isMe" class="field is-grouped is-grouped-right">
				<div class="control">
				<button class="button is-medium is-success is-rounded" @click="handlerMatch">Valider</button>
				</div>
			</div>
        </div>
        </article>
      </div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'ProfileSearch',
	props: {
		userInfos: null,
		isMe: null
  	},
	data() {
		return {
      searchGender: null,
		}
	},
	methods:{

		updateMatchGender () {
			let dataConnect = {
        searchGender: this.searchGender
			}
			axios.put('/search/update-search-gender/' + this.userInfos.username, {
				data: dataConnect
			})
		},

		handlerMatch () {
			this.updateMatchGender()
		}
	}
}
</script>
