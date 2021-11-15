const axios = require('axios')
const _ = require('lodash')

const json =
	'https://raw.githubusercontent.com/paraswap/paraswap-rewards-snapshot/master/data/airdrop-users.json'

/* EDIT this array with all your addresses */
const addresses = [
	'0x00b879bfb781a1dc21d6a810fa377a0d2064426f',
	'0x00000000005ef87f8ca7014309ece7260bbcdaeb',
]

const check_airdrop = async () => {
	var config = {
		method: 'get',
		url: json,
	}

	axios(config).then(function (res) {
		if (res?.data) {
			addresses.forEach((address) => {
				// toLowerCase to prevent mismatch when comparing checksummed addresses vs non checksummed ones

				const found = _.filter(res.data, (entry) => entry.address === address.toLowerCase())[0]

				if (!!found) {
					const { earnings } = found

					console.log(`${address}: ${(earnings / 10 ** 18).toFixed(3)} PSP`)
				}
			})
		}
	})
}

check_airdrop()
