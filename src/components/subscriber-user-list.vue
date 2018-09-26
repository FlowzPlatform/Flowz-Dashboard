<template>
	<div>
		<p class="sb-title" slot="title">Subscriber Data</p>
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
						<Table :loading="planLoading" border :columns="planList" :data="planData"></Table>
						<Page placement="top" class="pull-right" style="margin-top:10px;" :page-size="pageSize" :current="currentPage" :total="planDetailData.length" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
					</div>
				</div>
			</TabPane>
			<TabPane label="Advanced Search" name="2" icon="android-search">
				<Row type="flex" justify="space-around">
					<Col offset="6" span="3">
					<Select v-model="model1" clearable placeholder="Filter" @on-change="getfilterlist">
						<Option v-for="item in filterlist" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
					<Col span="3">
					<Select v-model="model2" clearable placeholder="Attribute" @on-change="getfilteritem">
						<Option v-for="item in dataInFilter" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
					</Col>
					<Col span="5">
					<Input v-model="model3value" :disabled="disabled" placeholder="Enter attribute value"></Input>
					</Col>
					<Col span="5">
					<Button type="primary" icon="ios-search" @click="searchfilter()">Search</Button>
					</Col>
				</Row>
				<Row type="flex" justify="end">
					<Col span="22">
					<Table style="margin-top:30px;" :loading="filterLoading" border :columns="setColumns" :data="setData"></Table>
					<Page class="pull-right" placement="top" style="margin-top:10px;" :page-size="pageSize" :current="currentPage" :total="setTotal" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
					</Col>
				</Row>
			</TabPane>
		</Tabs>
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
import axios from 'axios'
import _ from 'lodash'
import userDetails from './subscriber-user-details.vue'
import config from '../../config/customConfig'
import $ from 'jquery'
import moment from 'moment'
moment().format()

