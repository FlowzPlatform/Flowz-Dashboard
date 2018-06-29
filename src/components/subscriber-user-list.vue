<template>
	<div>
		<div v-if="loading" class="loadingbar">
			<img class="project-loading" src="../assets/images/activity.svg" style="margin-left: 10px; width:80px; height:100px;" />
		</div>
		<Card class="card">
			<p class="header-title" slot="title">Subscriber Data</p>
			<Row style="background:#eee;padding:20px">
				<Col span="5">
				<Card :bordered="false">
					<p slot="title">
						<span class="header-title">Customers</span>
					</p>
					<p class="header-value">{{ totalCustomer }}</p>
				</Card>
				</Col>
				<Col span="6" offset="1">
				<Card :bordered="false">
					<p slot="title">
						<span class="header-title">
							</Icon>Customer's Subscription</span>
					</p>
					<p class="header-value">{{ totalUser }}</p>
				</Card>
				</Col>
				<Col span="5" offset="1">
				<Card :bordered="false">
					<p slot="title">
						<span class="header-title">Active Plan</span>
					</p>
					<p class="header-value">{{ planDetailData.length }}</p>
				</Card>
				</Col>
				<Col span="5" offset="1">
				<Card :bordered="false">
					<p slot="title">
						<span class="header-title">Active Addons</span>
					</p>
					<p class="header-value">{{ totalUserAddon }}</p>
				</Card>
				</Col>
			</Row>
			<Tabs v-model="activeTab">
				<TabPane label="Home" name="1" icon="ios-home">
					<div>
						<div class='table-wrapper' style="margin-top:30px;">
							<Table :loading="planLoding" border :columns="planList" :data="planData"></Table>
							<Page class="pull-right" style="margin-top:10px;" :page-size="pageSize" :current="currentPage" :total="planDetailData.length" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
						</div>
					</div>
				</TabPane>
				<TabPane label="Advanced Search" name="2" icon="android-search">
					<div style="padding-left:5.6%">
						<!-- <h1> content</h1> -->
						<!-- <Menu mode="horizontal" theme="dark" active-name="1" style="padding-bottom:50px;"> -->
						<Select v-model="model1" @on-change="getfilterlist" style="width:200px;margin-left:450px;">
							<Option v-for="item in filterlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
						</Select>
						<Select v-model="model2" @on-change="getfilteritem" style="width:200px;margin-left: 20px;">
							<Option v-for="item in dataInFilter" :value="item.value" :key="item.value">{{ item.label }}</Option>
							<!-- <option v-for="option in options" :value="option.value">{{ option.value }}</option>   -->
						</Select>
						<Input v-model="model3value" placeholder="enter something..." style="width: 300px;margin-left: 20px;"></Input>
						<!-- v-if="model2 == 'id'" -->
						<!-- <Input v-else-if="model2 == 'customer_id'" v-model="value" :value="item.value" :key="item.value" placeholder="enter something..." style="width: 300px;margin-left: 20px;"></Input> -->

						<Button type="primary" icon="ios-search" @click="searchfilter()" style="margin-left:20px;">Search</Button>
						<!-- </Menu> -->
						<Table style="margin-top:30px;" :loading="planLoding" border :columns="setColumns" :data="setData"></Table>
						<!-- <Table style="margin-top:30px;" :loading="planLoding" border :columns="planfilterlist" :data="resultplanfilter"></Table> -->
						<Page class="pull-right" style="margin-top:10px;" :page-size="pageSize" :current="currentPage" :total="planDetailData.length" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>

					</div>
				</TabPane>
			</Tabs>
		</Card>
		<div id="overlay" v-show="showOverlay">
			<img class="project-loading" src="../assets/images/indicator.svg" style="margin-left: 10px; width:80px; height:100px;" />
		</div>
	</div>
</template>

<script>
import cbPlan from '@/api/cb-plan'
import cbSubscription from '@/api/cb-subscription'
import cbAddon from '@/api/cb-addon'
import cbCustomer from '@/api/cb-customer'
// import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'
import userDetails from './subscriber-user-details.vue'
// import VueWidgets from 'vue-widgets'
// import 'vue-widgets/dist/styles/vue-widgets.css'
import config from '../../config/customConfig'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
import $ from 'jquery'
import moment from 'moment'
moment().format()

