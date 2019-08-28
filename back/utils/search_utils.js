/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   search_utils.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cpieri <cpieri@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/16 14:54:45 by cpieri            #+#    #+#             */
/*   Updated: 2019/08/16 14:56:48 by cpieri           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var search_utils = {

	defineSearchGender (this_gender, this_sexual_orientation) {
		let search_gender

		if (this_sexual_orientation === 'Homosexuelle') {
			search_gender = this_gender
		} else if (this_sexual_orientation === 'Hétérosexuelle') {
			search_gender = (this_gender === 'Femme') ? 'Homme' : 'Femme'
			if (this_gender === 'Non-binaire') {
				search_gender = null
			}
		} else {
			search_gender = null
		}
		return search_gender
	}


}

module.exports = search_utils