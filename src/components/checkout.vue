<template>
	<Row class="setMiddle" type="flex" justify="center" align="middle">
    <Col span="16" push="6">
      <section class="third lift plan-tier lift.active" v-for="(item, index) in mainData">
        <h4>{{item.name.toUpperCase()}}</h4>
        <h5><sup class="superscript">US$</sup><span class="plan-price">{{item.price}}</span>
            <sub><div v-if="item.validity > 1">
                  <p>{{item.validity}} months</p>
                  </div>
                  <div v-else="item.validity > 1">
                        <p>/mo</p>
                  </div>
            </sub>
        </h5>
        <ul>
          <li v-for="(itemDec, indexDec) in item.description"><strong>{{itemDec}}</strong></li>
        </ul>
      </section>
    </Col>
    <Col span="8" pull="6">
      <div class="panel panel-custom">
          <div class="panel-heading">
              <h3 class="text-center">Payment Details</h3></div>
          <div class="panel-body" style="text-allign:left">
              <Form ref="payDetail" :model="payDetail" :rules="payDetailRule">
               <div class="pull-right ">
                   <!--  <RadioGroup v-model="payDetail.cardtype" size="large">
                      <Radio label="apple">   v-if="userCard == 'Visa'"  -->
                        <span id="Visa"><img class="pay-icon" src="../../static/visa.png"></img></span>
                     <!--  </Radio> -->
                      <!-- <Radio label="android">     v-if="userCard == 'MasterCard'"  -->
                         <span id="MasterCard"><img class="pay-icon" src="../../static/master-card.png"></img></span>
                      <!-- </Radio> -->
                      <!-- <Radio label="windows">   v-if="userCard == 'Discover'"  -->
                         <span id="Discover"><img class="pay-icon" src="../../static/discover.png"></img></span>
                      <!-- </Radio> -->
                  <!-- </RadioGroup> -->
                </div>
                 <!-- 
                <Row>
                  <Col span="10">
                    <div class="form-group" style="text-align:left">
                        <div>
                          <FormItem prop="cardtype" label="CARD TYPE">
                            <Select v-model="payDetail.cardtype">
                              <Option value="Visa">Visa</Option>
                              <Option value="MasterCard">MasterCard</Option>
                              <Option value="Discover">Discover</Option>
                            </Select> 
                          </FormItem>
                        </div>
                    </div>
                  </Col>
                </Row> -->
                <!-- <div class="form-group">
                      <select v-model="payDetail.cardType" class="form-control" name="cardtype" id="cardType" style="margin-bottom: 15px">
                        <option name="" value="0">Select Card Type</option>
                        <option name="Visa" value="Visa">Visa</option>
                        <option name="MasterCard" value="MasterCard">MasterCard</option>
                        <option name="RuPay" value="RuPay">RuPay</option>
                        <option name="Maestro" value="Maestro">Maestro</option>
                        <option name="American Express" value="American Express">American Express</option>
                    </select>
                </div> -->
                <Row>
                  <Col>
                    <FormItem prop="cardNumber" label="CARD NUMBER">
                      <Input v-model="payDetail.cardNumber" type="text" id="cardNumber" placeholder="Valid Card Number" icon="card"></Input>
                    </FormItem>
                  </Col>
                </Row>
                <label class="ivu-form-item-label">VALID THRU</label>
                <Row align="bottom" type="flex">
                  <Col span="10" pull="4">
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
                      <!--<DatePicker format="yy-MM"  @on-change="getMMYYYY" type="month" :options="validMonth" placeholder="Select Month and Year" style="width: 200px"></DatePicker>-->
                    </Row>
                  </Col>
                  <Col span="8" offset="6">
                    <FormItem prop="cvCode" label="CVV CODE">
                      <Input v-model="payDetail.cvCode" type="password" placeholder="CVV Code" >
                        <Poptip slot="append" trigger="hover" title="CVV info" placement="right" content="CVV code is a 3 digit number on the back side of your card.">
                          <Icon type="help-circled"></Icon>
                        </Poptip>
                      </Input> 
                    </FormItem>
                  </Col>
                </Row>
            </Form>
          </div>
          <div class="panel-footer">
            <Row type="flex" justify="space-around">
                <Col span="11">
                    <!-- set attribute to Col span="16" offset="4" 
                    <Button title="PayPal" type="success" :loading="payloading" @click="payFunction('payDetail')"><i class="fa fa-paypal" aria-hidden="true"></i></Button>
                    <Button title="Stripe" type="success" :loading="payloading" @click="payFunction('payDetail')"><i class="fa fa-cc-stripe" aria-hidden="true"></i></Button>
                    <Button style="font-weight: bold; font-size: 15px;" title="Authorize.Net" type="success" :loading="payloading" @click="payFunction('payDetail')">Authorize.Net /* <img style="width:80px;" src="../../static/authnet.png"></img> */</Button> -->
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
// import axios from 'axios'
import checkout from '@/api/checkout'
import Cookies from 'js-cookie'
import subscriptionPlans from '@/api/subscription-plans'  
import { setTimeout } from 'timers';
import transactions from '@/api/transactions'

