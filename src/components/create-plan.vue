<template>
  <Row style="margin-top:30px;" type="flex" justify="center">
    <Col span="18">
      <Card>
        <Row slot="title">
          <Col span="4">
            <Tabs v-model="activeTab" @on-click="changeActiveTab">
              <TabPane label="Plan" name="plan"></TabPane>
              <TabPane :disabled="planLoding" label="Addon" name="addon"></TabPane>
            </Tabs>
          </Col>
          <Col span="3" offset="17" class-name="action-button">
            <!-- <Col span="3" style="margin-bottom:5px;"> -->
              <Button type="primary" @click="createPlan(activeTab)" icon="android-add-circle" :loading="addPlanLoading"><span v-if="activeTab === 'plan'">Create Plan</span><span v-else>Create Addon</span></Button>
           <!--  </Col> -->
          </Col>
        </Row>
        <div v-if="!planLoding && plans.length != 0">
          <div class="schema-form ivu-table-wrapper">
            <div class="ivu-table ivu-table-border">
              <div class="ivu-table-body ">
                  <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                     <colgroup>
                          <col width="22">
                            <col width="8">
                              <!-- <col width="22"> -->
                                  <col width="22">
                                      <!-- <col width="15"> -->
                                          <col width="20">
                      </colgroup>
                      <thead>
                          <tr>
                              <th class="ivu-table-column-center">
                                  <div class="ivu-table-cell">
                                      <span v-if="activeTab === 'plan'">Plan Name</span>
                                      <span v-else>Addon Name</span>
                                  </div>
                              </th>
                              <th class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                    <span>Active User</span>
                                  </div>
                              </th>
                              <!-- <th class="ivu-table-column-center">
                                  <div class="ivu-table-cell">
                                      <span>Validity <span style="color:gray;font-size:10px">(Month)</span></span>
                                  </div>
                              </th> -->
                              <th class="ivu-table-column-center">
                                  <div class="ivu-table-cell"><span>Price <span style="color:gray;font-size:10px">(USD)</span></span>
                                  </div>
                              </th>
                              <!-- <th class="ivu-table-column">
                                  <div class="ivu-table-cell"><span>Type</span>
                                  </div>
                              </th> -->
                              <th class="ivu-table-column-center">
                                  <div class="ivu-table-cell"><span>Action</span>
                                  </div>
                              </th>
                          </tr>
                      </thead>
                      <tbody class="ivu-table-tbody" v-for="(plan, pIndex) in plans" :id="'plans_'+pIndex">
                          <tr v-bind:class="plan.class">
                              <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Plan Name" placement="bottom">
                                    <input class="form-control" v-model="plan.name" placeholder="*Plan Name" ></input>
                                  </Tooltip>
                                </div>
                              </td>
                              <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Current User" placement="bottom">
                                    {{ plan.users }}
                                  </Tooltip>
                                </div>
                              </td>
                              <!-- <td class="ivu-table-column-center">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Validity" placement="bottom">
                                    <input  type="text" class="description form-control" v-model="plan.period" min=1 v-on:keyup="validateValidity(plan.period, pIndex)" placeholder="*Validity"></input>
                                  </Tooltip>
                                </div>
                              </td> -->
                              <td class="ivu-table-column-center">
                                  <div class="ivu-table-cell">
                                    <Tooltip content="Price" placement="bottom">
                                      <input type="text" class="description form-control" v-model="plan.price" v-on:keyup="validatePrice(plan.price, pIndex)" placeholder="*Price"></input>
                                    </Tooltip>
                                  </div>
                              </td>
                              <!-- <td class="">
                                <div class="ivu-table-cell">
                                    <Tooltip content="Type" placement="bottom">
                                      <select class="form-control" v-model="plan.object">
                                        <option value="plan">Basic</option>
                                        <option value="addon">Add-on</option>
                                      </select>
                                      <input type="text" class="description form-control" v-model="plan.price" v-on:keyup="validatePrice(plan.price, pIndex)" placeholder="*Price"></input>
                                    </Tooltip>
                                  </div>
                              </td> -->
                              <td class="ivu-table-column-center">
                                  <Row type="flex" justify="center" align="middle">
                                    <Col span="3"> 
                                      <a v-if="plan.period >= getDefaultPlan('validity', pIndex) && plan.price >= getDefaultPlan('price', pIndex)" @click="update(pIndex)">
                                        <Tooltip content="Save" placement="top">
                                          <icon name="save" scale="1.05" color="#59b161"></icon>
                                        </Tooltip>
                                      </a>
                                      <a v-else class="pointerX">
                                        <Tooltip content="Save" placement="top">
                                          <icon name="save" scale="1.05" color="#59b161"></icon>
                                        </Tooltip>
                                      </a>
                                    </Col>
                                    <Col span="3">
                                      <a @click="confirmDelete = true, deleteIndex = pIndex, currentPlanName = plan.name">
                                        <Tooltip content="Delete plan" placement="top">
                                          <Icon type="trash-b" size="23" color="#e84c3c"></Icon>
                                        </Tooltip>
                                        <Modal v-model="confirmDelete" :loading="loading">
                                          <p slot="header" style="color:#f60;text-align:center">
                                            <Icon type="information-circled"></Icon>
                                            <span>Delete confirmation</span>
                                          </p>
                                          <div style="text-align:center">
                                              <p><b>{{ currentPlanName }}</b> will be delete permanently only if it is not subscribed by any user otherwise it will disabled.</p>
                                              <!-- <p v-if="activeTab === 'plan'" v-else>Confirm action to permanently delete <b>{{ plan.name }}.<br></b> After deleting this addon will not accessible.</p> -->
                                          </div>
                                          <div slot="footer">
                                              <Button type="error" size="large" long :loading="loading" @click="deletePlan(deleteIndex)">Delete</Button>
                                          </div>
                                        </Modal>
                                      </a>
                                    </Col>
                                    <Col span="3">
                                      <a v-if="plan.period >= getDefaultPlan('validity', pIndex) && plan.price >= getDefaultPlan('price', pIndex)">
                                        <Tooltip content="Enable" placement="top">
                                          <i-switch @on-change="makePlanArchived(plan.status, pIndex)" size="small" true-value="active" false-value="archived" v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
                                      <a v-else class="pointerX">
                                        <Tooltip content="Enable" placement="top">
                                          <i-switch size="small" true-value="active" false-value="archived" disabled v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
                                    </Col>
																		<Col span="3">
                                      <div>
                                        <a v-if="plan.period >= getDefaultPlan('validity', pIndex) && plan.price >= getDefaultPlan('price', pIndex) && checkOpen(pIndex)" @click="copyPlan(pIndex, activeTab)">
																					<Tooltip content="Copy" placement="top">
																						<Icon type="ios-copy-outline" size="23" color="#337ab7"></Icon>
																					</Tooltip>
																				</a>
																				<a v-else class="pointerX">
																					<Tooltip content="Copy" placement="top">
																						<Icon type="ios-copy-outline" size="23" color="#337ab7"></Icon>
																					</Tooltip>
																				</a>
                                      </div>
																		</Col>
                                    <Col span="3">
                                      <a v-if="plan.period >= getDefaultPlan('validity', pIndex) && plan.price >= getDefaultPlan('price', pIndex) && checkOpen(pIndex)" @click="expand(pIndex)">
                                        <Tooltip content="Expand" placement="top">
                                          <Icon type="arrow-down-b" size="25"></Icon>
                                        </Tooltip>
                                      </a>
                                      <a v-else class="pointerX">
                                        <Tooltip content="Expand" placement="top">
                                          <Icon type="arrow-down-b" size="25"></Icon>
                                        </Tooltip>
                                      </a>
                                    </Col>
                                  </Row>
                              </td>
                          </tr>
                          <tr class="ivu-table-row">
                            <td colspan="4" class="hidden-td">
                              <div :id="'plan_'+pIndex" class="outer-toggle">
                                <Row>
                                  <Col span="22" push="1">
                                    <Card>
                                      <Row align="middle" type="flex">
                                        <Col span="4">
                                          <h5 style="height: 35px">Description</h5>
                                        </Col>
                                        <Col span="18">
                                          <Input style="margin-bottom:5px" v-model="plan.description" type="textarea" :autosize="{minRows: 1,maxRows: 25}" placeholder="Enter something..."></Input>
                                        </Col>
                                      </Row>
                                      <div class="schema-form ivu-table-wrapper">
                                        <div class="ivu-table ivu-table-border">
                                          <div class="ivu-table-body" style="max-height:450px;overflow-y:  auto;">
                                              <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                                                  <thead>
                                                      <tr>
                                                          <th class="">
                                                              <div class="ivu-table-cell">
                                                                  <span>Module</span>
                                                              </div>
                                                          </th>
                                                          <th class="">
                                                              <div class="ivu-table-cell">
                                                                  <span>Service</span>
                                                              </div>
                                                          </th>
                                                          <th class="">
                                                              <div class="ivu-table-cell">
                                                                <span>Operation</span>
                                                              </div>
                                                          </th>
                                                          <th class="">
                                                              <div class="ivu-table-cell">
                                                                <span>Value</span>
                                                              </div>
                                                          </th>
                                                      </tr>
                                                  </thead>
                                                  <tbody class="ivu-table-tbody" v-if="plan.meta_data">
                                                      <tr class="ivu-table-row" v-for="(item, index) in plan.meta_data.details">
                                                          <td class="">
                                                              <div class="ivu-table-cell">
                                                                {{item.module}}
                                                              </div>
                                                          </td>
                                                          <td class="">
                                                            <div class="ivu-table-cell">
                                                              {{item.service}}
                                                            </div>
                                                          </td>
                                                          <td class="">
                                                            <div class="">
                                                              <div class="ivu-table-cell">
                                                                {{item.action}}
                                                              </div>
                                                            </div>
                                                          </td>
                                                          <td class="">
                                                            <div class="ivu-table-cell">
                                                                <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input" v-if="item.value == 0"></Input>
                                                                <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input redInput" v-else></Input>
                                                            </div>
                                                          </td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                          <div class="ivu-table-tip" style="display: none;">
                                              <table cellspacing="0" cellpadding="0" border="0">
                                                  <tbody>
                                                      <tr>
                                                          <td><span>No filter data</span></td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  </Col>
                                </Row>
                              </div>
                            </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <div class="ivu-table-tip" style="display: none;">
                  <table cellspacing="0" cellpadding="0" border="0">
                      <tbody>
                          <tr>
                              <td><span>No filter data</span></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
        <Row type="flex" justify="center">
          <Col span="4" style="margin-top:5px;">
            <Spin v-if="planLoding" size="large"></Spin>
            <h5 v-else-if="!planLoding && plans.length == 0"><span v-if="activeTab === 'plan'">Plans</span><span v-else>Addons</span> not available</h5>
          </Col>
        </Row>
        <!-- <span>Note: if any plan / addon is subscribed by any user then you can't update validity.</span> -->
      </Card>
    </Col>
    <div id="overlay" v-show="showOverlay">
      <img class="project-loading" src="../assets/images/indicator.svg" style="margin-left: 10px; width:80px; height:100px;"/>
    </div>
  </Row>
