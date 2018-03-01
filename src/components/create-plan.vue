<template>
  <Row style="margin-top:30px;" type="flex" justify="center">
    <Col span="18">
      <Card>
        <Row slot="title" type="flex" justify="end">
          <Col span="2" style="margin-bottom:5px;">
            <Button type="primary" @click="createPlan()" icon="android-add-circle" >Add</Button>
          </Col>
        </Row>
        <div v-if="plans.length != 0">
          <div class="schema-form ivu-table-wrapper">
            <div class="ivu-table ivu-table-border">
              <div class="ivu-table-body">
                  <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                      <thead>
                          <tr>
                              <th class="ivu-table-column">
                                  <div class="ivu-table-cell">
                                      <span>Plan Name</span>
                                  </div>
                              </th>
                              <th class="ivu-table-column">
                                  <div class="ivu-table-cell">
                                      <span>Validity</span>
                                  </div>
                              </th>
                              <th class="ivu-table-column">
                                  <div class="ivu-table-cell"><span>Price</span>
                                  </div>
                              </th>
                              <th class="ivu-table-column-center">
                                  <div class="ivu-table-cell"><span>Action</span>
                                  </div>
                              </th>
                          </tr>
                      </thead>
                      <tbody class="ivu-table-tbody" v-for="(plan, pIndex) in plans" :id="'plans_'+pIndex">
                          <tr class="ivu-table-row">
                              <td class="">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Plan Name" placement="bottom">
                                    <input v-model="plan.name" title="Plan Name" placeholder="*Plan Name" ></input>
                                  </Tooltip>
                                </div>
                              </td>
                              <td class="">
                                <div class="ivu-table-cell">
                                  <Tooltip content="Validity" placement="bottom">
                                    <input type="number" class="description" v-model="plan.validity" v-on:blur="validateValidity(plan.validity,pIndex)" min=1 placeholder="*Validity"></input>
                                  </Tooltip>
                                </div>
                              </td>
                              <td class="">
                                  <div class="ivu-table-cell">
                                    <Tooltip content="Price" placement="bottom">
                                      <input type="number" class="description" v-model="plan.price"  v-on:blur="validatePrice(plan.price,pIndex)" placeholder="*Price"></input>
                                    </Tooltip>
                                  </div>
                              </td>
                              <td class="ivu-table-column-center">
                                  <Row type="flex" justify="center" align="middle">
                                    <Col span="3"> 
                                      <a v-if="plan.validity >= getDefaultPlan('validity') && plan.price >= getDefaultPlan('price')" @click="update(pIndex, true)">
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
                                      <a v-if="plan.validity >= getDefaultPlan('validity') && plan.price >= getDefaultPlan('price')">
                                        <Tooltip content="Enable" placement="top">
                                          <i-switch style="background-color:#2411c5;border-color:#2411c5" size="small" v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
                                      <a v-else class="pointerX">
                                        <Tooltip content="Enable" placement="top">
                                          <i-switch size="small" disabled v-model="plan.status"></i-switch>
                                        </Tooltip>
                                      </a>
                                    </Col>
                                    <Col span="3">
                                      <a v-if="plan.validity >= getDefaultPlan('validity') && plan.price >= getDefaultPlan('price') && checkOpen(pIndex)" @click="expand(pIndex)">
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
                                          <Input style="margin-bottom:5px" v-on:blur="update(pIndex, false)" v-model="plan.description" type="textarea" :autosize="{minRows: 1,maxRows: 25}" placeholder="Enter something..."></Input>
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
                                                  <tbody class="ivu-table-tbody">
                                                      <tr class="ivu-table-row" v-for="(item, index) in plan.details">
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
                                                                <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input" v-if="item.value == 0" v-on:blur="update(pIndex, false)"></Input>
                                                                <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input redInput" v-else  v-on:blur="update(pIndex, false)"></Input>
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
        <Row v-else type="flex" justify="center">
          <Col span="4" style="margin-bottom:5px;">
            <h5>Plans not available</h5>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
</template>

<script>
import subscriptionPlans from '@/api/subscription-plans'
import registerResource from '@/api/register-resource'
import Icon from 'vue-awesome/components/Icon';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import _ from 'lodash'
import 'vue-awesome/icons';
Vue.use(BootstrapVue);

import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css' // CSS
Vue.use(iView, { locale })


