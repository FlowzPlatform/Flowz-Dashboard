<template>
  <Row style="margin-top:30px;" type="flex" justify="center">
    <Col span="18">
      <Card>
        <Row slot="title">
          <Col span="4">
            <Tabs v-model="activeTab" @on-click="changeActiveTab">
              <TabPane label="Plan" name="plan"></TabPane>
              <TabPane label="Addon" name="addon"></TabPane>
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
                              <col width="22">
                                  <col width="22">
                                      <!-- <col width="15"> -->
                                          <col width="20">
                      </colgroup>
                      <thead>
                          <tr>
                              <th class="ivu-table-column">
                                  <div class="ivu-table-cell">
                                      <span v-if="activeTab === 'plan'">Plan Name</span>
                                      <span v-else>Addon Name</span>
                                  </div>
                              </th>
                              <th class="ivu-table-column">
                                  <div class="ivu-table-cell">
                                      <span>Validity <span style="color:gray;font-size:10px">(Month)</span></span>
                                  </div>
                              </th>
                              <th class="ivu-table-column">
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
                              <td class="">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Plan Name" placement="bottom">
                                    <input class="form-control" v-model="plan.name" placeholder="*Plan Name" ></input>
                                  </Tooltip>
                                </div>
                              </td>
                              <td class="">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Validity" placement="bottom">
                                    <input  type="text" class="description form-control" v-model="plan.period" min=1 v-on:keyup="validateValidity(plan.period, pIndex)" placeholder="*Validity"></input>
                                  </Tooltip>
                                </div>
                              </td>
                              <td class="">
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
                                      <a @click="confirmDelete = true, deleteIndex = pIndex">
                                        <Tooltip content="Delete plan" placement="top">
                                          <Icon type="trash-b" size="23" color="#e84c3c"></Icon>
                                        </Tooltip>
                                        <Modal v-model="confirmDelete" :loading="loading">
                                          <p slot="header" style="color:#f60;text-align:center">
                                            <Icon type="information-circled"></Icon>
                                            <span>Delete confirmation</span>
                                          </p>
                                          <div style="text-align:center">
                                              <p>After you click DELETE, this plan will be delete permanently.</p>
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
                                          <i-switch size="small" true-value="active" false-value="archived" v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
                                      <a v-else class="pointerX">
                                        <Tooltip content="Enable" placement="top">
                                          <i-switch size="small" disabled v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
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
                                          <div class="ivu-table-body" style="max-height:450px;">
                                              <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;overflow-y:auto;">
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
      </Card>
    </Col>
  </Row>
</template>

<script>
const uuidv1 = require('uuid/v1');
import subscriptionPlans from '@/api/subscription-plans';
import cbPlan from '@/api/cb-plan';
import cbAddon from '@/api/cb-addon';
import registerResource from '@/api/register-resource';
import Icon from 'vue-awesome/components/Icon';
import BootstrapVue from 'bootstrap-vue';
import Cookies from 'js-cookie';
import Vue from 'vue';
import psl from 'psl'
import _ from 'lodash';
import 'vue-awesome/icons';
Vue.use(BootstrapVue);

import iView from 'iview';
import locale from 'iview/dist/locale/en-US';
import 'iview/dist/styles/iview.css'; // CSS
Vue.use(iView, { locale });

import 'vue-awesome/icons';
import $ from 'jquery';
Vue.component('icon', Icon);