</template>

<script>
// import subscriptionPlans from '@/api/subscription-plans'
import cbPlan from '@/api/cb-plan'
import cbAddon from '@/api/cb-addon'
import cbSubscription from '@/api/cb-subscription'
import cbAddonUser from '@/api/cb-addons-user'
import roles from '@/api/roles'
import registerResource from '@/api/register-resource'
import Icon from 'vue-awesome/components/Icon'
import BootstrapVue from 'bootstrap-vue'
import Cookies from 'js-cookie'
import Vue from 'vue'
import psl from 'psl'
import _ from 'lodash'

import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css'

import 'vue-awesome/icons'
import $ from 'jquery'
const uuidv1 = require('uuid/v1')
Vue.use(BootstrapVue) // CSS
Vue.use(iView, { locale })
Vue.component('icon', Icon)

export default {
	name: 'createPlan',
	data () {
		return {
			services: [],
			plans: [],
			planData: [],
			addonData: [],
			planLoding: false,
			addPlanLoading: false,
			currentOpen: [],
			time_units: ['day/s', 'month/s', 'year/s'],
			confirmDelete: false,
			loading: false,
			deleteIndex: 0,
			currentPlanName: null,
			activeTab: 'plan',
			process: {
				cursor: ''
			},
			defaultPlan: {
				name: 'Base Plan',
				description: 'Website Builder\n1 eCommerce Site\nNo Virtual & CRM',
				validity: 1,
				price: 999,
				time_unit: 'month',
				type: 'basic',
				details: []
			},
			currentMsgInst: this.$store.state.currentMsgInst,
			showOverlay: false
		}
	},
	created () {
		let self = this
		this.showOverlay = true
		roles.get().then(res => {
			self.planLoding = true

			// NEW SUBSCRIPTION CODE WITH CHARGEBEE
			cbPlan.get().then(res => {
				let obj = res.data.map(async (itm) => {
					itm.plan.price /= 100
					itm.plan.users = await self.getSubscribedUser(itm.plan.id)
					Promise.resolve(itm.plan.users)
					return itm.plan
				})
				Promise.all(obj).then(async res => {
					self.planData = res
					self.plans = self.planData
					self.planLoding = false
				})
			}).catch(err => {
				let location = psl.parse(window.location.hostname)
				location = location.domain === null ? location.input : location.domain
				if (err.message == 'Network Error') {
					self.currentMsgInst = self.$Notice.error({
						duration: 5,
						title: 'Loading created plans',
						desc: 'API service unavailable.'
					})
				} else if (err.response.data.message == 'User authentication fail') {
					self.$Notice.error({
						duration: 5,
						title: 'Your session has been expired.',
						desc: err.response.data.message + ', please login again.'
					})
					Cookies.remove('auth_token', {domain: location})
					Cookies.remove('user', {domain: location})
					self.$router.push({ name: 'login' })
				} else {
					self.$Notice.error({
						duration: 5,
						title: 'Loading created plans',
						desc: err.message
					})
					// self.$Message.error(err.response.data.message)
				}
			})

			cbAddon.get().then(res => {
				let obj = res.data.map(async (itm) => {
					itm.addon.price /= 100
					// if (itm.addon.status == 'active')
					itm.addon.users = await self.getAddonUser(itm.addon.id)
					Promise.resolve(itm.addon.users)
					return itm.addon
				})
				Promise.all(obj).then(async res => {
					self.addonData = res
				})
			}).catch(err => {
				if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
					self.$Notice.error({
						duration: 5,
						title: 'Loading created addons',
						desc: err.message
					})
				}
			})
			this.showOverlay = false
		}).catch(err => {
			if (err.message == 'Network Error') {
				self.currentMsgInst = self.$Notice.error({
					duration: 5,
					title: 'Loading available plans & addons',
					desc: 'API service unavailable.'
				})
			} else if (err.response.status == 500) {
				let msg = err.response.data.message.substr(err.response.data.message.indexOf(':') + 1)
				if (msg === ' Permission not available for action') {
					self.currentMsgInst = self.$Modal.warning({
						title: 'Warning',
						content: msg + '.<br> You are <b>not authorized</b>.',
						onOk: () => {
							self.$router.go(-1)
						}
					})
				} else {
					self.currentMsgInst = self.$Notice.error({
						duration: 5,
						title: 'Loading available plans & addons',
						desc: err.response.data.message
					})
				}
			}
			this.showOverlay = false
		})

		// OLD CODE FOR SUBSCRIPTION
		/* subscriptionPlans.get().then(res => {
      self.plans = res.data.data
      self.planLoding = false
    }).catch(err => {
      if(err.message == 'Network Error'){
        self.$Notice.error({
          duration: 5,
              title: 'Loading created plans',
              desc: 'API service unavailable.'
          });
        } else {
          self.$Notice.error({
            duration: 5,
              title: 'Loading created plans',
              desc: err.response.data.message
          });
        }
      self.planLoding = false
    }); */
	},
	methods: {
		copyPlan (index, method) {
			let self = this
			document.body.style.cursor = 'wait'
			let currentPlan = self.plans[index]
			let convertedPrice = currentPlan.price * 100
			let id = uuidv1()
			let planDefinition = {
				'id': id,
				'name': currentPlan.name + ' Copy',
				'description': currentPlan.description,
				'invoice_name': currentPlan.name + ' Copy',
				'price': convertedPrice,
				'status': 'archived',
				'period': currentPlan.period,
				'period_unit': currentPlan.period_unit,
				'meta_data': currentPlan.meta_data
			}
			if (method == 'plan') {
				this.createCbPlan(planDefinition, 'copy')
			} else if (method == 'addon') {
				this.createCbAddon(planDefinition, 'copy')
			}
		},
		getSubscribedUser (planId) {
			return cbSubscription.getSubscribed(planId).then(res => {
				return res.data.length
			})
		},
		getAddonUser (addonId) {
			return cbAddonUser.get(addonId).then(res => {
				return res.data.length
			})
		},
		changeActiveTab (name) {
			this.plans = name === 'plan' ? this.planData : this.addonData
		},
		getDefaultPlan (idx, pIndex) {
			return this.plans[pIndex].object == 'plan' ? this.defaultPlan[idx] : 0
			// return this.defaultPlan[idx]
		},
		validateValidity (validity, pIndex) {
			validity = validity.toString()
			var num = validity.match(/^[0-9]+$/)
			if (num === null) {
				this.plans[pIndex].period = ''
				/* if(validity < this.defaultPlan.validity) {
          this.$Notice.error({
            duration: 5,
            title: 'Validity Validation Error',
            desc: 'Validity should be greater than '+ this.defaultPlan.validity + ' ' + this.defaultPlan.time_unit
          })
        } */
			}
		},
		validatePrice (price, pIndex) {
			if (isNaN(price)) {
				this.plans[pIndex].price = ''
				/* if(price < this.defaultPlan.price) {
          this.$Notice.error({
            duration: 5,
            title: 'Price Validation Error',
            desc: 'Price should be greater than ' + this.defaultPlan.price + '$'
          })
        } */
			}
		},
		checkOpen (index) {
			// if (_.intersection(this.currentOpen,[index]).length > 0)) return true
			return true
		},
		checkAnyMethodAvailable (methods) {
			for (let i = 0; i < methods.length; i++) {
				if (methods[i].active) return true
			}
			return false
		},
		checkAnyRouteAvailable (routes) {
			for (let i = 0; i < routes.length; i++) {
				if (this.checkAnyMethodAvailable(routes[i].methods)) return true
			}
			return false
		},
		makePlanArchived (val, index) {
			let self = this
			if (val == 'archived') {
				if (self.activeTab == 'plan') {
					if (self.plans[index].users < 1) {
						self.$Modal.confirm({
							title: 'Disable confirmation',
							content: '<p><b>' + self.plans[index].name + '</b> is not subscribed by any user so it will be delete permanently.</p>',
							onOk: () => {
								self.disablePlan(index)
							}
						})
					} else {
						self.disablePlan(index)
					}
				} else {
					if (self.plans[index].users < 1) {
						self.$Modal.confirm({
							title: 'Disable confirmation',
							content: '<p><b>' + self.plans[index].name + '</b> is not subscribed by any user so it will be delete permanently.</p>',
							onOk: () => {
								self.disableAddon(index)
							}
						})
					} else {
						self.disableAddon(index)
					}
				}
			} else if (val == 'active') {
				if (self.activeTab == 'plan') {
					self.enablePlan(index)
				} else {
					self.enableAddon(index)
				}
			}
		},
		async createPlan (method) {
			let self = this
			self.addPlanLoading = true
			let data5 = []
			let modules = ['crm', 'uploader', 'webbuilder', 'subscription', 'vshopdata']

			self.plans.filter(function (o) {
				o.class = 'ivu-table-row'
			})

			await registerResource.get().then(res => {
				_.forEach(res.data.data, function (data, key) {
					if (modules.includes(data.module)) {
						for (let action in data.actions[0]) {
							data5.push({'module': data.module, 'service': data.service, 'action': action, 'value': 0})
						}
					}
				})
				self.defaultPlan.details = data5
			}).catch(function (error) {
				self.currentMsgInst = self.$Notice.error({
					duration: 5,
					title: 'Trying to create ' + self.activeTab,
					desc: 'Please try again <b>' + error.message + '</b>'
				})
				self.addPlanLoading = false
			})
			let convertedPrice = self.defaultPlan.price * 100
			let id = uuidv1()
			let planDefinition = {
				'id': id,
				'name': self.defaultPlan.name,
				'description': self.defaultPlan.description,
				'invoice_name': self.defaultPlan.name,
				'price': convertedPrice,
				'status': 'archived',
				'period': self.defaultPlan.validity,
				'period_unit': 'month',
				'meta_data': {
					'details': self.defaultPlan.details
				}
			}
			if (method == 'plan') {
				this.createCbPlan(planDefinition, 'create')
			} else if (method == 'addon') {
				this.createCbAddon(planDefinition, 'create')
			}
			// OLD CODE FOR SUBSCRIPTION
			/* subscriptionPlans.post(self.defaultPlan).then(res => {
        self.$Notice.success({
          title: '<b>New Plan</b>',
          desc: '<b>New Subscription Plan</b> has been created..!'
        })
        res.data.class = 'ivu-table-row-highlight'
        self.plans.splice(0, 0, res.data);
        // self.plans.push(res.data)
        self.addPlanLoading = false
      }).catch(err => {
        if( err.response.status == 403) {
          self.$Notice.error({
            duration: 5,
            title: 'Permission not available for action',
            desc: err.message
          })
        } else {
          self.$Notice.error({
            duration: 5,
            title: 'Trying to create subscription plan',
            desc: 'Please try again ' + err
          })
        }
      }) */
		},
		deletePlan (plan) {
			let self = this
			this.loading = true

			if (self.plans[plan].status == 'archived') {
				self.$Notice.error({
					title: 'Action Denied',
					desc: 'You can\'t delete Disabled/Archived plan because it may subscribed by users.',
					duration: 5
				})
			} else {
				if (self.activeTab == 'plan') {
					self.deleteCbPlan(self.plans[plan].id, plan)
				} else {
					self.deleteCbAddon(self.plans[plan].id, plan)
				}
			}
			/* if (self.activeTab == 'plan') {
        if (self.plans[plan].status == 'archived') {
          self.$Notice.error({
            title: 'Action Denied',
            desc: 'You can\'t delete Disabled/Archived plan because it may subscribed by users.',
            duration: 5
          });
        } else {
          self.deleteCbPlan(self.plans[plan].id, plan);
        }
      } else {
        self.deleteCbAddon(self.plans[plan].id, plan);
      } */
			self.loading = false
			self.confirmDelete = false
		},
		expand (plan) {
			$('#plan_' + plan).slideToggle(function () {
				$(this).is(':hidden') ? 'hidden' : 'visible' // eslint-disable-line no-unused-expressions
			})
		},
		update (index) {
			this.process.cursor = 'progress!important'
			let self = this
			let dataObj = this.plans[index]
			if (dataObj.name == '') {
				this.$Notice.error({
					duration: 5,
					title: 'Plan Name is NULL.',
					desc: '<b>Plan Name</b> should not be null..!'
				})
			} else if (dataObj.object == 'plan' && dataObj.period < this.defaultPlan.validity) {
				this.$Notice.error({
					duration: 5,
					title: 'Please Correct Validity',
					desc: 'Validity should be greater than ' + this.defaultPlan.validity + ' ' + this.defaultPlan.time_unit
				})
			} else if (dataObj.object == 'addon' && dataObj.period == '') {
				this.$Notice.error({
					duration: 5,
					title: 'Please Correct Validity',
					desc: 'Validity can not be empty'
				})
			} else if (dataObj.object == 'plan' && dataObj.price < this.defaultPlan.price) {
				this.$Notice.error({
					duration: 5,
					title: 'Please Correct Price',
					desc: 'Price should be greater than ' + this.defaultPlan.price + '$'
				})
			} else if (dataObj.object == 'addon' && dataObj.price.toString().trim() == '') {
				this.$Notice.error({
					duration: 5,
					title: 'Please Correct Price',
					desc: 'Price can not be empty'
				})
			} else if (this.plans[index].id != undefined) {
				delete dataObj.class
				if (self.activeTab == 'plan') {
					self.updateCbPlan(self.plans[index].id, dataObj)
				} else {
					self.updateCbAddon(self.plans[index].id, dataObj)
				}
				// OLD CODE FOR UPDATE PLAN DETAILS
				/* subscriptionPlans.put(this.plans[index].id, dataObj).then(res => {
          self.$Notice.success({
            title: '<b>' + self.plans[index].name + '</b> saved.',
            desc: 'Subscription Plan <b>' + self.plans[index].name + '</b> has been saved..!'
          })
        }).catch(err => {
          if( err.response.status == 403) {
            self.$Notice.error({
              duration: 5,
              title: 'Permission not available for action',
              desc: err.message
            })
          } else {
            self.$Notice.error({
              duration: 5,
              title: 'Trying to update subscription plan',
              desc: 'Please try again ' + err
            })
          }
        }) */
			}
		},
		createCbPlan (planDefinition, action) {
			let self = this
			cbPlan.post(planDefinition).then(res => {
				if (res.data.api_error_code) {
					if (res.data.api_error_code == 'duplicate_entry') {
						self.$Notice.error({
							title: 'Plan Already Exist.',
							duration: 5,
							desc: res.data.message
						})
					} else {
						self.throwNewError(res)
					}
					self.addPlanLoading = false
					document.body.style.cursor = 'default'
				} else {
					if (action == 'create') {
						self.$Notice.success({
							title: '<b>New Plan</b>',
							desc: '<b>New Subscription Plan</b> has been created..!'
						})
					} else if (action == 'copy') {
						self.$Notice.success({
							title: '<b>Copied Plan</b>',
							desc: 'Selected <b>subscription plan</b> has been copied..!'
						})
					}
					res.data.price /= 100
					res.data.class = 'ivu-table-row-highlight'
					self.plans.splice(0, 0, res.data)
					self.addPlanLoading = false
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
						self.$Notice.error({
							duration: 5,
							title: 'Adding new plan',
							desc: 'API service unavailable.'
						})
					}
				}
				document.body.style.cursor = 'default'
			})
		},
		createCbAddon (planDefinition, action) {
			let self = this
			if (action == 'create') {
				planDefinition.name = 'Addon'
				planDefinition.invoice_name = 'Addon'
			}
			planDefinition.type = 'on_off'
			planDefinition.period_unit = 'month'
			planDefinition.charge_type = 'recurring'
			// delete planDefinition.status;
			cbAddon.post(planDefinition).then(res => {
				if (res.data.api_error_code) {
					if (res.data.api_error_code == 'duplicate_entry') {
						self.$Notice.error({
							title: 'Addon Already Exist.',
							duration: 5,
							desc: res.data.message
						})
					} else {
						self.throwNewError(res)
					}
					self.addPlanLoading = false
					document.body.style.cursor = 'default'
				} else {
					if (action == 'create') {
						self.$Notice.success({
							title: '<b>New Addon</b>',
							desc: '<b>New Addon Plan</b> has been created..!'
						})
					} else if (action == 'copy') {
						self.$Notice.success({
							title: '<b>Copied Addon</b>',
							desc: 'Selected <b>subscription addon</b> has been copied..!'
						})
					}
					res.data.price /= 100
					res.data.class = 'ivu-table-row-highlight'
					self.plans.splice(0, 0, res.data)
					self.addPlanLoading = false
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
						self.$Notice.error({
							duration: 5,
							title: 'Adding new addon',
							desc: 'API service unavailable.'
						})
					}
				}
				document.body.style.cursor = 'default'
			})
		},
		updateCbPlan (id, data) {
			let self = this
			document.body.style.cursor = 'wait'
			let convertedPrice = data.price * 100
			let updateDefinition = {
				'name': data.name,
				'description': data.description,
				'invoice_name': data.name,
				'period': data.period,
				'price': convertedPrice,
				'meta_data': {
					'details': data.meta_data.details
				}
			}
			if (data.users > 0) {
				delete updateDefinition.period
			}
			cbPlan.put(id, updateDefinition).then(res => {
				if (res.data.api_error_code) {
					self.throwNewError(res)
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + res.data.name + '</b> saved.',
						desc: 'Subscription Plan <b>' + res.data.name + '</b> has been saved..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Updating Plan',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Updating Plan',
						desc: err.message,
						duration: 5
					})
				}
				document.body.style.cursor = 'default'
			})
		},
		updateCbAddon (id, data) {
			let self = this
			document.body.style.cursor = 'wait'
			let convertedPrice = data.price * 100
			let updateDefinition = {
				'name': data.name,
				'invoice_name': data.name,
				'price': convertedPrice,
				'period': data.period,
				'description': data.description,
				'meta_data': {
					'details': data.meta_data.details
				}
			}
			if (data.users > 0) {
				delete updateDefinition.period
			}
			cbAddon.put(id, updateDefinition).then(res => {
				if (res.data.api_error_code) {
					self.throwNewError(res)
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + res.data.name + '</b> saved.',
						desc: 'Addon <b>' + res.data.name + '</b> has been saved..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Updating Addon',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Updating Addon',
						desc: err.message,
						duration: 5
					})
				}
				document.body.style.cursor = 'default'
			})
		},
		deleteCbPlan (id, index) {
			let self = this
			document.body.style.cursor = 'wait'
			cbPlan.delete(id).then(res => {
				if (res.data.api_error_code) {
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t delete ' + self.plans[index].name,
							duration: 5,
							desc: res.data.message
						})
					} else {
						self.throwNewError(res)
					}
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> deleted.',
						desc: 'Subscription Plan <b>' + self.plans[index].name + '</b> has been deleted..!'
					})
					self.plans.splice(index, 1)
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Deleting Plan',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Deleting Plan',
						desc: err.message,
						duration: 5
					})
				}
				document.body.style.cursor = 'default'
			})
			self.loading = false
			self.confirmDelete = false
		},
		deleteCbAddon (id, index) {
			let self = this
			document.body.style.cursor = 'wait'
			cbAddon.delete(id).then(res => {
				if (res.data.api_error_code) {
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t delete ' + self.plans[index].name,
							duration: 5,
							desc: res.data.message
						})
					} else {
						self.throwNewError(res)
					}
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> deleted.',
						desc: 'Addon Plan <b>' + self.plans[index].name + '</b> has been deleted..!'
					})
					self.plans.splice(index, 1)
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Deleting Addon',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Deleting Addon',
						desc: err.message,
						duration: 5
					})
				}
				document.body.style.cursor = 'default'
			})
		},
		disablePlan (index) {
			let self = this
			let msg, ttl
			document.body.style.cursor = 'wait'
			cbPlan.delete(self.plans[index].id).then(res => {
				if (res.data.api_error_code) {
					msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
					ttl = res.data.api_error_code.replace(/_/gi, ' ')
					ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t disable ' + self.plans[index].name,
							duration: 5,
							desc: msg
						})
					} else {
						self.$Notice.error({
							title: ttl,
							duration: 5,
							desc: msg
						})
					}
					self.plans[index].status = 'active'
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> Plan Disabled.',
						desc: 'Subscription Plan <b>' + self.plans[index].name + '</b> has been disabled..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Disable Plan',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Disable Plan',
						desc: err.message,
						duration: 5
					})
				}
				self.plans[index].status = 'active'
				document.body.style.cursor = 'default'
			})
		},
		disableAddon (index) {
			let self = this
			let msg, ttl
			document.body.style.cursor = 'wait'
			cbAddon.delete(self.plans[index].id).then(res => {
				if (res.data.api_error_code) {
					msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
					ttl = res.data.api_error_code.replace(/_/gi, ' ')
					ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t disable ' + self.plans[index].name,
							duration: 5,
							desc: msg
						})
					} else {
						self.$Notice.error({
							title: ttl,
							duration: 5,
							desc: msg
						})
					}
					self.plans[index].status = 'active'
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> Addon Disabled.',
						desc: 'Addon Plan <b>' + self.plans[index].name + '</b> has been disabled..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Disable Addon',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Disable Addon',
						desc: err.message,
						duration: 5
					})
				}
				self.plans[index].status = 'active'
				document.body.style.cursor = 'default'
			})
		},
		enablePlan (index) {
			let self = this
			let msg, ttl
			document.body.style.cursor = 'wait'
			cbPlan.patch(self.plans[index].id).then(res => {
				if (res.data.api_error_code) {
					msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
					ttl = res.data.api_error_code.replace(/_/gi, ' ')
					ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t enable ' + self.plans[index].name,
							duration: 5,
							desc: msg
						})
					} else {
						self.$Notice.error({
							title: ttl,
							duration: 5,
							desc: msg
						})
					}
					self.plans[index].status = 'archived'
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> Plan Enabled.',
						desc: 'Subscription Plan <b>' + self.plans[index].name + '</b> has been enabled..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Enable Plan',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Enable Plan',
						desc: err.message,
						duration: 5
					})
				}
				self.plans[index].status = 'archived'
				document.body.style.cursor = 'default'
			})
		},
		enableAddon (index) {
			let self = this
			let msg, ttl
			document.body.style.cursor = 'wait'
			cbAddon.patch(self.plans[index].id).then(res => {
				if (res.data.api_error_code) {
					msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
					ttl = res.data.api_error_code.replace(/_/gi, ' ')
					ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
					if (res.data.api_error_code == 'resource_not_found') {
						self.$Notice.error({
							title: 'You can\'t enable ' + self.plans[index].name,
							duration: 5,
							desc: msg
						})
					} else {
						self.$Notice.error({
							title: ttl,
							duration: 5,
							desc: msg
						})
					}
					self.plans[index].status = 'archived'
					document.body.style.cursor = 'default'
				} else {
					self.$Notice.success({
						title: '<b>' + self.plans[index].name + '</b> Addon Enabled.',
						desc: 'Addon Plan <b>' + self.plans[index].name + '</b> has been enabled..!'
					})
					document.body.style.cursor = 'default'
				}
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.$Notice.error({
						duration: 5,
						title: 'Enable Addon',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						title: 'Enable Addon',
						desc: err.message,
						duration: 5
					})
				}
				self.plans[index].status = 'archived'
				document.body.style.cursor = 'default'
			})
		},
		throwNewError (res) {
			let self = this
			let msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
			let ttl = res.data.api_error_code.replace(/_/gi, ' ')
			ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
			// if (res.data.api_error_code == 'duplicate_entry') {
			//   self.$Notice.error({
			//     title: 'Plan Already Exist.',
			//     duration: 5,
			//     desc: msg
			//   });
			// } else {
			self.$Notice.error({
				title: ttl,
				duration: 5,
				desc: msg
			})
			// }
		}
	}
}
</script>