import 'vue-awesome/icons'
import $ from 'jquery'
Vue.component('icon', Icon)
export default {
  name: 'createPlan',
  data(){
    return {
      services: [],
      plans: [],
      currentOpen: [],
      time_units: ['day/s', 'month/s', 'year/s'],
      data5: [],
      confirmDelete: false,
      loading: false,
      deleteIndex: 0,
      process: {
        cursor: ''
      },
      defaultPlan: {
        name: 'Base Plan',
        description: 'Website Builder\n1 eCommerce Site\nNo Virtual & CRM',
        validity: 1,
        price: 999,
        time_unit: 'month',
        details: []
      }
    }
  },
  created()  {
    let data5 = []
    let self = this
    subscriptionPlans.get().then(res => {
            self.plans = res.data.data
        }).catch(err => {
            self.$Notice.error({
                duration: 5,
                title: 'Trying to fetch subscription plans',
                desc: 'Please refresh page ' + err
            });
        })
  },
  methods: {
    getDefaultPlan(idx) {
      return this.defaultPlan[idx]
    },
    validateValidity(validity,pIndex) {
      if(validity < this.defaultPlan.validity) {
        this.$Notice.error({
          duration: 5,
          title: 'Validity Validation Error',
          desc: 'Validity should be greater than '+ this.defaultPlan.validity +' ' + this.defaultPlan.time_unit
        })
      }
    },
    validatePrice(price,pIndex){
      if(price < this.defaultPlan.price) {
        this.$Notice.error({
          duration: 5,
          title: 'Price Validation Error',
          desc: 'Price should be greater than ' + this.defaultPlan.price + '$'
        })
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
    createPlan () {
      let self = this
      let data5 = []
      let keys = []
      let modules = ['crm','uploader','webbuilder','subscription']
      registerResource.get().then(res => {
        // console.log("res.....",res.data.data,res.data.data[0])
        _.forEach(res.data.data, function(data, key) {
          if(modules.includes(data.module)) {
            for(let action in data.actions[0]) {
              data5.push({"module":data.module,"service":data.service,"action":action,"value":0})
            }
          }})
      }).catch(function (error) {
          self.$Notice.error({
            duration: 5,
            title: 'Trying to create subscription plan',
            desc: 'Please try again ' + err
          })
      })
      self.plans.push(self.defaultPlan)
    },
    async deletePlan (plan) {
      let self = this
      this.loading = true
      if (this.plans[plan].id != undefined) {
        await subscriptionPlans.delete(this.plans[plan].id).then(res => {
          self.$Notice.success({
            title: 'Subscription Plan ' + this.plans[plan].name + ' has been deleted..!'
          })
        }).catch(err => {
          self.$Notice.error({
            duration: 5,
            title: 'Trying to delete subscription plan',
            desc: 'Please try again' + err
          })
        })
      } else {
        await this.plans.splice(plan, 1)
      }
      this.loading = false
      this.confirmDelete = false
    },
    expand (plan) {
      $('#plan_'+plan).slideToggle(function() {
        $(this).is(':hidden') ? 'hidden' : 'visible'
      })
    },
    update (index, showMsg) {
      this.process.cursor = 'progress!important'
      let self = this
      let dataObj = this.plans[index]
      if(dataObj.validity >= self.defaultPlan.validity && dataObj.price >= self.defaultPlan.price) {
        if (this.plans[index].id != undefined) {
          subscriptionPlans.put(this.plans[index].id, dataObj).then(res => {
            if (showMsg) {
              self.$Notice.success({
                title: 'Subscription Plan ' + self.plans[index].name + ' has been saved..!'
              })
            }
          }).catch(err => {
            self.$Notice.error({
                duration: 5,
                title: 'Trying to update subscription plan',
                desc: 'Please try again ' + err
            })
          })
        } else if(showMsg) {
          subscriptionPlans.post(dataObj).then(res => {
            if (showMsg) {
              self.$Notice.success({
                title: 'Subscription Plan ' + self.plans[index].name + ' has been created..!'
              })
            }
          }).catch(err => {
            self.$Notice.error({
                duration: 5,
                title: 'Trying to create subscription plan',
                desc: 'Please try again' + err
            })
          })
        }
      }
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

  input {
    border: none;
    margin: 2px;
  }

  input:focus {
    outline: none !important;
  }

  input.description {
    width: 100%;
    margin-top: -2px;
  }

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