export default {
	components: { userDetails },
	data: function () {
		return {
			loading: true,
			showOverlay: false,
			planLoading: false,
			filterLoading: false,
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
			disabled: false,
			alert: '',
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
					width: 40,
					align: 'center'
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
					width: 40,
					align: 'center'
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
					width: 55,
					align: 'center'
				}, {
					title: 'Customer Id',
					align: 'center',
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
					title: 'Subscription Id',
					align: 'center',
					key: 'id'
				},
				{
					title: 'Plan Id',
					align: 'center',
					key: 'plan_id'
				},
				{
					title: 'Plan Name',
					key: 'plan_name',
					align: 'center'
				},
				{
					title: 'Customer Id',
					align: 'center',
					key: 'customer_id'
				},
				{
					title: 'Name',
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
			planFilterDetailData: [],
			customerfilterdetailvalue: [],
			subscriptionFilterDetailData: [],
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
					label: 'Plan'
				},
				{
					value: 'customerfilter',
					label: 'Customer'
				},
				{
					value: 'subscriptionfilter',
					label: 'Subscription'
				}
			],
			types: {
				planfilter: [{
					value: 'All plan',
					label: 'All plan',
					placeholder: 'enter plan id'
				}, {
					value: 'id',
					label: 'Plan id',
					placeholder: 'enter plan id'
				}, {
					value: 'name',
					label: 'Plan name',
					placeholder: 'enter plan name'
				}, {
					value: 'status',
					label: 'Plan status',
					placeholder: 'enter plan status'
				}],
				customerfilter: [{
					value: 'All customer',
					label: 'All customer',
					placeholder: 'enter customer id'
				},
				{
					value: 'id',
					label: 'Customer id',
					placeholder: 'enter customer id'
				},
				{
					value: 'email',
					label: 'Customer email',
					placeholder: 'enter customer email'
				},
				{
					value: 'first_name',
					label: 'First name',
					placeholder: 'enter customer first name'
				},
				{
					value: 'last_name',
					label: 'Last name',
					placeholder: 'enter customer last name'
				}
				],
				subscriptionfilter: [{
					value: 'All subscription',
					label: 'All subscription'
				},
				{
					value: 'id',
					label: 'subscription id',
					placeholder: 'enter subscription id'
				},
				{
					value: 'plan_id',
					align: 'center',
					label: 'Plan id'
				},
				{
					value: 'customer_id',
					align: 'center',
					label: 'Customer id'
				},
				{
					value: 'status',
					align: 'center',
					label: 'Status'
				}
				]
			}
		}
	},
	computed: {
		setColumns () {
			if (this.model1value !== '') {
				if (this.model1value === 'planfilter') {
					return this.planfilterlist
				} else if (this.model1value === 'customerfilter') {
					return this.customerfilterlist
				} else if (this.model1value === 'subscriptionfilter') {
					return this.subscriptionfilterlist
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
		},
		setTotal () {
			if (this.model1value !== '') {
				if (this.model1value === 'planfilter') {
					return this.planFilterDetailData.length
				} else if (this.model1value === 'customerfilter') {
					return this.customerfilterdetailvalue.length
				} else if (this.model1value === 'subscriptionfilter') {
					return this.subscriptionFilterDetailData.length
				}
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
				// console.log('all roles:', response)
				if (response.data.data.length > 0) {
					var arrRoles = _.groupBy(response.data.data, 'module')
					for (var tblData in arrRoles) {
						var obj = {
							name: 'name',
							title: '',
							sortField: 'name'
						}
						arrRoles[tblData].splice(0, 0, obj)
						// console.log('arraData', arrRoles)
					}
				}
				self.showOverlay = false
				self.loading = false
				self.init()
				return response.data.data
			}).catch(function (error) {
				self.planLoading = false
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
			self.planLoading = true
			cbPlan.get().then(res => {
				let obj = res.data.map(async (itm) => {
					itm.plan.price /= 100
					let userDetails = await self.getSubscribedUser(itm.plan.id)
					Promise.resolve(userDetails)
					// console.log('userAddon >>>', userDetails)
					itm.plan.users = userDetails.userCount
					itm.plan.userDetails = userDetails.userData
					self.totalUser += userDetails.userCount
					return itm.plan
				})
				Promise.all(obj).then(async res => {
					// console.log('cbPlan res >>>>>', res)
					self.planData = res
					this.planDetailData = res
					this.planData = await this.makeChunk(this.currentPage, this.pageSize)
					self.planLoading = false
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
				// console.log('RES ADDON ::', res)
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
				// console.log('RES CUSTOMER ::', res.customer)
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
			if (this.model1value === 'planfilter') {
				this.resultplanfilter = await this.makeChunk(pageNo, this.pageSize)
			} else if (this.model1value === 'customerfilter') {
				this.resultcustomerfilter = await this.makeChunk(pageNo, this.pageSize)
			} else if (this.model1value === 'subscriptionfilter') {
				this.resultsubscriptionfilter = await this.makeChunk(pageNo, this.pageSize)
			} else {
				this.planData = await this.makeChunk(pageNo, this.pageSize)
			}
		},
		async makeChunk (pageNo, size) {
			if (this.model1value === 'planfilter') {
				let chunk = []
				for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
					if (this.planFilterDetailData[i] != undefined) {
						await chunk.push(this.planFilterDetailData[i])
					}
				}
				return chunk.slice()
			} else if (this.model1value === 'customerfilter') {
				let chunk = []
				for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
					if (this.customerfilterdetailvalue[i] != undefined) {
						await chunk.push(this.customerfilterdetailvalue[i])
					}
				}
				return chunk.slice()
			} else if (this.model1value === 'subscriptionfilter') {
				let chunk = []
				for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
					if (this.subscriptionFilterDetailData[i] != undefined) {
						await chunk.push(this.subscriptionFilterDetailData[i])
					}
				}
				return chunk.slice()
			} else {
				let chunk = []
				for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
					if (this.planDetailData[i] != undefined) {
						await chunk.push(this.planDetailData[i])
					}
				}
				return chunk.slice()
			}
		},
		changePageSize (changedSize) {
			this.pageSize = changedSize
			this.changePage(1)
		},
		getPlanName (item) {
			// console.log('getPlanName ITEM', item)
			return cbPlan.get(item.subscription.plan_id).then(res => {
				// console.log('getPlanName res', res)
				return res.data.name
			})
		},
		getCustomerName (item) {
			// console.log('item.subscription', item.subscription)
			return cbCustomer.get(item.subscription.customer_id).then(res => {
				// console.log('getCustomerName', res)
				return res.data.customer.first_name + ' ' + res.data.customer.last_name
			})
		},
		getfilterlist: function (val) {
			// console.log('val', val)
			this.resultplanfilter = []
			this.resultcustomerfilter = []
			this.resultsubscriptionfilter = []

			this.model1value = val
			this.dataInFilter = this.types[val]
		},
		getfilteritem: function (val) {
			// console.log('getfilteritem val', val)

			this.resultplanfilter = []
			this.resultcustomerfilter = []
			this.resultsubscriptionfilter = []

			if (val === 'All plan' || val === 'All customer' || val === 'All subscription') {
				this.disabled = true
			} else {
				this.disabled = false
			}
			this.model2value = val
		},
		searchfilter: async function (data) {
			let self = this
			self.filterLoading = true
			// console.log('data', this.model1value, this.model2value, this.model3value)
			let filtervalue = this.model3value

			/* ---------------- planfilter ------------------ */

			if (this.model1value == 'planfilter') {
				// console.log(this.model2value === 'id')
				/* ======== plan id wise filter ======== */
				if (this.model2value === 'id') {
					cbPlan.get(filtervalue).then(res => {
						// console.log('res', res.data)
						res.data.price /= 100
						this.resultplanfilter = [res.data]
						self.filterLoading = false
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'status' || this.model2value === 'name') {
					/* ========  plan status wise filter ======== */

					let data1 = this.model2value + '=' + this.model3value
					cbPlan.filter(data1).then(res => {
						// console.log('res................', res.data)
						let datares = res.data.map((item) => {
							// console.log('item', item.plan)
							item.plan.price /= 100
							return item.plan
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultplanfilter = res
							this.planFilterDetailData = res
							this.resultplanfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'All plan') {
					/* ======== All plan wise filter ======== */
					cbPlan.get().then(async res => {
						// console.log('res', res.data)
						let datares = res.data.map((item) => {
							// console.log('item', item.plan)
							item.plan.price /= 100
							return item.plan
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultplanfilter = res
							this.planFilterDetailData = res
							this.resultplanfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else {
					self.$Notice.error({
						duration: 5,
						title: 'Please select any attribute'
					})
					self.filterLoading = false
				}
			} else if (this.model1value == 'customerfilter') {
				/* ---------------- customerfilter ------------------ */
				if (this.model2value === 'id') {
					/* ========  customer id wise filter ======== */

					cbCustomer.get(filtervalue).then(res => {
						// console.log('RES CUSTOMER ::', res.data)
						this.resultcustomerfilter = [res.data.customer]
						self.filterLoading = false
						// console.log('resultcustomerfilter', this.resultcustomerfilter)
					}).catch(err => {
						// console.log('err', err)
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
						self.filterLoading = false
						console.log('ERR CUSTOMER ::', err)
					})
				} else if (this.model2value === 'All customer') {
					/* ========  All Customer wise filter ======== */

					cbCustomer.get().then(async res => {
						// console.log('res', res.data)
						let datares = res.data.map(async (item) => {
							// console.log('item', item.customer)
							return item.customer
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultcustomerfilter = res
							this.customerfilterdetailvalue = res
							this.resultcustomerfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
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
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'email' || this.model2value === 'first_name' || this.model2value === 'last_name') {
					/* ========  Customer email , first_name, last_name wise filter ======== */
					let data2 = this.model2value + '=' + this.model3value
					cbCustomer.filter(data2).then(res => {
						// console.log('RES CUSTOMER ::', res.data)
						let datares = res.data.map((item) => {
							// console.log('item', item.customer)
							return item.customer
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultcustomerfilter = res
							this.customerfilterdetailvalue = res
							this.resultcustomerfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
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
						self.filterLoading = false
						console.log('ERR CUSTOMER ::', err)
					})
				} else {
					this.$Notice.error({
						duration: 5,
						title: 'Please select any attribute'
					})
					self.filterLoading = false
				}
			} else if (this.model1value == 'subscriptionfilter') {
				if (this.model2value === 'plan_id') {
					/* ========  subscription plan_id wise filter ======== */

					cbSubscription.getSubscribed(filtervalue).then(async res => {
						// console.log('res >>>>>>>>>>', res.data[0].subscription)
						let datares = res.data.map(async (item) => {
							// console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultsubscriptionfilter = res
							this.subscriptionFilterDetailData = res
							this.resultsubscriptionfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'customer_id') {
					/* ========  subscription customer_id wise filter ======== */

					cbSubscription.getOwn(filtervalue).then(async res => {
						// console.log('res >>>>>>>>>>', res.data[0].subscription)
						let datares = res.data.map(async (item) => {
							// console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultsubscriptionfilter = res
							this.subscriptionFilterDetailData = res
							this.resultsubscriptionfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'id') {
					/* ========  subscription id wise filter ======== */

					cbSubscription.get(filtervalue).then(async res => {
						// console.log('res >>>>>>>>>>', res.data.subscription)
						res.data.subscription.started_at = moment.unix(res.data.subscription.started_at).format('DD MMM YYYY')
						res.data.subscription.next_billing_at = moment.unix(res.data.subscription.next_billing_at).format('DD MMM YYYY')
						res.data.subscription.mrr /= 100
						res.data.subscription.plan_name = await self.getPlanName(res.data)
						res.data.subscription.name = await self.getCustomerName(res.data)
						this.resultsubscriptionfilter = [res.data.subscription]
						self.filterLoading = false
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'status') {
					/* ========  subscription status wise filter ======== */

					let statusfilter = this.model2value + '=' + this.model3value

					cbSubscription.filter(statusfilter).then(res => {
						// console.log('res >>>>>>>>>>', res.data)
						let datares = res.data.map(async (item) => {
							// console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultsubscriptionfilter = res
							this.subscriptionFilterDetailData = res
							this.resultsubscriptionfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else if (this.model2value === 'All subscription') {
					/* ========  All subscription wise filter ======== */
					cbSubscription.get().then(async res => {
						// console.log('res >>>>>>>>>>', res.data)
						let datares = res.data.map(async (item) => {
							// console.log('item subscription', item.subscription)
							item.subscription.started_at = moment.unix(item.subscription.started_at).format('DD MMM YYYY')
							item.subscription.next_billing_at = moment.unix(item.subscription.next_billing_at).format('DD MMM YYYY')
							item.subscription.mrr /= 100
							item.subscription.plan_name = await self.getPlanName(item)
							item.subscription.name = await self.getCustomerName(item)
							Promise.resolve(item.subscription.plan_name)
							return item.subscription
						})
						// console.log('datares', datares)
						Promise.all(datares).then(async res => {
							// console.log('res---------', res)
							self.resultsubscriptionfilter = res
							this.subscriptionFilterDetailData = res
							this.resultsubscriptionfilter = await this.makeChunk(this.currentPage, this.pageSize)
							self.filterLoading = false
						})
					}).catch(err => {
						// console.log('err', err)
						if (self.currentMsgInst && !self.currentMsgInst.closed) {
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
						}
						self.filterLoading = false
						console.log('ERROR', err)
					})
				} else {
					this.$Notice.error({
						duration: 5,
						title: 'Please select any attribute'
					})
					self.filterLoading = false
				}
			} else {
				this.$Notice.error({
					duration: 5,
					title: 'Please select any filter'
				})
				self.filterLoading = false
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

.subscriber-title {
	font-size: 28px;
}

.table-wrapper {
	/* overflow-x: auto; */
	/* overflow-y: auto; */
	/* height: auto; */
	margin-left: 15px;
	margin-top: 0px;
	margin-right: 15px;
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
	/* position: absolute; */
	top: 40%;
	left: 45%;
}

#overlay {
	position: fixed;
	width: 100%;
	/* height: 100vh; */
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

.layout-footer-center {
	text-align: center;
}

.sb-title {
	font-size: 18px;
	font-weight: bold;
}

.ivu-table-tip {
    overflow-x: hidden !important;
}
</style>