<style scoped>
#validateErr {
  font-size: 16px;
  color: red;
  margin-top: 25px;
}
#priceErr{
  font-size:16px;
  color:red;
}
#header-fixed {
  position: fixed;
  top: 0px; display:none;
  background-color:white;
}

.col-xs-3 {
  padding-right: 0px;
  padding-left: 0px;
}
.service-header {
  border-bottom: solid 2px #000044;
  background-color: #000044;
  color: white;
}

.outer-main {
  border: solid 3px #000044;
  margin-top: 10px;
  border-radius: 10px;
}

.outer-toggle {
  /*transition: 0.5s all linear;*/
  display: none;
}
.hidden-td {
  height: 0px;
}

.route-header {
  border-bottom: solid 2px black;
  border-top: solid 1px black
}

.method-name {
  border-right: solid 1px black
}

.method {
  border-bottom: solid 0.5px black;
  font-size: 1.5em
}

h3 {
  font-size: 2.5em;
  margin: 10px;
}

h5 {
  font-size: 1.5em;
}

h4, .h4 {
  font-size: 21px;
}

.options {
  padding: 3px;
  border-left: dashed 1px grey;
  cursor: pointer;
}

.options-main {
  padding: 12px;
  border-left: dashed 1px grey;
  cursor: pointer;
}

