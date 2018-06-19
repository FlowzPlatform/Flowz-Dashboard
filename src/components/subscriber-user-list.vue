<template>
	<div>
		<div v-if="loading" class="loadingbar">
                        <img class="project-loading" src="../assets/images/activity.svg" style="margin-left: 10px; width:80px; height:100px;"/>
                         <!-- <p style="margin-left:20px;color:gray">Populating data...</p>  -->
                </div> 
		<Card class="card">
			<Row style="background:#eee;padding:20px">
			<Col span="5">
				<Card :bordered="false">
					<p slot="title"><span class="header-title" >Customers</span></p>
					<p class="header-value">{{ totalCustomer }}</p>
				</Card>
			</Col>
			<Col span="6" offset="1">
				<Card :bordered="false">
					<p slot="title"><span class="header-title"></Icon>Customer's Subscription</span></p>
					<p class="header-value">{{ totalUser }}</p>
				</Card>
			</Col>
			<Col span="5" offset="1">
				<Card :bordered="false" >
					<p slot="title"><span class="header-title">Active Plan</span></p>
					<p class="header-value">{{ planDetailData.length }}</p>
				</Card>
			</Col>
			<Col span="5" offset="1">
				<Card :bordered="false">
					<p slot="title"><span class="header-title">Active Addons</span></p>
					<p class="header-value">{{ totalUserAddon }}</p>
				</Card>
			</Col>
		</Row>
			<p class="header-title" slot="title">Subscriber Data</p>
			<div class='table-wrapper' style="margin-top:30px;">
				<Table :loading="planLoding" border :columns="planList" :data="planData"></Table>
				<Page class="pull-right" style="margin-top:10px;" :page-size="pageSize" :current="currentPage" :total="planDetailData.length" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
			</div>
			<!-- <userDetails :data="planData"></userDetails> -->
		</Card>
		<div id="overlay" v-show="showOverlay">
			<img class="project-loading" src="../assets/images/indicator.svg" style="margin-left: 10px; width:80px; height:100px;"/>
		</div>
	</div>
</template>

<script>
import cbPlan from '@/api/cb-plan'
import cbSubscription from '@/api/cb-subscription'
import cbAddon from '@/api/cb-addon'
import cbCustomer from '@/api/cb-customer'
import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import userDetails from './subscriber-user-details.vue'
import VueWidgets from 'vue-widgets'
import 'vue-widgets/dist/styles/vue-widgets.css'
import config from '../../config/customConfig'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import $ from 'jquery'

Vue.use(iView)

