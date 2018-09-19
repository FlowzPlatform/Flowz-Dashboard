<template>
	<Row class="setMiddle" type="flex" justify="center" align="middle">
    <Col span="16" push="2">
      <div class="third " v-for="(item, index) in mainData">
        <h3 class="type-header" v-if="item.object == 'plan' && basicPlan != undefined">Basic</h3>
        <h3 class="type-header" v-if="item.object == 'addon'">Add-on</h3>
        <section class="plan-tier lift">
          <h4>{{item.name.toUpperCase()}}</h4>
          <h5>
            <sup class="superscript">US$</sup><span class="plan-price">{{item.price}}</span>
              <sub><div v-if="item.validity > 1">
                <p>{{item.validity}} months</p>
                </div>
                <div v-else="item.validity > 1">
                  <p>/mo</p>
                </div>
              </sub>
          </h5>
          <ul>
            <li v-for="itemDec in item.description"><strong>{{itemDec}}</strong></li>
          </ul>
        </section>
        <div class="plus" v-if="mainData.length > 0 && index !== (mainData.length -1)">
          <i class="fa fa-plus-circle"></i>
        </div>
      </div>
    </Col>
    <Col span="8" pull="6">
      <div class="panel panel-custom">
          <div class="panel-heading">
            <h3 class="text-center"><span v-if="!savedCard">Payment Details</span><span v-else>Saved Card Details</span></h3>
          </div>
          <div class="panel-body" style="text-allign:left">
            <Form v-if="!savedCard" ref="payDetail" :model="payDetail" :rules="payDetailRule" autocomplete="off">
              <div class="pull-right">
                <span id="Visa"><img class="pay-icon" src="../../static/visa.png"></img></span>
                <span id="MasterCard"><img class="pay-icon" src="../../static/master-card.png"></img></span>
                <span id="Discover"><img class="pay-icon" src="../../static/discover.png"></img></span>
              </div>
              <Row>
                <Col>
                  <FormItem prop="cardNumber" label="CARD NUMBER">
                    <Input v-model="payDetail.cardNumber" type="text" id="cardNumber" placeholder="Valid Card Number" icon="card" autocomplete="off"></Input>
                  </FormItem>
                </Col>
              </Row>
              <label class="ivu-form-item-label">VALID THRU</label>
              <Row align="bottom" type="flex">
                <Col span="10" pull="3">
                  <Row type="flex" justify="space-around">
                    <Col span="11">
                      <FormItem prop="expiryMM">
                        <Select v-model="payDetail.expiryMM"  placeholder="MM">
                          <Option v-for="item in expiryMonth" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                    <Col span="12">
                      <FormItem prop="expiryYY">
                        <Select v-model="payDetail.expiryYY"  placeholder="YYYY">
                          <Option v-for="item in expiryYear" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                    </Col>
                  </Row>
                </Col>
                <Col span="8" offset="6">
                  <FormItem prop="cvCode" label="CVV CODE">
                    <Input v-model="payDetail.cvCode" type="password" placeholder="CVV Code">
                      <Poptip slot="append" trigger="hover" title="CVV info" placement="right" content="CVV code is a 3 digit number on the back side of your card.">
                        <Icon type="help-circled"></Icon>
                      </Poptip>
                    </Input> 
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <Form v-else :model="payDetail">
              <Row>
                <Col>
									<label class="ivu-form-item-label">CARD NUMBER</label>
                  <FormItem>
                    <span class="sv-card">{{payDetail.cardNumber}}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="VALID THRU">
                    <span class="sv-card">{{ payDetail.expiryMM }} / {{ payDetail.expiryYY }}</span>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormItem label="CARD TYPE">
                    <span class="sv-card">{{ payDetail.cardType }}</span>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div class="panel-footer">
            <Row type="flex" justify="space-around">
                <Col span="5">
									<p v-if="mainData[1]" class="pay-info">PAY {{ mainData[1].price }} USD
                  <!-- <Poptip slot="append" trigger="hover" title="Pay Info" placement="bottom" :content="'Total amount to be pay is ' + parseFloat(mainData[1].price / 30 * remainDays).toFixed(2) + '*' ">
                    <Icon type="help-circled"></Icon>
                  </Poptip> --></p>
                </Col>
                <Col span="6">
                    <Button class="pull-right" type="success" :loading="payloading" @click="payFunction('payDetail')">PAY</Button>
                </Col>
                <Col span="11">
                    <Button type="primary" @click="backFunction()">Back</Button>
                </Col>
            </Row>
          </div>
      </div>
      <div v-if="payDone" :class="payInfo.class">
        <strong>{{payInfo.msgType}}</strong> {{payInfo.msg}}
      </div>
      <div v-if="paying" :class="payInfo.class">
        <strong>{{payInfo.msgType}}</strong> {{payInfo.msg}}
      </div>
    </Col>
  </Row>
