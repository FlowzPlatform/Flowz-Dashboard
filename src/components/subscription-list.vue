<template>
<div>
  <section v-if="basicPlans.length > 0" class="layer plans">
    <section class="backWhite">
    <div class="type-header">
      <p>Basic Plans</p>
    </div>
      <section @click="checkoutFunction(item.id)" class="third lift plan-tier lift.active" v-for="(item, index) in basicPlans">
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
      <div style="clear: both"></div>
    </section>
  </section>
  <section v-if="addOns.length > 0" class="layer plans">
    <section class="backWhite">
    <div class="type-header">
      <p>Add-on</p>
    </div>
      <section @click="checkoutAddonFunction(item.id)" class="third lift plan-tier lift.active" v-for="(item, index) in addOns">
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
      <div style="clear: both"></div>
    </section>
  </section>
  <Modal title="My Plan" v-model="showPlanSelection" :mask-closable="false" @on-ok="makeAddon()" width="60%" :loading="validateModal">
    <p style="margin-bottom:0px">Select basic plan which you wants to extend.</p>
    <my-plan style="padding:35px" v-on:selectedSubscription="setSelectedSubscription"></my-plan>
  </Modal>
</div>
</template>
<script>
// import defaultSubscription from '@/api/default-subscription'
// import axios from 'axios'
import subscriptionPlans from '@/api/subscription-plans'
import myPlans from './owners-plan.vue'
import { loadavg } from 'os';

  export default {
    components: {
      'my-plan': myPlans
    },
    name: 'subscriptionList',
    data () {
      return {
        showDetails:'0',
        mainData: [],
        basicPlans: [],
        addOns: [],
        showPlanSelection: false,
        selectedAddon: '',
        selectedBasicPlan: '',
        selectedBasicSubId: '',
        validateModal: true,
        details: [{
          "key": "key",
          "width": 230,
          "type": "html"
        }, {
            "key": "value"
        }]
      }
    },
    methods: {
      init () {
        let self = this
        subscriptionPlans.get().then(res => {
          self.mainData = res.data.data
          self.mainData = _.filter(self.mainData, function(o) {
            return o.status === true
          })
          self.mainData.sort(function(a, b){
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
            // console.log(self.mainData[i])
          }
          self.addOns = _.filter(self.mainData, function(o) {
            return o.type === 'addon'
          })
          self.basicPlans = _.filter(self.mainData, function(o) {
            return o.type === 'basic'
          })

        }).catch(err => {
          if(err.response != undefined) {
            self.$Notice.error({
                duration: 5,
                title: 'Fetching subscription plans',
                desc: err.response.data.message
            });
          } else if(err.message == 'Network Error'){
            self.$Notice.error({
                duration: 5,
                title: 'Fetching subscription plans',
                desc: 'API service unavailable.'
            });
          } else {
            self.$Notice.error({
                duration: 5,
                title: 'Fetching subscription plans',
                desc: err
            });
          }
        })
      },
      checkoutFunction (sub_id) {
        this.$router.push('/checkout/' + sub_id)
      },
      checkoutAddonFunction(addon_id) {
        this.selectedAddon = addon_id
        this.showPlanSelection = true
      },
      makeAddon() {
        if (this.selectedBasicPlan == '') {
          this.$Message.error({ content: 'Please select basic plan.'})
          this.validateModal = false
          setTimeout(() => {
            this.validateModal = true
          }, 100);
        } else {
          this.$router.push({
            name: 'checkout-addon',
            params: {
              id: this.selectedAddon,
              'basicSubId': this.selectedBasicSubId,
              'basicPlan': this.selectedBasicPlan
            }
          })
        }
      },
      setSelectedSubscription(id) {
        this.selectedBasicPlan = id[0]
        this.selectedBasicSubId = id[1]
      }
    },
    mounted () {
      // this.$on('selectedSubscription', this.setSelectedSubscription(id))
      this.init()
    }
  }
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic);

* {
margin: 0;
padding: 0;
box-sizing: border-box;
-moz-box-sizing: border-box;
}
.type-header {
  background-color: #ffffff7c;
  color: #464c5b;
  font-weight: bold;
  border-radius: 5px;
  font-family: "Source Sans Pro", "helvetica", sans-serif;
  font-size: 16px;
  text-align: center;
  position: sticky;
}
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
outline: 0;
font-size: 100%;
font: inherit;
vertical-align: top;
box-sizing: border-box;
-moz-box-sizing: border-box;
}

body {
font-family: "Source Sans Pro", "helvetica", sans-serif;
font-style: normal;
font-weight: normal;
text-align: center;
font-size: 16px;
color: rgba(39,65,90,1);
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
cursor: pointer;
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
top: 0px;
-webkit-box-shadow: 0px 0px 19px rgba(39,65,90,.5);
-moz-box-shadow:0px 0px 19px rgba(39,65,90,.5);
box-shadow:0px 0px 19px rgba(39,65,90,.5);
overflow: initial;
z-index: 1;
transform: scale(1.05);
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
cursor: pointer;
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