Vue.use(VueWidgets)
export default {
	components: { userDetails, VueWidgets },
	data: function () {
		return {
			loading: true,
			showOverlay: false,
			planLoding: false,
			msg: 'hello',
			totalUser: null,
			totalUserAddon: null,
			totalCustomer: null,
			planList: [
				{
					type: 'expand',
					width: 50,
					render: (h, params) => {
						return h(userDetails, {
							props: {
								row: params.row.userDetails
							}
						})
					}
				},
				{
					type: 'index',
					width: 45,
					align: 'center'
				},
				{
					title: 'ChargeBee Id',
					key: 'id',
					align: 'center'
				},
				{
					title: 'Plan Name',
					key: 'name',
					align: 'center'
				},
				{
					title: 'Description',
					key: 'description',
					align: 'center'
				},
				{
					title: 'Validity (Months)',
					key: 'period',
					align: 'center'
				},
				{
					title: 'Price (USD)',
					key: 'price',
					align: 'center',
					sortable: true,
					filters: [
						{
							label: 'greater than 1000',
							value: 1
						},
						{
							label: 'less than 1000',
							value: 2
						}
					],
					filterMultiple: false,
					filterMethod (value, row) {
						if (value === 1) {
							if (row.price > 1000) {
								return row.price
							}
						} else if (value === 2) {
							if (row.price < 1000) {
								return row.price
							}
						}
					}
				},
				{
					title: 'No. of users',
					key: 'users',
					align: 'center',
					sortable: true,
					filters: [
						{
							label: 'greater than 10',
							value: 1
						},
						{
							label: 'less than 10',
							value: 2
						}
					],
					filterMultiple: false,
					filterMethod (value, row) {
						if (value === 1) {
							if (row.users > 10) {
								return row.users
							}
						} else if (value === 2) {
							if (row.users < 10) {
								return row.users
							}
						}
					}
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
			planData: [],
			planDetailData: [],
			currentPage: 1,
			pageSize: 10,
			currentMsgInst: this.$store.state.currentMsgInst
		}
	},
	methods: {
		getRoles: async function () {
			let self = this
			this.showOverlay = true
			await axios.get(config.subscriptionUrl + 'roles', {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;'
				}
			}).then(function (response) {
				// console.log("Get all roles:",_.groupBy(response.data.data, 'module'));
				console.log('all roles:', response)
				if (response.data.data.length > 0) {
					var arrRoles = _.groupBy(response.data.data, 'module')
					for (var tblData in arrRoles) {
						var obj = {
							name: 'name',
							title: '',
							sortField: 'name'
						}
						arrRoles[tblData].splice(0, 0, obj)
						console.log('arraData', arrRoles)
					}
				}
				self.showOverlay = false
				self.loading = false
				self.init()
				return response.data.data
			}).catch(function (error) {
				self.planLoding = false
				// console.log('Get all roles error:', error)
				// console.log(error.response.status)
				if (error.response.status == 500) {
					let msg = error.response.data.message.substr(error.response.data.message.indexOf(':') + 1)
					if (msg === ' Permission not available for action') {
						self.currentMsgInst = self.$Modal.warning({
							title: 'Warning',
							content: msg + '.<br> You are <b>not authorized</b>.',
							onOk: () => {
								self.$router.go(-1)
							}
						})
					}
				}
			})
			self.loading = false
			self.showOverlay = false
		},
		init: async function () {
			let self = this
			self.planLoding = true
			cbPlan.get().then(res => {
				let obj = res.data.map(async (itm) => {
					itm.plan.price /= 100
					let userDetails = await self.getSubscribedUser(itm.plan.id)
					Promise.resolve(userDetails)
					console.log('userAddon >>>', userDetails)
					itm.plan.users = userDetails.userCount
					itm.plan.userDetails = userDetails.userData
					self.totalUser += userDetails.userCount
					return itm.plan
				})
				Promise.all(obj).then(async res => {
					console.log('res', res)
					self.planData = res
					this.planDetailData = res
					this.planData = await this.makeChunk(this.currentPage, this.pageSize)
					// self.plans = self.planData
					self.planLoding = false
				})
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.currentMsgInst = self.$Notice.error({
						duration: 5,
						title: 'Fetching plan data',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						duration: 5,
						title: 'Fetching plan data',
						desc: err.message
					})
				}
				console.log('ERROR', err)
			})
			cbAddon.get().then(res => {
				console.log('RES ADDON ::', res)
				let addonData = _.filter(res.data, function (itm) {
					return itm.addon.status === 'active'
				})
				this.totalUserAddon = addonData.length
			}).catch(err => {
				if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
					if (err.message == 'Network Error') {
						self.currentMsgInst = self.$Notice.error({
							duration: 5,
							title: 'Fetching Addon data',
							desc: 'API service unavailable.'
						})
					} else {
						self.$Notice.error({
							duration: 5,
							title: 'Fetching Addon data',
							desc: err.message
						})
					}
				}
				console.log('ERR Addon :: ', err)
			})
			cbCustomer.get().then(res => {
				this.totalCustomer = res.data.length
				console.log('RES CUSTOMER ::', res)
			}).catch(err => {
				if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
					if (err.message == 'Network Error') {
						self.currentMsgInst = self.$Notice.error({
							duration: 5,
							title: 'Fetching Customer data',
							desc: 'API service unavailable.'
						})
					} else {
						self.$Notice.error({
							duration: 5,
							title: 'Fetching Customer data',
							desc: err.message
						})
					}
				}
				console.log('ERR CUSTOMER ::', err)
			})
		},
		getSubscribedUser (planId) {
			return cbSubscription.getSubscribed(planId).then(res => {
				return { 'userCount': res.data.length, 'userData': res.data }
			})
		},
		async changePage (pageNo) {
			this.planData = await this.makeChunk(pageNo, this.pageSize)
		},
		async makeChunk (pageNo, size) {
			let chunk = []
			for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
				if (this.planDetailData[i] != undefined) {
					await chunk.push(this.planDetailData[i])
				}
			}
			return chunk.slice()
		},
		changePageSize (changedSize) {
			this.pageSize = changedSize
			this.changePage(1)
		}
	},
	created: function () {
		this.getRoles()
	},
	mounted () {
		$('#big-video-wrap').css('width', '0px')
	}
}
</script>

    <style>
.header-value {
	font-size: 40px;
}
.header-title {
	font-size: 16px;
}
.header {
	background-color: #e0e0e0;
	width: 100%;
	margin-top: 5px;
	border-radius: 3px;
	height: 150px;
}
.ui.table {
	font-size: 1em;
	display: inline-table;
}

.thead>span {
	display: inline-block;
	width: 120px;
	line-height: 40px;
	box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, .5);
	background-color: rgba(255, 0, 0, .3);
	text-align: center;
}


/* .vw-widget{
        overflow-x:scroll;
        width: 500px;
    } */

.table-wrapper {
	overflow-x: auto;
	overflow-y: auto;
	height: auto;
	margin-left: 0px;
	margin-top: 0px;
	margin-right: 0px;
}

td {
	text-align: center;
	/* center checkbox horizontally */
	vertical-align: middle;
	/* center checkbox vertically */
	height: 50px;
	width: 50px;
}


/* td, th {
        padding: 5px 20px;
        width: 50px;
    } */

th:first-child {
	/* position: fixed; */
	/* left: 30px */
}

td:first-child {
	/* position: fixed;
        left: 30px */
}

@media screen and (max-width: 580px) {
	.table {
		display: block;
	}
}

.row {
	display: table-row;
	background: #f6f6f6;
}

.row:nth-of-type(odd) {
	background: #e9e9e9;
}

.row.header {
	font-weight: 900;
	color: #ffffff;
	background: #ea6153;
}

.row.green {
	background: #27ae60;
}

.row.blue {
	background: #2980b9;
}

@media screen and (max-width: 580px) {
	.row {
		padding: 8px 0;
		display: block;
	}
}

.cell {
	padding: 6px 12px;
	display: table-cell;
}

@media screen and (max-width: 580px) {
	.cell {
		padding: 2px 12px;
		display: block;
	}
}

.loadingbar {
	text-align: center;
	position: absolute;
	top: 40%;
	left: 45%;
}

#overlay {
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
	cursor: pointer;
	padding-left: 50%;
	padding-top: 25%;
}

.card{
	height: auto;
}
</style>
