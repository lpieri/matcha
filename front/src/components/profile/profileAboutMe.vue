<template>
	<article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">
        <p class="title">A propos de moi</p>
    	<p class="subtitle"><p class="subtitle">&nbsp;</p></p>
        <div class="content">
            <div class="field is-horizontal">
				<div class="field-label">
					<label class="label">Age</label>
				</div>
              	<div v-if="isMe" class="field-body">
					<div class="field">
					<p class="control has-icons-left">
						<input v-if="isMe" class="input" type="number" name="age" v-model="age" min="18" :placeholder="[[ userInfos.age ]]" icon="birthday"/>
						<span v-if="isMe" class="icon is-small is-left">
								<font-awesome-icon icon="birthday-cake" size="1x"/>
						</span>
					</p>
					</div>
				</div>

				<div v-if="!isMe" class="field-body">
					<div class="field">
					<span class="icon is-small is-left">
						<font-awesome-icon icon="birthday-cake" color="orange" size="1x"/>
					</span>  &nbsp;
					{{ userInfos.age }}
					</div>
				</div>
            </div>


            <div class="field is-horizontal">
				<div class="field-label">
					<label class="label">Place</label>
				</div>
             	<div v-if="isMe" class="field-body">
					<div class="field">
						<p class="control has-icons-left">
						<input   class="input" type="text" name='localization' v-model="localization" :placeholder="[[ userInfos.city ]]">
						<span class="icon is-small is-left">
							<font-awesome-icon icon="globe" size="1x"/>
						</span>
						</p>
						</div>
					</div>

				<div v-if="!isMe" class="field-body">
					<div class="field">
					<span class="icon is-small is-left">
						<font-awesome-icon icon="globe" color="lightblue" size="1x"/>
					</span>  &nbsp;
					{{ userInfos.city }}
					</div>
				</div>
           	</div>

  				<div class="field is-horizontal">
				<div class="field-label">
					<label class="label">Gender </label>
				</div>
				<div v-if="isMe" class="field-body">
					<div class="control has-icons-left">
						<div class="select field-body">
						<select v-model="gender">
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

				<div v-if="!isMe" class="field-body">
					<span class="icon is-small is-left">
						<font-awesome-icon icon="user" color="#D926D0" size="1x"/>
					</span>  &nbsp;
					{{ userInfos.gender}}
				</div>

				</div>

             <div class="field is-horizontal">
				<div class="field-label">
					<label class="label">Sexual orientation </label>
				</div>
				<div  v-if="isMe" class="field-body">
					<div class="control has-icons-left">
						<div class="select">
						<select v-model="sexualOrientation">
							<option value=""> {{ userInfos.sexual_orientation }}</option>
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

				<div v-if="!isMe" class="field-body">
					<span class="icon is-small is-left">
						<font-awesome-icon icon="venus-mars" color="#DDCE3E" size="1x"/>
					</span>  &nbsp;
					{{ userInfos.sexual_orientation }}
				</div>

  			</div>



			<div v-if="isMe" class="field is-grouped is-grouped-right">
				<div class="control">
				<button class="button is-medium is-success is-rounded" @click="handler">Valider</button>
				</div>
			</div>
          </div>
        </article>
</template>


<script>
import axios from 'axios'
export default {
	name: 'ProfileAboutMe',
	props: {
		userInfos: null,
		isMe: null
  	},
	data() {
		return {
			age: null,
			localization: null,
			gender: null,
			sexualOrientation: null,
		}
	},
	methods: {
		updateLocalization () {
			let data = {
				'localization': this.localization
			}
			axios.put('/users-infos/update-loc/' + this.userInfos.username, {
				data: data
			})
		},

		updateAge () {
			let data = {
				'age': this.age
			}
			axios.put('/users-infos/update-age/' + this.userInfos.username, {
				data: data
			})
			.then(res => {
				if (res.status === 200) {
				  this.userInfos.age = this.age
       		}
			})
		},

		updateSexualOrientation () {
			let data = {
				'sexualOrientation': this.sexualOrientation
			}
			axios.put('/users-infos/update-sexual-orientation/' + this.userInfos.username, {
				data: data
			})
		},

		updateGender () {
		  let data = {
		    'gender': this.gender
		  }
			axios.put('/users-infos/update-gender/' + this.userInfos.username, {
				data: data
			})
        .then(res => {
          if (res.status == 200) {
            this.userInfos.gender = this.gender
          }
        })
		},

		handler () {
		this.updateLocalization()
		this.updateAge()
		this.updateSexualOrientation()
		this.updateGender()
		}
	}
}

</script>