export default {
  name: 'checkout',
  data () {
    const validateCardNumber = (rule, value, callback) => {
      let self = this
      let checkPoint = value.slice(0, 5);
      checkPoint = self.checkCardType(checkPoint)
      if (checkPoint == 'Visa') {
        document.getElementById('MasterCard').style = "display: none";
        document.getElementById('Discover').style = "display: none";
        document.getElementById('Visa').style = "display: inline-block";
      } else if(checkPoint == 'MasterCard') {
        document.getElementById('Visa').style = "display: none";
        document.getElementById('Discover').style = "display: none";
        document.getElementById('MasterCard').style = "display: inline-block";
      } else if(checkPoint == 'Discover') {
        document.getElementById('Visa').style = "display: none";
        document.getElementById('Discover').style = "display: inline-block";
        document.getElementById('MasterCard').style = "display: none";
      } else {
        document.getElementById('Visa').style = "display: inline-block";
        document.getElementById('Discover').style = "display: inline-block";
        document.getElementById('MasterCard').style = "display: inline-block";
      }

      if (!value) {
        callback(new Error('Please Enter Card Number.'))
      } else if (isNaN(value)) {
        callback(new Error('Please Enter Valid Card Number.'))
      } else if (rule.max != value.length && rule.min != value.length) {
        callback(new Error('Please Enter Valid 16-Digit Card Number.'))
      } else {
        callback();
      }
    };
    const validateCvvNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please Enter CVV Code.'))
      } else if (isNaN(value)) {
        callback(new Error('Please Enter Valid CVV Code.'))
      } else {
        callback();
      }
    };

    return {
      mainData: [],
			payloading: false,
      validMonth: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      payDetail: {
        cardType: '0',
        cardNumber: '',
        expiryMM: '',
        expiryYY: '',
        cvCode: ''
      },
      payDetailRule: {
        cardNumber : [
          { required: true, min: 16, max:16, validator: validateCardNumber, trigger: 'blur' }
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
        { 'Visa': ['4026', '417500', '4405', '4508', '4844', '4913', '4917', '4'] },
        { 'Discover': ['6011', '622126', '622925', '644', '649', '65'] },
        { 'MasterCard': ['55', '50'] }
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
      expiryYear: []
    }
  },
  mounted () {
    let self = this
    this.sub_id = this.$route.params.id
    subscriptionPlans.getThis( this.sub_id).then(res => {
      self.mainData.push(res.data)
      self.mainData.sort(function(a, b) {
        return a.price-b.price
      })
      for(let i = 0; i < self.mainData.length; i++) {
        self.mainData[i].description = self.mainData[i].description.split('\n')
        self.mainData[i].details = _.chain(self.mainData[i].details).filter(function(o) {
            o.value = parseInt(o.value)
            return o.value > 0
        }).map(function(d) {
            let str = d.module.charAt(0).toUpperCase() + d.module.slice(1)
            let str2 = d.service.charAt(0).toUpperCase() + d.service.slice(1)
            return {'key':'<i class="ivu-icon ivu-icon-android-checkmark-circle"></i> <b>'+str+'</b> '+str2, 'value': d.value}
        }).value()
      }
    }).catch(err => {
      self.$Notice.error({
          duration: 5,
          title: 'Fetching subscription plan',
          desc: err.response.data.message
      });
    })
    for(let j=0; j <= 20; j++ ){
      let yy = new Date().getFullYear()+j
      self.expiryYear.push({label: yy.toString(),value: yy.toString()})
    }
  },
  methods: {
    checkCardType (val) {
      let result = []
      if(val != '') {
        result = _.filter(this.cardTypes, function(o) {
          let array = Object.values(o)
          for(var key in array[0]) {
            if(val.startsWith(array[0][key])) {
              return true
            }
          }
        })
      }
      return result.length !=0 ? Object.keys(result[0])[0] : null
    },
    getMMYYYY (expriry) {
      let splited = expriry.split('-')
      this.payDetail.expiryYY = splited[0]
      this.payDetail.expiryMM = splited[1]
    },
    backFunction () {
      this.$router.push('/subscription-list')
    },
    payFunction (name) {
    let self = this
    let paymentStatus, transactionStatus
    this.$refs[name].validate((valid) => {
      if (valid) {  
				self.payloading = true
        // this.paying = true
        this.payDone = true
        this.payInfo.class = 'alert alert-warning'
        this.payInfo.msgType = 'Processing Payment..!'
        this.payInfo.msg = 'Please do not refresh page or do not go back.'
        // let auth_token = this.$cookie.get('auth_token')2128
        var sObj = {
          sub_id: this.sub_id,
          login_token: this.login_token,
          payDetail: this.payDetail
        }

        checkout.post(sObj).then(async res => {
          await transactions.get(res.data.transaction_id).then(res => {
            transactionStatus = res.data.transaction_status
            paymentStatus = res.data.payment_status
          }).catch(err => {
            console.log('ERR', err)
          })
          if (res.data.hasOwnProperty('error')) {
            this.payInfo.class = 'alert alert-danger'
            this.payInfo.msgType = 'Error..! '
            if(res.data.error === 'NotAuthenticated') {
              self.payInfo.msg = res.data.message + ' You will automatically logout in 5 sec.'
              setTimeout(function() {
                Cookies.remove('auth_token');
                Cookies.remove('user');
                self.$router.push({
                  name: 'login'
                })
              }, 5000)
            } else if (res.data.error === 'ReqlDriverError') {
              self.payInfo.msg = 'Transaction failed, RethinkDB service unavailable.'
              self.payloading = false
            } else {
              if(paymentStatus == true) {
                this.$Modal.warning({
                  title: 'Warning',
                  content: '<p>Your <b>PAYMENT</b> has been done, but subscription process not completed.</p><br><p> So, Please contact support team with transaction id<br><b> ' + res.data.transaction_id + '</b></p>'
                });
              }                
              this.payInfo.msg = res.data.message
              self.payloading = false
            }
          } else if (res.data != undefined && res.data.transaction_id != undefined) {
            this.payInfo.class = 'alert alert-success'
            this.payInfo.msgType = 'Success..! '
            this.$Notice.success({
              title: 'Your Last Transaction id',
              desc: 'Please note down for your further reference <b>' + res.data.transaction_id + '</b>',
              duration: 0
            })
            this.payInfo.msg = res.data.outcome.seller_message
            Cookies.set('welcomeMsg', 'Thank You For Subscribing...!')
            this.$router.push({
              name: 'planDetails'
            })
					}
          // self.paying = false
        }).catch(err => {
          self.$Notice.error({
            duration: 5,
            title: 'Payment Fail..!',
            desc: err + ' Please Try Again After Sometime.'
          })
          self.payInfo.class = 'alert alert-danger'
          self.payInfo.msgType = 'Error..! '
          self.payInfo.msg = 'Server connection lost, try after some time.'
          self.paying = false
					self.payloading = false
        })

        // axios({
        // 				method:'post',
        // 				url:"http://localhost:3030/checkout",
        // 				headers: {'authorization': auth_token},
        // 				data:sObj
        // 			}).then(res => {
        // 				console.log("response.....",res)
        // 				this.payDone = true
        //         if (res.data.hasOwnProperty('error')) {
        //           this.payInfo.class = 'alert alert-danger'
        //           this.payInfo.msgType = 'Error!'
        //           this.payInfo.msg = 'Payment Not Done.'
        //         } else {
        //           this.payInfo.class = 'alert alert-success'
        //           this.payInfo.msgType = 'Success!'
        //           this.payInfo.msg = 'Payment successfully Done.'
        // 					this.$router.push('/plan-details/' + this.sub_id)
        //         }
        //         self.paying = false
        // 		 })
        // 		 .catch(function (error) {
        // 			 self.$Notice.error({
        // 					 duration: 5,
        // 					 title: 'Payment fail..!',
        //            desc: 'Please try again or after some time.'
        // 			 });
        //        self.paying = false
        // 		 });
      }
    })
  }
},
  'watch': {
    '$route.params.id': function(newId, oldId) {
      this.sub_id = newId
    }
  }
}
</script>
<style scoped>
/* .fa {
  font-size: 20px;
}
.ivu-btn-success {
    background-color: #081944;
    border-color: #081944;
}
.ivu-btn-success:hover {
  background-color: #081944b5;
    border-color: #081944b5;
} */
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
	#big-video-wrap {
		display:none
	}
  h4 {
    margin-bottom: 12px;
    font-size: 1.25em;
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

.plan-tier:nth-child(1) h4 {background: #00a55f}
.plan-tier:nth-child(2) h4 {background: #6BBAA7;}
.plan-tier:nth-child(3) h4 {background: #FBA100;}
.plan-tier:nth-child(4) h4 {background: #6C648B;}
.plan-tier:nth-child(5) h4 {background: #B6A19E;}

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