/* input {
  border: none;
  margin: 2px;
} */

input:focus {
  outline: none !important;
}

/* input.description {
  width: 100%;
  margin-top: -2px;
} */

textarea.description {
  width: 100%;
  margin-top: -2px;
}

.delete {
  margin-top: 5px;
  border-left: solid 1px #dddddd;
  cursor: pointer;
}

.delete-route-option {
  margin-top: 12px;
  border-left: solid 1px #dddddd;
}

.add-service {
  cursor: pointer;
  margin-top: 10px;
}

.main-option {
  padding-bottom: 5px;
}

.pointer {
  cursor: pointer;
}

.pointerX {
  cursor: not-allowed;
}

.input-default-value {
  width: 100%;
  border-left: solid 1px black;
  background-color: #f5f5f5;
  padding: 2px;
}

.no-margin {
  margin: 0px;
  padding: 0px;
}

hr {
  border-width: 2px;
  border-color: #888888;
}

hr.internal {
  border-width: 2px;
  margin: 5px;
  border-color: #888888;
}

div.internal {
  margin: 5px;
}

table {
  width: 100%
}

.internal2 {
  border-left: dashed 1px grey;
}

.ivu-tree{
  margin-right: 80%;
  text-align: left;
}

.ivu-card-bordered:hover {
  border-color: #072C75;
/*border: 4px solid #dddee1;*/
}

.ivu-tree-title {
  display: inline-block;
  margin: 0;
  padding: 0 4px;
  border-radius: 3px;
  cursor: pointer;
  vertical-align: top;
  color: #495060;
  transition: all .2s ease-in-out;
  font-size: 18px;
}
.ivu-tree ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 18px;
}
.ivu-article li:not([class^=ivu-]) {
  margin-bottom: 5px;
  font-size: 14px;
}

.ivu-tree-arrow {
  cursor: pointer;
  width: 12px;
  text-align: center;
  display: inline-block;
}

.ivu-card-bordered {
  border: 4px solid #dddee1;
  border-color: #072C75;
}

.redInput input {
  background-color: #19be6b;
  color: #fff;
}

.ivu-table-cell {
  padding-left: 18px;
  padding-right: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 14px;
}

 #overlay {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: pointer;
    padding-left: 50%;
    padding-top: 25%;
}
</style>
