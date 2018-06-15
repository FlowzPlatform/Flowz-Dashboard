<template>
  <div id="addOnDetails">
      <Table :loading="loading" :columns="addOnDetails" :data="addOnList" no-data-text="Add-on plan not found"></Table>
      <Page v-if="addOnListData.length > pageSize" size="small" show-total style="margin-top:10px;" class="pull-right" :total="addOnListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
  </div>
</template>

<script>
// import userAddon from '@/api/user-addon';
import cbAddon from '@/api/cb-addon'
// import _ from 'lodash'
var moment = require('moment')
moment().format()
export default {
	name: 'addOnDetails',
	props: {
		row: Object
	},
	data () {
		return {
			addOnDetails: [
				{
					title: 'Add-on',
					key: 'name'
				},
				{
					title: 'Price',
					key: 'price',
					align: 'center'
				},
				{
					title: 'Validity (Months)',
					key: 'period',
					align: 'center'
				}
			],
			loading: true,
			addOnListData: [],
			addOnList: [],
			currentPage: 1,
			pageSize: 5
		}
	},
	methods: {
		async changePage (pageNo) {
			this.addOnList = await this.makeChunk(pageNo, this.pageSize)
		},
		async makeChunk (pageNo, size) {
			let chunk = []
			for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
				if (this.addOnListData[i] != undefined) {
					await chunk.push(this.addOnListData[i])
				}
			}
			return chunk.slice()
		},
		getAddonDetails (id) {
			return cbAddon.get(id).then(res => {
				return res.data
			})
		}
	},
	mounted () {
		let self = this
		if (this.row.addons) {
			let obj = this.row.addons.map(async (itm) => {
				let addonDetails = await self.getAddonDetails(itm.id)
				// console.log('addon details::', addonDetails)
				addonDetails.price /= 100
				return addonDetails
			})
			Promise.all(obj).then(async res => {
				self.addOnListData = res
				self.addOnList = await self.makeChunk(self.currentPage, self.pageSize)
				self.loading = false
			})
		} else {
			self.loading = false
		}
		// OLD CODE FOR SUBSCRIPTION
		// userAddon.get(this.row.id).then(async res => {
		//     res.data = await _.orderBy(res.data, 'createdAt', 'desc')
		//     await res.data.filter(function(o) {
		//         o.expiredOn = moment(o.expiredOn).format("DD-MMM-YYYY")
		//         o.createdAt = moment(o.createdAt).fromNow()
		//     })
		//     self.addOnListData = res.data
		//     self.addOnList = await self.makeChunk(self.currentPage, self.pageSize)
		//     self.loading = false
		// }).catch(err => {
		//     if(err.message == 'Network Error'){
		//         self.$Notice.error({
		//             duration: 5,
		//             title: 'Getting your plans',
		//             desc: 'API service unavailable.'
		//         });
		//     } else {
		//         self.$Notice.error({
		//             duration: 5,
		//             title: 'Getting your plans',
		//             desc: err.response.data.message
		//         });
		//     }
		//     self.loading = false
		// })
	}
}
</script>