</template>
<script>
import cbSubscription from '@/api/cb-subscription'
import cbPlan from '@/api/cb-plan'
import cbAddon from '@/api/cb-addon'
import cbCustomer from '@/api/cb-customer'
import Cookies from 'js-cookie'
import psl from 'psl'
import _ from 'lodash'
import userDetails from '@/api/userdetails'
import config from '../config'

export default {
	props: {
		basicPlan: String,
		basicSubId: String,
		remainDays: Number
	},
	name: 'checkout',
	data () {
		const validateCardNumber = (rule, value, callback) => {
			let self = this
			let checkPoint = value.slice(0, 5)
			checkPoint = self.checkCardType(checkPoint)
			if (checkPoint == 'Visa') {
				document.getElementById('MasterCard').style = 'display: none'
				document.getElementById('Discover').style = 'display: none'
				document.getElementById('Visa').style = 'display: inline-block'
			} else if (checkPoint == 'MasterCard') {
				document.getElementById('Visa').style = 'display: none'
				document.getElementById('Discover').style = 'display: none'
				document.getElementById('MasterCard').style = 'display: inline-block'
			} else if (checkPoint == 'Discover') {
				document.getElementById('Visa').style = 'display: none'
				document.getElementById('Discover').style = 'display: inline-block'
				document.getElementById('MasterCard').style = 'display: none'
			} else {
				document.getElementById('Visa').style = 'display: inline-block'
				document.getElementById('Discover').style = 'display: inline-block'
				document.getElementById('MasterCard').style = 'display: inline-block'
			}

			if (!value) {
				callback(new Error('Please Enter Card Number.'))
			} else if (!value.match(/^[0-9]+$/)) {
				callback(new Error('Please Enter Valid Card Number.'))
			} else if (rule.max != value.length && rule.min != value.length) {
				callback(new Error('Please Enter Valid 16-Digit Card Number.'))
			} else {
				callback()
			}
		}
		const validateCvvNumber = (rule, value, callback) => {
			if (!value) {
				callback(new Error('Please Enter CVV Code.'))
			} else if (isNaN(value)) {
				callback(new Error('Please Enter Valid CVV Code.'))
			} else {
				callback()
			}
		}
		return {
			mainData: [],
			payloading: false,
			validMonth: {
				disabledDate (date) {
					return date && date.valueOf() < Date.now() - 86400000
				}
			},
			payDetail: {
				cardType: '0',
				cardNumber: '',
				expiryMM: null,
				expiryYY: null,
				cvCode: ''
			},
			payDetailRule: {
				cardNumber: [
					{ required: true, min: 16, max: 16, validator: validateCardNumber, trigger: 'blur' }
				],
				expiryMM: [
					{ required: true, message: 'Please Select Expiry Month.', trigger: 'blur' }
				],
				expiryYY: [
					{ required: true, message: 'Please Select Expiry Year.', trigger: 'blur' }
				],
				cvCode: [
					{ required: true, validator: validateCvvNumber, message: '', trigger: 'blur' }
				]
			},
			userCard: '',
			cardTypes: [
				{'Visa': ['4026', '417500', '4405', '4508', '4844', '4913', '4917', '4']},
				{'Discover': ['6011', '622126', '622925', '644', '649', '65']},
				{'MasterCard': ['55', '50']}
			],
			sub_id: '',
			login_token: '',
			payDone: false,
			paying: false,
			payInfo: {
				msgType: '',
				msg: '',
				class: ''
			},
			payAmount: null,
			expiryMonth: [
				{
					value: '01',
					label: '01'
				},
				{
					value: '02',
					label: '02'
				},
				{
					value: '03',
					label: '03'
				},
				{
					value: '04',
					label: '04'
				},
				{
					value: '05',
					label: '05'
				},
				{
					value: '06',
					label: '06'
				},
				{
					value: '07',
					label: '07'
				},
				{
					value: '08',
					label: '08'
				},
				{
					value: '09',
					label: '09'
				},
				{
					value: '10',
					label: '10'
				},
				{
					value: '11',
					label: '11'
				},
				{
					value: '12',
					label: '12'
				}
			],
			expiryYear: [],
			userDetails: null,
			savedCard: false,
			loadingPlans: true,
			currentMsgInst: this.$store.state.currentMsgInst
		}
	},
	async mounted () {
		let self = this
		let data = []

		this.sub_id = this.$route.params.id
		this.$Spin.show({
			render: (h) => {
				return h('div', [
					h('Icon', {
						style: {
							animation: 'ani-demo-spin 1s linear infinite'
						},
						props: {
							type: 'load-c',
							size: 24
						}
					}),
					h('div', 'Processing Your Request.')
				])
			}
		})
		self.userDetails = await this.getUserDetails()
		if (this.basicPlan != undefined) {
			data.push(await this.getPlanDetails(this.basicSubId))
			data.push(await this.getAddonDetails(this.sub_id))
		} else {
			data.push(await this.getPlanDetails(this.sub_id))
		}

		cbCustomer.get(self.userDetails._id).then(res => {
			if (!res.data.api_error_code) {
				self.$refs['payDetail'].resetFields()
				self.savedCard = true
				self.payDetail.cardNumber = res.data.card.iin + '******' + res.data.card.last4
				self.payDetail.expiryMM = res.data.card.expiry_month
				self.payDetail.expiryYY = res.data.card.expiry_year
				self.payDetail.cardType = res.data.card.card_type
				self.$Spin.hide()
			} else {
				if (res.data.api_error_code == 'resource_not_found') {
					self.savedCard = false
				}
				self.$Spin.hide()
			}
			// console.log('Res of customer details', res)
		}).catch(err => {
			if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
				self.$Notice.error({
					duration: 5,
					title: 'Getting customer details',
					desc: err.message
				})
			}
		})
		this.mapData(data)

		for (let j = 0; j <= 20; j++) {
			let yy = new Date().getFullYear() + j
			self.expiryYear.push({label: yy.toString(), value: yy.toString()})
		}
	},
	methods: {
		getPlanDetails (id) {
			let self = this
			return cbPlan.get(id).then(res => {
				return res.data
			}).catch(err => {
				self.$Spin.hide()
				if (err.response && err.response.data.message == 'User authentication fail') {
					this.$Message.error({
						content: 'Your session has been expired please login again.',
						duration: 7,
						closable: true
					})
					let location = psl.parse(window.location.hostname)
					location = location.domain === null ? location.input : location.domain
					Cookies.remove('auth_token', {domain: location})
					Cookies.remove('access', {domain: location})
					Cookies.remove('user', {domain: location})
					self.$router.push({ name: 'login' })
				} else {
					if (err.message == 'Network Error') {
						self.currentMsgInst = self.$Notice.error({
							duration: 5,
							title: 'Fetching selected plan',
							desc: 'API service unavailable.'
						})
					} else {
						self.$Notice.error({
							duration: 5,
							title: 'Fetching selected plan',
							desc: err.response.data.message
						})
					}
				}
			})
		},
		getAddonDetails (id) {
			let self = this
			return cbAddon.get(id).then(res => {
				return res.data
			}).catch(err => {
				if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
					self.$Notice.error({
						duration: 5,
						title: 'Fetching selected addon',
						desc: err.message
					})
				}
			})
		},
		mapData (data) {
			data.map((itm) => {
				if (itm) {
					if (itm.description) { itm.description = itm.description.split('\n') }
					if (itm.price) { itm.price /= 100 }
					if (itm.meta_data && itm.meta_data.details) {
						itm.details = _.chain(itm.meta_data.details).filter(function (o) {
							o.value = parseInt(o.value)
							return o.value > 0
						}).map(function (d) {
							let str = d.module.charAt(0).toUpperCase() + d.module.slice(1)
							let str2 = d.service.charAt(0).toUpperCase() + d.service.slice(1)
							return {'key': '<i class="ivu-icon ivu-icon-android-checkmark-circle"></i> <b>' + str + '</b> ' + str2, 'value': d.value}
						}).value()
					}
				}
			})
			this.mainData = data
		},
		checkCardType (val) {
			let result = []
			if (val != '') {
				result = _.filter(this.cardTypes, function (o) {
					let array = Object.values(o)
					for (var key in array[0]) {
						if (val.startsWith(array[0][key])) {
							return true
						}
					}
				})
			}
			return result.length != 0 ? Object.keys(result[0])[0] : null
		},
		getMMYYYY (expriry) {
			let splited = expriry.split('-')
			this.payDetail.expiryYY = splited[0]
			this.payDetail.expiryMM = splited[1]
		},
		backFunction () {
			this.$router.go(-1)
		},
		updatePayMessage (cls, type, msg) {
			this.payDone = true
			this.payInfo.class = cls
			this.payInfo.msgType = type
			this.payInfo.msg = msg
		},
		async payFunction (name) {
			let self = this
			// let paymentStatus, transactionStatus
			if (!self.savedCard) {
				this.$refs[name].validate(async (valid) => {
					if (valid) {
						self.payloading = true
						self.updatePayMessage('alert alert-warning', 'Processing Payment..!', 'Please do not refresh page or do not go back.')

						let subDetails = {
							'plan_id': self.sub_id,
							'auto_collection': 'on',
							'customer': {
								'auto_collection': 'on'
							},
							'card': {
								'gateway_account_id': config.gatewayAccountId,
								'number': self.payDetail.cardNumber,
								'expiry_month': self.payDetail.expiryMM,
								'expiry_year': self.payDetail.expiryYY,
								'cvv': self.payDetail.cvCode
							}
						}

						let result = await self.subscribeCbPlan(subDetails) // eslint-disable-line no-unused-vars
					}
				})
			} else {
				self.payloading = true
				self.updatePayMessage('alert alert-warning', 'Processing Payment..!', 'Please do not refresh page or do not go back.')
				let subDetails = {
					'plan_id': self.sub_id,
					'auto_collection': 'on'
				}
				let result // eslint-disable-line no-unused-vars
				if (self.basicPlan != undefined) {
					// cbSubscription call to get already subscribed addon quantity
					let quantity = await cbSubscription.get(self.basicPlan).then(res => {
						if (res.data.api_error_code) {
							self.throwNewError(res)
							return res
						} else {
							let addonObj = _.filter(res.data.subscription.addons, { 'id': self.sub_id })
							return addonObj.length > 0 ? addonObj[0].quantity + 1 : 1
						}
					}).catch(err => {
						if (err.message == 'Network Error') {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Purchasing addon',
								desc: 'API service unavailable.'
							})
						} else {
							self.currentMsgInst = self.$Notice.error({
								duration: 5,
								title: 'Purchasing addon',
								desc: err.message
							})
						}
						return err
					})
					// IF CHANGES IN subDetails OBJECT THEN ALSO CHANGE CODE OF AN CB-SUBSCRIPTION's UPDATE METHOD
					if (!isNaN(quantity)) {
						subDetails = {
							'addons': [{
								'id': self.sub_id,
								'quantity': quantity
							}]
						}
						result = await self.subscribeCbAddon(subDetails)
					} else {
						self.payloading = false
					}
				} else {
					result = await self.subscribeCbPlan(subDetails)
				}
			}
		},
		async subscribeCbPlan (subDetails) {
			let self = this
			if (!this.savedCard) {
				subDetails.id = this.userDetails._id
				subDetails.customer.first_name = this.userDetails.firstname
				subDetails.customer.last_name = this.userDetails.lastname
				subDetails.customer.email = this.userDetails.email
				cbSubscription.post(subDetails).then(res => {
					if (res.data.api_error_code) {
						self.throwNewError(res)
					} else {
						self.subscriptionDone(res)
					}
					self.payloading = false
				}).catch(err => {
					self.$Notice.error({
						duration: 5,
						title: 'Purchasing plan',
						desc: err.message
					})
					self.updatePayMessage('alert alert-danger', 'Error..! ', null)
					// console.log('Error while subscribing plan:: ', err)
					self.payloading = false
				})
			} else {
				cbSubscription.patch(this.userDetails._id, subDetails).then(res => {
					if (res.data.api_error_code) {
						self.throwNewError(res)
					} else {
						self.subscriptionDone(res)
					}
					self.payloading = false
				}).catch(err => {
					self.$Notice.error({
						duration: 5,
						title: 'Purchasing plan',
						desc: err.message
					})
					self.updatePayMessage('alert alert-danger', 'Error..! ', null)
					// console.log('Error while sub for customer:: ', err)
					self.payloading = false
				})
			}
		},
		subscribeCbAddon (subDetails) {
			let self = this
			cbSubscription.put(self.basicPlan, subDetails).then(res => {
				if (res.data.api_error_code) {
					self.throwNewError(res)
				} else {
					self.subscriptionDone(res)
				}
				self.payloading = false
			}).catch(err => {
				if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
					self.$Notice.error({
						duration: 5,
						title: 'Purchasing addon',
						desc: err.message
					})
				}
				self.updatePayMessage('alert alert-danger', 'Error..! ', null)
				// console.log('Error while subscribeCbAddon() ', err)
				self.payloading = false
			})
		},
		getUserDetails () {
			return userDetails.get().then(res => {
				return res.data.data
			}).catch(err => {
				return err
			})
		},
		throwNewError (res) {
			let self = this
			let msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
			let ttl = res.data.api_error_code.replace(/_/gi, ' ')
			ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
			self.updatePayMessage('alert alert-danger', 'Error..! ', msg)
			self.$Notice.error({
				title: ttl,
				duration: 5,
				desc: msg
			})
		},
		subscriptionDone (res) {
			let self = this
			// console.log('FINAL RES>>', res)
			self.updatePayMessage('alert alert-success', 'Success..! ', 'Successfully purchased.')
			Cookies.set('welcomeMsg', 'Thanks You For Subscribing...!')
			self.$Notice.success({
				title: 'Subscription Id',
				duration: 0,
				desc: res.data.subscription.id
			})
			this.$router.push({ name: 'planDetails' })
		}
	},
	'watch': {
		'$route.params.id': function (newId, oldId) {
			this.sub_id = newId
		}
	}
}
</script>
<style scoped>
.plus{
  color: #fff;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 21%;
  font-size: 25px;
}
.type-header {
  color: #464c5b;
  font-weight: bold;
  border-radius: 5px;
  font-family: "Source Sans Pro", "helvetica", sans-serif;
}
.sv-card {
  font-size: 16px;
  font-weight: bold;
}
.pay-info {
  font-size: 14px;
  font-weight: bold;
}
.pay-icon {
  width: 55px;
  padding: 5px;
}
.setMiddle{
    width: 100%;
    position: relative;
    top: 50%;
    left: 50%;
    margin: auto;
    position: absolute;
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
}
  .panel-custom {
    border-color: #000044;
  }
  .panel-custom > .panel-heading {
    color: #fff;
    background-color: #000044;
    border-color: #000044;
  }
	/* #big-video-wrap {
		display:none
	} */
  h4 {
    margin-bottom: 12px;
    font-size: 1.50em;
    font-weight: 400;
    text-transform: uppercase;
    text-align: center;
  }