export default {
  name: 'createPlan',
  data(){
    return {
      services: [],
      plans: [],
      planData: [],
      addonData: [],
      planLoding: false,
      addPlanLoading: false,
      currentOpen: [],
      time_units: ['day/s', 'month/s', 'year/s'],
      data5: [],
      confirmDelete: false,
      loading: false,
      deleteIndex: 0,
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
      }
    }
  },
  created()  {
    this.planLoding = true
    let data5 = []
    let self = this

    // NEW SUBSCRIPTION CODE WITH CHARGEBEE
    cbPlan.get().then(res => {
      for(let i in res.data) {
        res.data[i].plan.price /= 100 
        self.planData.push(res.data[i].plan);
      }
      self.plans = self.planData;
      self.planLoding = false;
    }).catch(err => {
      let location = psl.parse(window.location.hostname)
      location = location.domain === null ? location.input : location.domain
      if (err.message == 'Network Error') {
        self.$Notice.error({
          duration: 5,
          title: 'Loading created plans',
          desc: 'API service unavailable.'
        });
      } else if (err.response.data.message == 'User authentication fail') {
        self.$Notice.error({
          duration: 5,
          title: 'Your session has been expired.',
          desc: err.response.data.message + ', please login again.'
        });
        Cookies.remove('auth_token', {domain: location});
        Cookies.remove('user', {domain: location});
        self.$router.push({ name: 'login' });
      }
    });

    cbAddon.get().then(res => {
      for(let i in res.data) {
        res.data[i].addon.price /= 100 //To convert price from cents to dollars
        self.addonData.push(res.data[i].addon);
      }
    }).catch(err => {
      console.log('Error Addon : ', err)
    });

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
    changeActiveTab (name) {
      this.plans = name === 'plan' ? this.planData : this.addonData;
    },
    getDefaultPlan (idx, pIndex) {
      return this.plans[pIndex].object == 'plan' ? this.defaultPlan[idx] : 0
      // return this.defaultPlan[idx]
    },
    validateValidity (validity, pIndex) {
      var num = validity.match(/^[0-9]+$/);
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
    validatePrice (price,pIndex) {
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
      for (let i=0; i<methods.length; i++) {
        if (methods[i].active) return true
      }
      return false
    },
    checkAnyRouteAvailable (routes) {
      for (let i=0; i<routes.length; i++) {
        if (this.checkAnyMethodAvailable(routes[i].methods)) return true
      }
      return false
    },
    async createPlan (method) {
      let self = this
      self.addPlanLoading = true
      let data5 = []
      let keys = []
      let modules = ['crm','uploader','webbuilder','subscription']
      
      self.plans.filter( function (o) {
        o.class = 'ivu-table-row'
      })

      await registerResource.get().then(res => {
        _.forEach(res.data.data, function(data, key) {
          if(modules.includes(data.module)) {
            for(let action in data.actions[0]) {
              data5.push({"module":data.module,"service":data.service,"action":action,"value":0})
            }
          }
        })
        self.defaultPlan.details = data5
      }).catch(function (error) {
        console.log('ERROR:::', error)
        self.$Notice.error({
          duration: 5,
          title: 'Trying to create subscription plan',
          desc: 'Please try again ' + err
        })
      })
      let convertedPrice = self.defaultPlan.price * 100
      let id = uuidv1();
      let planDefinition = {
        "id": id,
        "name": self.defaultPlan.name,
        "description": self.defaultPlan.description,
        "invoice_name": self.defaultPlan.name,
        "price": convertedPrice,
        "status": "archived",
        "period": self.defaultPlan.validity,
        "period_unit": "month",
        "meta_data": {
          "details": self.defaultPlan.details
        }
      }
      if (method == 'plan') {
        this.createNewPlan(planDefinition)
      } else if (method == 'addon') {
        this.createNewAddon(planDefinition)
      }
      // console.log('>>>>>>>>>>>>>...', planDefinition)
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
    async deletePlan (plan) {
      let self = this
      this.loading = true
      await subscriptionPlans.delete(this.plans[plan].id).then(res => {
        self.$Notice.success({
          title: '<b>' + self.plans[plan].name + '</b> deleted.',
          desc: 'Subscription Plan <b>' + self.plans[plan].name + '</b> has been deleted..!'
        })
        self.plans.splice(plan, 1)
      }).catch(err => {
        self.$Notice.error({
          duration: 5,
          title: 'Can not delete <b>' + self.plans[plan].name + '</b>',
          desc: 'Please try again' + err
        })
      })
      this.loading = false
      this.confirmDelete = false
    },
    expand (plan) {
      $('#plan_'+plan).slideToggle(function() {
        $(this).is(':hidden') ? 'hidden' : 'visible'
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
      } else if(dataObj.type == 'basic' && dataObj.validity < this.defaultPlan.validity) {
        this.$Notice.error({
          duration: 5,
          title: 'Please Correct Validity',
          desc: 'Validity should be greater than '+ this.defaultPlan.validity + ' ' + this.defaultPlan.time_unit
        })
      } else if (dataObj.type == 'addon' && dataObj.validity == '') {
        this.$Notice.error({
          duration: 5,
          title: 'Please Correct Validity',
          desc: 'Validity can not be empty'
        })
      } else if (dataObj.type == 'basic' && dataObj.price < this.defaultPlan.price) {
        this.$Notice.error({
          duration: 5,
          title: 'Please Correct Price',
          desc: 'Price should be greater than ' + this.defaultPlan.price + '$'
        })
      } else if (dataObj.type == 'addon' && dataObj.price == '') {
        this.$Notice.error({
          duration: 5,
          title: 'Please Correct Price',
          desc: 'Price can not be empty'
        })
      } else if (this.plans[index].id != undefined) {
        delete dataObj.class          
        if (self.activeTab == 'plan') {
          self.updatePlan(self.plans[index].id, dataObj);
        } else {
          self.updateAddon(self.plans[index].id, dataObj);
        }
        //OLD CODE FOR UPDATE PLAN DETAILS
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
    createNewPlan(planDefinition) {
      let self = this
      cbPlan.post(planDefinition).then(res => {
        if (res.data.api_error_code == 'duplicate_entry') {
          self.$Notice.error({
            title: 'Plan Already Exist.',
            duration: 5,
            desc: res.data.message
          })
        } else {
          self.$Notice.success({
            title: '<b>New Plan</b>',
            desc: '<b>New Subscription Plan</b> has been created..!'
          })
          res.data.class = 'ivu-table-row-highlight'
          self.plans.splice(0, 0, res.data);
          self.addPlanLoading = false
        }
        console.log('res>>>', res)
      }).catch(err => {
        console.log('Error Plan: ', err)
      });
    },
    createNewAddon(planDefinition) {
      let self = this
    },
    updatePlan(id, data) {
      let self = this;
      let convertedPrice = data.price * 100;
      let updateDefinition = {
        "name": data.name,
        "description": data.description,
        "invoice_name": data.name,
        "price": convertedPrice,
        "meta_data": {
          "details": data.details
        }
      }
      cbPlan.put(id, updateDefinition).then(res => {
        console.log('UpdatedPlan :: ',res)
        self.$Notice.success({
          title: '<b>' + data.name + '</b> saved.',
          desc: 'Subscription Plan <b>' + self.plans[index].name + '</b> has been saved..!'
        })
      }).catch(err => {
        cosole.log('UpdatePlan Error:')
      })
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
</style>
