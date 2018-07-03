<template>
<Row style="margin-top:30px;">
    <Col span="14" push="5">
        <Card>
            <!-- <h3>Thank You for Subscribing...!</h3> -->
            <div style="font-size: x-large;">
				My Plan
				<div class="pull-right">
					<Button type="ghost" @click="showCardDetails = true, getCustomerCardDetails()" shape="circle" icon="card">Update Card Details</Button>
				</div>
			</div><br>
                <Row>
                    <Col span="22" push="1">
                        <Table :loading="loading" class='dataTable' :columns="planDetails" :data="planList" no-data-text="No Subscription Found"></Table>
                        <Page v-if="planListData.length > pageSize" style="margin-top:10px;" class="pull-right" :total="planListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
                    </Col>
                </Row>
        </Card>
    </Col>
	<Modal v-model="showCardDetails" :mask-closable="false" width="50%">
		<p slot="header">
			<span>Update Card Details</span>
			<Poptip v-if="customerDetails != null" slot="append" trigger="hover" placement="bottom">
				<div slot="title">Your Card Details</div>
				<div slot="content">
					<table>
						<tr>
							<td>CARD</td>
							<td>{{ customerDetails.masked_number }}</td>
						</tr>
						<tr>
							<td>VALID UPTO</td>
							<td class="td-align">{{ customerDetails.expiry_month }}/{{ customerDetails.expiry_year }}</td>
						</tr>
						<tr>
							<td>CARD TYPE</td>
							<td class="td-align">{{ customerDetails.card_type }}</td>
						</tr>
						<tr>
							<td>STATUS</td>
							<td class="td-align">{{ customerDetails.status }}</td>
						</tr>
					</table>
				</div>
				<Icon size="20px" type="help-circled"></Icon>
			</Poptip>
        </p>
		<Row type="flex" justify="center">
			<Col span="12">
				<Form ref="cardDetails" :model="cardDetails" :rules="cardDetailsRule" label-position="left">
					<Row>
						<FormItem label="CARD NUMBER" prop="cardNumber">
							<Input v-model="cardDetails.cardNumber" type="text" placeholder="Valid Card Number" icon="card" autocomplete="off"></Input>
						</FormItem>
					</Row>
					<Row type="flex">
						<Col span="24" >
							<FormItem prop="cvCode" label="CVV CODE">
								<Input v-model="cardDetails.cvCode" type="password" placeholder="CVV Code" >
									<Poptip slot="append" trigger="hover" title="CVV info" placement="right" content="CVV code is a 3 digit number on the back side of your card.">
										<Icon type="help-circled"></Icon>
									</Poptip>
								</Input> 
							</FormItem>
						</Col>
						<Col span="24">
							<label class="ivu-form-item-label">VALID THRU</label>
							<Row type="flex" justify="space-around">
								<Col span="11">
									<FormItem prop="expiryMM">
										<Select v-model="cardDetails.expiryMM"  placeholder="MM">
										<Option v-for="item in expiryMonth" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</FormItem>
								</Col>
								<Col span="12">
									<FormItem prop="expiryYY">
										<Select v-model="cardDetails.expiryYY"  placeholder="YYYY">
										<Option v-for="item in expiryYear" :value="item.value" :key="item.value">{{ item.label }}</Option>
										</Select>
									</FormItem>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row type="flex" justify="center">
						<FormItem>
							<Button type="primary" :loading="submitLoading" @click="updateCardDetails('cardDetails')">Submit</Button>
							<Button type="ghost" @click="updateCardDetailsReset('cardDetails')" style="margin-left: 8px">Reset</Button>
						</FormItem>
					</Row>
				</Form>
			</Col>
		</Row>
		<div slot="footer"></div>
  	</Modal>
</Row>
</template>
<script>
import getUserDetails from '@/api/userdetails'
import cbSubscription from '@/api/cb-subscription'
import cbCustomer from '@/api/cb-customer'
import cbPlan from '@/api/cb-plan'
import Cookies from 'js-cookie'
import addOn from './add-on.vue'
import psl from 'psl'
let moment = require('moment')
moment().format()