h5 {
  font-size: 1.5em;
}

p {
  margin-top: 1em;
  margin-bottom: 1em;
  color: rgba(39,65,90,.9);
  font-size: 1.25em;
  line-height: 1.625em;
}


ol, ul {
  list-style: none;
}

body {
  line-height: 1;
}

strong {
  color: rgba(39,65,90,1);
  font-weight: 600;
}

.plans {
  background: #e7f2f0;
}

.layer {
  clear: both;
  width: 100%;
  height: auto;
  padding: 60px 7.5% 60px;
  display: block;
}

.layer > section, .layer > article {
  clear: both;
  width: 100%;
  height: auto;
  max-width: 1092px;
  margin: 0 auto;
  display: block;
}

.third {
  width: 20%;
  margin: 0 0px 0 0;
  display: inline-block;
  float:left;
  top:50%;
  margin-right: 4%;
  text-align: center;
}

.plan-tier {
  background: white;
  vertical-align: baseline;
  border-radius: 3px;
  -moz-border-radius: 3px;
  overflow: hidden;
}

.plan-tier:nth-child(2){background: #eee}
.plan-tier:nth-child(4){background: #eee}

.lift {
  position: relative;
  -webkit-transition: all .075s ease-out;
  -moz-transition: all .075s ease-out;
  -o-transition: all .075s ease-out;
  transition: all .075s ease-out;
}

.lift:nth-child(3) active

.lift.active,
.lift:hover {
}


.plan-tier h4 {
  padding: 18px 0 15px;
  margin: 0 0 30px;
  background: #00a55f;
  color: white;
}
.third:nth-child(1) h4 {background: #FBA100;}
.third:nth-child(2) h4 {background: #6BBAA7;}
.plan-tier {
  text-align: center;
  border-right: solid 1px #e7f2f0;
}

.plan-tier sup {
  position: relative;
  right: -9px;
}

.plan-tier ul {
  margin: 30px 0 0;
  border-top: 1px solid #777;
}

.plan-tier ul li {
  font-size: 1.25em;
  padding: 18px 0;
  color: rgba(39,65,90,.9);
  border-bottom: 1px solid #777;
  text-transform: capitalize;
}

sup {
vertical-align: top;
}

.plan-tier .plan-price {
  font-size: 2.5em;
  font-weight: 300;
  letter-spacing: -3px;
}

.plan-tier sub {
  position: relative;
  bottom: -0.125em;
  display: inline-block;
  vertical-align: bottom;
  line-height: 13px;
  font-size: 12px;
  text-transform: capitalize;
  text-align: left;
  margin-left: 3px;
  color: #737373;
}

.plan-tier sub p{
  text-transform: lowercase;
}

.plan-tier .early-adopter-price {
color: #0091e5;
}
p:first-of-type {
  margin-top: 0;
}

small, del {
  color: rgba(39,65,90,.5);
  font-size: 1em;
  line-height: 1.5em;
}

s, strike, del {
  text-decoration: line-through;
}


.layer {
  padding-top: 96px;
  padding-bottom: 96px;
}

.plan-tier.callout h6 {
  width: 100%;
  padding: 15px 0 14px;
  background: #8dcf3f;
  color: rgba(39,65,90,.5);
  font-size: 1.25em;
}

.plan-tier.callout h4 {
  background-color: #78b336;
}
</style>
