<template>
	<div>
	<div class="checkout">
    <div class="container">
      <div class="tablePadding">
          <div class="col-md-2"></div>
          <div class="col-md-8">
              <div v-if="payDone" :class="payInfo.class">
                <strong>{{payInfo.msgType}}</strong> {{payInfo.msg}}.
              </div>
              <div class="panel panel-custom" style="">
                  <div class="panel-heading">
                      <h3 class="text-center">Payment Details</h3></div>
                  <div class="panel-body" style="text-allign:left">
                      <Form ref="payDetail" :model="payDetail" :rules="payDetailRule">
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
                        <FormItem prop="cardNumber" label="CARD NUMBER">
                          <Input v-model="payDetail.cardNumber" type="text" id="cardNumber" placeholder="Valid Card Number"></Input>
                        </FormItem>
                        <Row>
                          <Col span="8">
                            <FormItem prop="expiryMM" label="VALID THRU">
                              <DatePicker format="yy-MM"  @on-change="getMMYYYY" type="month" :options="validMonth" placeholder="Select Month and Year" style="width: 200px"></DatePicker>
                            </FormItem>
                          </Col>
                          <Col span="6" push="10">
                            <FormItem prop="cvCode" label="CV CODE">
                              <Input v-model="payDetail.cvCode" type="password" placeholder="CV Code"></Input>
                            </FormItem>
                          </Col>
                        </Row>
                    </Form>
                  </div>
                  <div class="panel-footer">
                      <div class="row" style="padding:10px">
                        <div class="col-xs-6 col-md-6">
                            <a class="btn btn-lg btn-block btn-default" @click="backFunction()">Back</a>
                        </div>
                        <div class="col-xs-6 col-md-6">
                            <a class="btn btn-lg btn-block btn-success" @click="payFunction('payDetail')">PAY</a>
                        </div>
                      </div>
                  </div>
              </div>
              <div v-if="paying" :class="payInfo.class">
                <strong>{{payInfo.msgType}}</strong> {{payInfo.msg}}.
              </div>
          </div>
      </div>
    </div>
    <!-- {{payDetail}}{{sub_id}} -->
  </div>
</div>
</template>
<script>
// import axios from 'axios'
import checkout from '@/api/checkout'
import Cookies from 'js-cookie'

export default {
  name: 'checkout',
  data () {
    return {
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
          { required: true, message: 'Please fill card number', trigger: 'blur' }
        ],
        expiryMM: [
          { required: true, message: 'Please select expiry month and year', trigger: 'blur' }
        ],
        expiryYY: [
          { required: true, message: 'Please select expiry month and year', trigger: 'blur' }
        ],
        cvCode: [
          { required: true, message: 'Please enter CV code', trigger: 'blur' }
        ]
      },
      sub_id: '',
      login_token: '',
      payDone: false,
      paying: false,
      payInfo: {
        msgType: '',
        msg: '',
        class: ''
      }
    }
  },
  mounted () {
    this.sub_id = this.$route.params.id
  },
  methods: {
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
    this.$refs[name].validate((valid) => {
      if (valid) {
        // this.paying = true
        this.payDone = true
        this.payInfo.class = 'alert alert-warning'
        this.payInfo.msgType = 'Processing payment..!'
        this.payInfo.msg = 'Please do not refresh page or do not go back.'
        // let auth_token = this.$cookie.get('auth_token')2128
        var sObj = {
          sub_id: this.sub_id,
          login_token: this.login_token,
          payDetail: this.payDetail
        }
        checkout.post(sObj).then(res => {
          // this.payDone = true
          if (res.data.hasOwnProperty('error')) {
            this.payInfo.class = 'alert alert-danger'
            this.payInfo.msgType = 'Error!'
            this.payInfo.msg = 'Payment Not Done.'
          } else {
            this.payInfo.class = 'alert alert-success'
            this.payInfo.msgType = 'Success!'
            this.payInfo.msg = 'Payment successfully Done.'
            Cookies.set('welcomeMsg', 'Thank You for Subscribing...!')
            this.$router.push('/plan-details/')
          }
          // self.paying = false
        })
        .catch(err => {
          self.$Notice.error({
            duration: 5,
            title: 'Payment fail..!',
            desc: 'Please try again or after some time.'
          })
          self.payInfo.class = 'alert alert-danger'
          self.payInfo.msgType = 'Error!'
          self.payInfo.msg = 'Payment Not Done.'
          self.paying = false
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
	.tablePadding {
		padding-top: 10px;
		width: 50%;
	}
</style>