// Vue.use(iView)
// Vue.use(VueWidgets)
export default {
	components: { userDetails },
	data: function () {
		return {
			loading: true,
			showOverlay: false,
			planLoding: false,
			totalUser: null,
			totalUserAddon: null,
			totalCustomer: null,
			value: '',
			dataInFilter: '',
			placeholder: '',
			model1: '',
			model2: '',
			model1value: '',
			model2value: '',
			model3value: '',
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
					// title: 'index',
					width: 40,
					align: 'center'
					// ,sortable: true
				},
				{
					title: 'plan Id',
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
			planfilterlist: [
				{
					type: 'index',
					// title: 'index',
					width: 40,
					align: 'center'
					// ,sortable: true
				},
				{
					title: 'Plan Id',
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
					align: 'center'
				},
				{
					title: 'Status',
					key: 'status',
					align: 'center'
				}
			],
			customerfilterlist: [
				{
					type: 'index',
					// title: 'index',
					width: 40,
					align: 'center'
					// ,sortable: true
				}, {
					title: 'Customer Id',
					key: 'id'
				}, {
					title: 'First Name',
					align: 'center',
					key: 'first_name'
				}, {
					title: 'Last Name',
					align: 'center',
					key: 'last_name'
				}, {
					title: 'Email',
					align: 'center',
					key: 'email'
				}
			],
			subscriptionfilterlist: [
				{
					type: 'index',
					width: 55,
					align: 'center'
				},
				{
					title: 'subscription id',
					align: 'center',
					key: 'id'
				},
				{
					title: 'plan_id',
					align: 'center',
					key: 'plan_id'
				},
				{
					title: 'Plan Name',
					key: 'plan_name',
					align: 'center'
				},
				{
					title: 'customer_id',
					align: 'center',
					key: 'customer_id'
				},
				{
					title: 'name',
					align: 'center',
					key: 'name'
				},
				{
					title: 'Start At',
					align: 'center',
					key: 'started_at'
				},
				{
					title: 'Next Billing At',
					align: 'center',
					key: 'next_billing_at'
				},
				{
					title: 'Monthly Recurring Revenue (USD)',
					align: 'center',
					key: 'mrr'
				},
				{
					title: 'Current Status',
					align: 'center',
					key: 'status'
				}
			],
			planData: [],
			planDetailData: [],
			resultplanfilter: [],
			resultcustomerfilter: [],
			resultsubscriptionfilter: [],
			currentPage: 1,
			pageSize: 10,
			activeTab: '1',
			currentMsgInst: this.$store.state.currentMsgInst,
			filteritem: [],
			filterlist: [
				{
					value: 'planfilter',
					label: 'plan'
				},
				{
					value: 'customerfilter',
					label: 'customer'
				},
				{
					value: 'subscriptionfilter',
					label: 'subscription'
				}
			],
			types: {
				planfilter: [{
					value: 'id',
					label: 'plan id',
					placeholder: 'enter plan id'
				}, {
					value: 'name',
					label: 'plan name',
					placeholder: 'enter plan name'
				}, {
					value: 'status',
					label: 'plan status',
					placeholder: 'enter plan status'
				}],
				customerfilter: [{
					value: 'id',
					label: 'customer id',
					placeholder: 'enter customer id'
				},
				{
					value: 'email',
					label: 'customer email',
					placeholder: 'enter customer email'
				},
				{
					value: 'first_name',
					label: 'first name',
					placeholder: 'enter customer first name'
				},
				{
					value: 'last_name',
					label: 'last name',
					placeholder: 'enter customer last name'
				}
				],
				subscriptionfilter: [{
					value: 'id',
					label: 'subscription id',
					placeholder: 'enter subscription id'
				},
				{
					value: 'plan_id',
					align: 'center',
					label: 'plan id'
				},
				{
					value: 'customer_id',
					align: 'center',
					label: 'customer id'
				},
				{
					value: 'status',
					align: 'center',
					label: 'status'
				}
				]
			}
		}
	},
	computed: {
		setColumns () {
			if (this.model1value !== '') {
				// console.log('this.model1value', this.model1value)
				if (this.model1value === 'planfilter') {
					return this.planfilterlist
					// [{
					// 	title: 'Plan',
					// 	key: 'name'
					// }]
				} else if (this.model1value === 'customerfilter') {
					return this.customerfilterlist
					// [{
					// 	title: 'Customer',
					// 	key: 'name'
					// }]
				} else if (this.model1value === 'subscriptionfilter') {
					return this.subscriptionfilterlist
					// [{
					// 	title: 'Subscription',
					// 	key: 'name'
					// }]
				}
			} else {
				return []
			}
		},
		setData () {
			if (this.model1value !== '') {
				if (this.model1value === 'planfilter') {
					return this.resultplanfilter
				} else if (this.model1value === 'customerfilter') {
					return this.resultcustomerfilter
				} else if (this.model1value === 'subscriptionfilter') {
					return this.resultsubscriptionfilter
				}
			} else {
				return []
			}
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
				if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
				console.log('RES CUSTOMER ::', res.customer)
			}).catch(err => {
				if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
		},
		getPlanName (item) {
			console.log('getPlanName ITEM', item)
			return cbPlan.get(item.subscription.plan_id).then(res => {
				console.log('getPlanName res', res)
				return res.data.name
			})
		},
		getCustomerName (item) {
			console.log('item.subscription', item.subscription)
			return cbCustomer.get(item.subscription.customer_id).then(res => {
				console.log('getCustomerName', res)
				return res.data.customer.first_name + ' ' + res.data.customer.last_name
			})
		},
		getfilterlist: function (val) {
			console.log('hello')
			console.log('val', val)
			this.model1value = val

			console.log('>>>>>>>>>>>', this.types[val])
			this.dataInFilter = this.types[val]
		},
		getfilteritem: function (val) {
			console.log('val', val)
			this.model2value = val
		},
		searchfilter: async function (data) {
			// let id;
			let self = this
			self.planLoding = true
			// let method = null
			console.log('hi........')
			console.log('data', this.model1value, this.model2value, this.model3value)
			// let first = this.model2value
			// let second = this.model3value
			// let arr = []
			// arr.push({[this.model2value]: second})
			// console.log('arr...', arr)
			console.log(this.model2value === 'id')
			console.log(this.model1value == 'planfilter')
			//  [this.model2value] = this.model3value
			// console.log('filterdata >>>', filterdata)
			// console.log(!this.model2value === 'id')
			console.log(this.model2value !== 'id')
			let filtervalue = this.model3value // 'id' + '?' + this.model3value //id?5a8fc0c37c791e0013c8c7a8

			// let field = this.model2value
			if (this.model1value == 'planfilter') {
				console.log(this.model2value === 'id')
				if (this.model2value === 'id') {
					cbPlan.get(filtervalue).then(res => {
						console.log('res', res.data)
						res.data.price /= 100
						this.resultplanfilter = [res.data]
						self.planLoding = false
					}).catch(err => {
						console.log('err', err)
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
				} else {
					console.log('else called')
					// console.log()
					// console.log('filterdata', filterdata)
					// console.log('editfilterdata', editfilterdata)
					let data1 = this.model2value + '=' + this.model3value
					cbPlan.filter(data1).then(res => {
						console.log('res................', [res.data[0].plan])
						res.data[0].plan.price /= 100
						this.resultplanfilter = [res.data[0].plan]
						self.planLoding = false
					}).catch(err => {
						console.log('err', err)
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
						self.planLoding = false
						console.log('ERROR', err)
					})
				}
			} else if (this.model1value == 'customerfilter') {
				if (this.model2value === 'id') {
					cbCustomer.get(filtervalue).then(res => {
						console.log('RES CUSTOMER ::', res.data)
						this.resultcustomerfilter = [res.data.customer]
						self.planLoding = false
						console.log('resultcustomerfilter', this.resultcustomerfilter)
					}).catch(err => {
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
				} else {
					// var data3
					let data2 = this.model2value + '=' + this.model3value
					cbCustomer.filter(data2).then(res => {
						console.log('RES CUSTOMER ::', res.data[0].customer)
						let datares = res.data.map((item) => {
							console.log('item', item.customer)
							return item.customer
						})
						this.resultcustomerfilter = datares
						self.planLoding = false
					}).catch(err => {
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
				}
			} else if (this.model1value == 'subscriptionfilter') {
				console.log('<<<<<<<< subscriptionfilter >>>>>>>>>>>')
				console.log('this.model2value', this.model2value)
				if (this.model2value === 'plan_id') {
					cbSubscription.getSubscribed(filtervalue).then(async res => {
						console.log('res >>>>>>>>>>', res.data[0].subscription)
						let datares = res.data.map(async (item) => {
							console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							console.log('first_name', item.subscription.first_name)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						console.log('datares', datares)
						Promise.all(datares).then(async res => {
							console.log('res---------', res)
							self.resultsubscriptionfilter = res
							// self.planList = await self.makeChunk(self.currentPage, self.pageSize)
							self.planLoding = false
						})
						// this.resultsubscriptionfilter = datares
						// self.planLoding = false
					}).catch(err => {
						console.log('err', err)
						if (err.message == 'Network Error') {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: 'API service unavailable.'
							})
						} else {
							self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: err.message
							})
						}
						self.planLoding = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'customer_id') {
					cbSubscription.getOwn(filtervalue).then(async res => {
						console.log('res >>>>>>>>>>', res.data[0].subscription)
						let datares = res.data.map(async (item) => {
							console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							console.log('first_name', item.subscription.first_name)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						console.log('datares', datares)
						Promise.all(datares).then(async res => {
							console.log('res---------', res)
							self.resultsubscriptionfilter = res
							// self.planList = await self.makeChunk(self.currentPage, self.pageSize)
							self.planLoding = false
						})
						// this.resultsubscriptionfilter = datares
						// self.planLoding = false
					}).catch(err => {
						console.log('err', err)
						if (err.message == 'Network Error') {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: 'API service unavailable.'
							})
						} else {
							self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: err.message
							})
						}
						self.planLoding = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'id') {
					// let statusfilter = this.model2value + ':' + this.model3value
					// console.log('statusfilter', statusfilter)
					cbSubscription.get(filtervalue).then(async res => {
						console.log('res >>>>>>>>>>', res.data.subscription)
						res.data.subscription.started_at = moment.unix(res.data.subscription.started_at).format('DD MMM YYYY')
						res.data.subscription.next_billing_at = moment.unix(res.data.subscription.next_billing_at).format('DD MMM YYYY')
						res.data.subscription.mrr /= 100
						res.data.subscription.plan_name = await self.getPlanName(res.data)
						res.data.subscription.name = await self.getCustomerName(res.data)
						this.resultsubscriptionfilter = [res.data.subscription]
						self.planLoding = false
					}).catch(err => {
						console.log('err', err)
						if (err.message == 'Network Error') {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: 'API service unavailable.'
							})
						} else {
							self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: err.message
							})
						}
						self.planLoding = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'status') {
					let statusfilter = this.model2value + '=' + this.model3value
					// console.log('statusfilter', statusfilter)
					cbSubscription.filter(statusfilter).then(res => {
						console.log('res >>>>>>>>>>', res.data)
						let datares = res.data.map(async (item) => {
							console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							console.log('first_name', item.subscription.first_name)
							// Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						Promise.all(datares).then(async res => {
							console.log('res---------', res)
							self.resultsubscriptionfilter = res
							// self.planList = await self.makeChunk(self.currentPage, self.pageSize)
							self.planLoding = false
						})
						// this.resultsubscriptionfilter = datares
						// self.planLoding = false
					}).catch(err => {
						console.log('err', err)
						if (err.message == 'Network Error') {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: 'API service unavailable.'
							})
						} else {
							self.$Notice.error({
								duration: 5,
								title: 'Fetching subscription data',
								desc: err.message
							})
						}
						self.planLoding = false
						console.log('ERROR', err)
					})
				}
			}
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

<style scoped>
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

.card {
	overflow: auto;
	display: block;
	/* position: relative; */
	/* height: 1000px !important; */
	/* background-color: sienna; */
	/* overflow:hidden; */
	/* height:100% !important;  */
	/* min-height: 100% !important; */
}

.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
}

.layout-logo {
	width: 100px;
	height: 30px;
	background: #5b6270;
	border-radius: 3px;
	float: left;
	position: relative;
	top: 15px;
	left: 20px;
}

.layout-nav {
	width: 420px;
	margin: 0 auto;
}

.layout-footer-center {
	text-align: center;
}
</style>
