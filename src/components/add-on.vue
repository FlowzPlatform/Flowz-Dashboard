<template>
  <div id="addOnDetails">
	<Table v-show="table" :loading="loading" :columns="addonColumn" :data="addOnList" no-data-text="Add-on plan not found"></Table>
	<p v-if="!table" style="cursor:pointer">
		<Poptip v-if="totalAddonPrice != 0" trigger="hover" title="Addon Details" placement="right" width="400">
			<strong>{{ totalAddonPrice }}</strong>
			<div slot="content">
				<Row>
					<Col>
						<strong><Row type="flex" justify="center">
							<Col span="10">Name</Col>
							<Col span="4">Price</Col>
							<Col span="4">Qty</Col>
							<Col span="6">Total</Col>
						</Row></strong>
						<Row v-for="item in addOnListData" :key="item.id" type="flex" justify="center">
							<Col span="10">{{item.name}}</Col>
							<Col span="4">{{item.price}}</Col>
							<Col span="4">{{item.quantity}}</Col>
							<Col span="6">{{ (item.price)*item.quantity }}</Col>
						</Row>
						<p>Total is <Strong>{{totalAddonPrice}} USD</strong></p>
					</Col>
				</Row>
			</div>
		</Poptip>
		<p v-if="totalAddonPrice == 0 && !table">{{ totalAddonPrice }}</p>
	</p>
	<Page v-if="addOnListData.length > pageSize && table" size="small" show-total style="margin-top:10px;" class="pull-right" :total="addOnListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
  </div>
</template>

<script>
import cbAddon from '@/api/cb-addon'
let total = 0 // eslint-disable-line
var moment = require('moment')
moment().format()
export default {
	name: 'addOnDetails',
	props: {
		row: Object,
		userdetail: Boolean,
		table: Boolean
	},
	data () {
		return {
			totalAddonPrice: 0,
			addOnAdminDetails: [
				{
					type: 'index',
					width: 40
				},
				{
					title: 'Add-on',
					key: 'name'
				},
				{
					title: 'Price',
					key: 'price',
					align: 'center',
					sortable: true
				},
				{
					title: 'Quantity',
					key: 'period',
					align: 'center',
					sortable: true
				},
				{
					title: 'Description',
					key: 'description',
					align: 'center'
				},
				{
					title: 'Status',
					key: 'status',
					align: 'center',
					filters: [
						{
							label: 'Active',
							value: 1
						},
						{
							label: 'Archived',
							value: 2
						}
					],
					filterMultiple: false,
					filterMethod (value, row) {
						if (value === 1) {
							if (row.status == 'active') {
								return row.status
							}
						} else if (value === 2) {
							if (row.status == 'archived') {
								return row.status
							}
						}
					}
				}
			],
			addOnClientDetails: [
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
					title: 'Purchased Quantity',
					key: 'quantity',
					align: 'center'
				},
				{
					title: 'Total',
					align: 'center',
					render: (h, params) => {
						this.emitTotalPrice(params)
						return h('span', params.row.price * params.row.quantity)
					}
				}
			],
			addonColumn: [],
			loading: true,
			addOnListData: [],
			addOnList: [],
			currentPage: 1,
			pageSize: 10
		}
	},
	methods: {
		emitTotalPrice (params) {
			let val
			val = (params.row.price * params.row.quantity)
			total += val
			this.totalAddonPrice = total
			if (params.index >= this.addOnList.length - 1) {
				this.$emit('totalAddon', total)
				total = 0
			}
		},
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
				addonDetails.price /= 100
				addonDetails.quantity = itm.quantity
				return addonDetails
			})
			Promise.all(obj).then(async res => {
				self.addOnListData = res
				self.addOnList = await self.makeChunk(self.currentPage, self.pageSize)
				self.loading = false
			})
			if (this.userDetail == true) {
				this.addonColumn = this.addOnAdminDetails
			} else {
				this.addonColumn = this.addOnClientDetails
			}
		} else {
			self.loading = false
		}
	},
	destroyed () {
		this.totalAddonPrice = 0
		total = 0
	}
}
</script>

<style scoped>
	.total-tag {
		font-size: 16px;
	}
</style>