export default {
	components: { addOn },
	name: 'planDetails',
	data () {
		const validateCardNumber = (rule, value, callback) => {
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
			moment: moment,
			loading: true,
			planDetails: [
				{
					type: 'expand',
					width: 50,
					render: (h, params) => {
						return h(addOn, {
							props: {
								row: params.row,
								table: true
							}
						})
					}
				},
				{
					title: 'Plan',
					key: 'plan_name'
				},
				{
					title: 'Price',
					key: 'plan_unit_price',
					align: 'center'
				},
				/* {
					title: 'Validity (Months)',
					key: 'billing_period',
					align: 'center'
				}, */
				{
					title: 'Subscribed',
					key: 'started_at',
					align: 'center'
				},
				{
					title: 'Expiry Date',
					key: 'current_term_end',
					sortable: true
				},
				{
					title: 'Status',
					key: 'status'
				},
				{
					title: 'ON OFF Subscription',
					render: (h, params) => {
						return h('div', [
							h('i-switch', {
								props: {
									size: 'small',
									'true-value': 'active',
									'false-value': 'paused',
									'value': this.planList[params.index].status
								},
								on: {
									'on-change': (status) => {
										this.pauseSubscription(params)
									}
								}
							}, '')
						])
					},
					width: 160,
					align: 'center'
				}
			],
			planListData: [],
			planList: [],
			userDetails: null,
			currentPage: 1,
			pageSize: 10,
			currentMsgInst: this.$store.state.currentMsgInst,
			showCardDetails: false,
			validateModal: false,
			cardDetails: {
				cardNumber: null,
				cvCode: null,
				expiryMM: null,
				expiryYY: null
			},
			cardDetailsRule: {
				cardNumber: [{ required: true, min: 16, max: 16, validator: validateCardNumber, trigger: 'blur' }],
				cvCode: [{ required: true, validator: validateCvvNumber, trigger: 'blur' }],
				expiryMM: [{ required: true, message: 'Please Select Expiry Month.', trigger: 'blur' }],
				expiryYY: [{ required: true, message: 'Please Select Expiry Year.', trigger: 'blur' }]
			},
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
			customerDetails: null,
			submitLoading: false
		}
	},
	methods: {
		pauseSubscription (params) {
			let status
			let self = this
			document.body.style.cursor = 'wait'
			if (params.row.status === 'active') {
				status = true
				this.planList[params.index].status = 'paused'
			} else if (params.row.status === 'paused') {
				status = false
				this.planList[params.index].status = 'active'
			}
			cbSubscription.pauseSubscription(params.row.id, status).then(res => {
				this.$Notice.success({
					title: 'Subscription plan has been ' + self.planList[params.index].status
				})
				document.body.style.cursor = 'default'
			}).catch(err => {
				if (err.message == 'Network Error') {
					self.currentMsgInst = self.$Notice.error({
						duration: 5,
						title: 'Please try again after some time',
						desc: 'API service unavailable.'
					})
				} else {
					self.$Notice.error({
						duration: 5,
						title: 'Please try again after some time',
						desc: err.message
					})
				}
				if (params.row.status === 'paused') {
					this.planList[params.index].status = 'paused'
				} else {
					this.planList[params.index].status = 'active'
				}
				document.body.style.cursor = 'default'
			})
		},
		async changePage (pageNo) {
			this.planList = await this.makeChunk(pageNo, this.pageSize)
		},
		async makeChunk (pageNo, size) {
			let chunk = []
			for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
				if (this.planListData[i] != undefined) {
					await chunk.push(this.planListData[i])
				}
			}
			return chunk.slice()
		},
		getPlanName (itm) {
			return cbPlan.get(itm.subscription.plan_id).then(res => {
				return res.data.name
			})
		},
		getCustomerCardDetails () {
			cbCustomer.get(this.userDetails._id).then(res => {
				this.customerDetails = res.data.card
			}).catch(err => {
				this.$Notice.error({
					title: 'Can\'t find customer details',
					desc: err.message,
					duration: 5
				})
			})
		},
		updateCardDetails (name) {
			let self = this
			this.$refs[name].validate((valid) => {
				if (valid) {
					self.submitLoading = true
					let data = {
						number: this.cardDetails.cardNumber,
						expiry_month: this.cardDetails.expiryMM,
						expiry_year: this.cardDetails.expiryYY,
						cvv: this.cardDetails.cvCode
					}
					cbCustomer.patch(this.customerDetails.customer_id, data).then(res => {
						if (res.data.api_error_code) {
							self.throwNewError(res)
							self.submitLoading = false
						} else {
							self.$Notice.success({
								title: 'Card details updated successfully',
								desc: 'It will take some time to update details.',
								duration: 10
							})
							self.showCardDetails = false
							self.$refs[name].resetFields()
							self.submitLoading = false
						}
					}).catch(err => {
						if (err.message == 'Network Error') {
							self.$Notice.error({
								duration: 5,
								title: 'Updating card details',
								desc: 'API service unavailable.'
							})
						} else {
							self.$Notice.error({
								duration: 5,
								title: 'Updating card details',
								desc: err.message
							})
						}
						self.submitLoading = false
					})
				} else {
					this.$Message.error('Please fill required fields..!')
				}
			})
		},
		updateCardDetailsReset (name) {
			this.$refs[name].resetFields()
		},
		throwNewError (res) {
			let self = this
			let msg = res.data.error_msg.substr(res.data.error_msg.indexOf(':') + 1)
			let ttl = res.data.api_error_code.replace(/_/gi, ' ')
			ttl = ttl.charAt(0).toUpperCase() + ttl.slice(1)
			// self.updatePayMessage('alert alert-danger', 'Error..! ', msg)
			self.$Notice.error({
				title: ttl,
				duration: 5,
				desc: msg
			})
		}
	},
	async mounted () {
		let self = this
		if (Cookies.get('welcomeMsg')) {
			this.$Message.success(Cookies.get('welcomeMsg'))
			Cookies.remove('welcomeMsg')
		}
		await getUserDetails.get().then(res => {
			self.userDetails = res.data.data
		}).catch(err => {
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
			} else if (err.message == 'Network Error') {
				self.currentMsgInst = self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: 'API service unavailable.'
				})
			} else {
				self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: err.message
				})
			}
		})
		cbSubscription.getOwn(self.userDetails._id).then(async res => {
			let obj = res.data.map(async (itm) => {
				itm.subscription.plan_unit_price /= 100
				itm.subscription.started_at = moment.unix(itm.subscription.started_at).format('DD MMM YYYY')
				itm.subscription.current_term_end = moment.unix(itm.subscription.current_term_end).format('DD MMM YYYY')
				itm.subscription.plan_name = await self.getPlanName(itm)
				Promise.resolve(itm.subscription.plan_name)
				return itm.subscription
			})
			Promise.all(obj).then(async res => {
				self.planListData = res
				self.planList = await self.makeChunk(self.currentPage, self.pageSize)
				self.loading = false
			})
		}).catch(err => {
			if (err.message == 'Network Error') {
				self.currentMsgInst = self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: 'API service unavailable.'
				})
			} else {
				self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: err.message
				})
			}
			self.loading = false
		})
		for (let j = 0; j <= 20; j++) {
			let yy = new Date().getFullYear() + j
			self.expiryYear.push({label: yy.toString(), value: yy.toString()})
		}
		// OLD CODE FOR SUBSCRIPTION
		/* userSubscription.getOwn().then(async res => {
            res.data.data = await _.orderBy(res.data.data, 'createdAt', 'desc')
            await res.data.data.filter(function(o) {
                o.expiredOn = moment(o.expiredOn).format("DD-MMM-YYYY")
                o.createdAt = moment(o.createdAt).fromNow()
            })
            self.planListData = res.data.data
            self.planList = await self.makeChunk(self.currentPage, self.pageSize)
            // if(self.planList.length > 0) {
            self.loading = false
            // }
        }).catch(err => {
            if(err.message == 'Network Error'){
                self.$Notice.error({
                    duration: 5,
                    title: 'Getting your plans',
                    desc: 'API service unavailable.'
                });
            } else {
                self.$Notice.error({
                    duration: 5,
                    title: 'Getting your plans',
                    desc: err.response.data.message
                });
            }
            self.loading = false
        }) */
	}
}
</script>
<style scoped>
.td-align {
	text-align: right
}
h3 {
    font-size: 30px;
    text-align: center;
}
.ivu-table th {
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #054890;
  color: #fff;
}
th .ivu-table-cell {
    display: inline-block;
    word-wrap: normal;
    vertical-align: middle;
    font-size: 16px;
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
    font-size: 16px;
}
td.ivu-table-expanded-cell {
    padding: 0px;
    background: #f8f8f9;
}
</style>
