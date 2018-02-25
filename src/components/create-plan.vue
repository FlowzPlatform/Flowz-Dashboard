<template>
  <div>
    <div style="border: 2px solid darkblue; margin-top:5%; background-color: #fff; position:relative">
    <div class="container">
      <div class="row add-service">
        <div class="col-xs-12">
          <div class="pull-right main-option" @click="createPlan()">
            <Tooltip content="Create new plan" placement="top"><h5><Icon type="android-add-circle" size="18"></Icon> NEW PLAN</h5></Tooltip>
          </div>
          <!-- <div class="col-xs-6 main-option" @click="update()">
            <Tooltip content="Save plans" placement="top"><h5><Icon type="upload"></Icon> UPDATE</h5></Tooltip>
          </div> -->
        </div>
      </div>
    </div>
    <div v-if="plans.length != 0">
      <div v-for="(plan, pIndex) in plans" :id="'plans_'+pIndex">
        <div class="container">
          <hr>
          <div class="col-md-12" style="margin-top:10px">
            <div class="row" style="margin-top:10px">
              <div class="col-md-4" style="margin-top:10px">
                <div class="row">
                  <div class="col-xs-4 no-margin" >
                    <h4>Plan Name:</h4>
                  </div>
                  <div class="col-xs-7 no-margin">
                    <h4><input type="text" class="description" v-model="plan.name" placeholder="______________________"></h4>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="row">
                  <div class="col-md-3 no-margin">
                    <h4>Validity: </h4>
                  </div>
                  <div class="col-md-2 no-margin">
                    <h4><input type="number" title="Validity" class="description" v-model="plan.validity" @input="validateValidity(plan.validity,pIndex)" min=1 placeholder="____________________"></input></h4>
                  </div>
                  <div class="col-md-2 no-margin">
                    <h4>Days</h4>
                  </div>
                  <div id="validateErr"></div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row">
                  <div class="col-md-3 no-margin">
                    <h4>Price: $</h4>
                  </div>
                  <div class="col-md-2 no-margin">
                    <h4><input type="number" class="description" v-model="plan.price"  @input="validatePrice(plan.price,pIndex)" placeholder="______________________"></input></h4>
                  </div>
                  <div class="col-md-3 no-margin"></div>
                  <div class="col-md-1 pointer" v-if="plan.validity >= 10 && plan.price >= 50" @click="update(pIndex, true)">
                  <Tooltip content="Save" placement="top">
                      <icon name="save" scale="1.5"></icon>
                  </Tooltip>
                </div>
                <div class="col-md-1 pointerX" v-else>
                  <Tooltip content="Save" placement="top">
                      <icon name="save" scale="1.5"></icon>
                  </Tooltip>
                </div>
                <div class="col-md-1 pointer" @click="confirmDelete = true, deleteIndex = pIndex, loading = true">
                  <Tooltip content="Delete plan" placement="top">
                      <Icon type="trash-a" size="30"></Icon>
                  </Tooltip>
                  <Modal
                      v-model="confirmDelete"
                      title="Confirm Delete"
                      :loading="loading"
                      @on-ok="deletePlan(deleteIndex)">
                      <p>After you click ok, this plan will be delete permanently.</p>
                  </Modal>
                </div>
                <div class="col-md-1 pointer" v-if="plan.validity >= 10 && plan.price >= 50">
                  <Tooltip content="Enable" placement="top">
                    <i-switch size="small" v-model="plan.status"></i-switch>
                  </Tooltip>
                </div>
                <div class="col-md-1 pointerX" v-else>
                  <Tooltip content="Enable" placement="top">
                    <i-switch size="small" disabled v-model="plan.status"></i-switch>
                  </Tooltip>
                </div>
                <div class="col-md-1 pointer" v-if="plan.validity >= 10 && plan.price >= 50 && checkOpen(pIndex)" @click="expand(pIndex)">
                  <Tooltip content="Expand" placement="top">
                    <Icon type="arrow-down-b" size="30"></Icon>
                  </Tooltip>
                </div>
                <div class="col-md-1 pointerX" v-else>
                  <Tooltip content="Expand" placement="top">
                    <Icon type="arrow-down-b" size="30"></Icon>
                  </Tooltip>
                </div>

                </div>
              </div>
              <!--<div class="col-md-5">

              </div>-->
            </div>
          </div>
        </div>
        <div :id="'plan_'+pIndex" class="outer-toggle">
          <Card>
          <!-- <Tree :data="plan.obj"></Tree> -->
          <div class="container">
            <div class="row">
              <div class="col-xs-2" style="margin-top:6px;" >
                <h5>Description:</h5>
              </div>
              <div class="col-md-6 no-margin" >
                <textarea :on-change="update(pIndex, false)" v-model="plan.description" class="description" rows="2" cols="25"></textarea>
              </div>
            </div>
          </div>
          <div class="schema-form ivu-table-wrapper">
          <div class="ivu-table ivu-table-border">
                  <div class="ivu-table-body" style="max-height:450px;">
                      <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;overflow-y:auto;">
                          <colgroup>
                              <col width="20">
                                  <col width="20">
                                      <col width="20">
                                          <!--<col width="20">-->
                                              <col width="20">
                          </colgroup>
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
                                  <!-- <th class="">
                                      <div class="ivu-table-cell">
                                        <span>Route</span>
                                      </div>
                                  </th> -->
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
                                          <!-- <Input type="text" v-model="item.module" placeholder="Module" size="small" class="schema-form-input"></Input> -->
                                      </div>
                                  </td>
                                  <td class="">
                                    <div class="ivu-table-cell">
                                      {{item.service}}
                                        <!-- <Input type="text" v-model="item.service" placeholder="Module" size="small" class="schema-form-input"></Input> -->
                                    </div>
                                  </td>
                                  <td class="">
                                    <div class="">
                                      <div class="ivu-table-cell">
                                        {{item.action}}
                                          <!-- <Input type="text" v-model="item.action" placeholder="Module" size="small" class="schema-form-input"></Input> -->
                                      </div>
                                    </div>
                                  </td>
                                  <!-- <td class="">
                                    <div class="ivu-table-cell">
                                      {{item.url}}
                                         <Input type="text" v-model="item.url" placeholder="Module" size="small" class="schema-form-input"></Input>
                                    </div>
                                  </td> -->
                                  <td class="">
                                    <div class="ivu-table-cell">
                                        <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input" v-if="item.value == 0" @on-change="update(pIndex, false)"></Input>
                                        <Input type="text" v-model="item.value" placeholder="Module" size="small" :style="process" class="schema-form-input redInput" v-else  @on-change="update(pIndex, false)"></Input>
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
        </div>
      </div>
    </div>
    <div v-else class="container main-option" align="center"><h5>Plans not available</h5></div>
    <div class="container">
      <hr>
    </div>
  <!-- </Card> -->
</div>
  </div>
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
    // axios({
    //           method:'get',
    //           url:"http://localhost:3030/subscription-plans"
    //         }).then(response => {
    //           console.log("response.....",response)
    //           for(let i=0;i<response.data.data.length;i++){
    //            self.plans.push(response.data.data[i])
    //          }
    //   })
    //   .catch(function (error) {
    //     console.log("**********",error)
    //     self.$Notice.error({
    //         duration: 5,
    //         title: 'Please check...some error'
    //     });
    //   });
  },
  methods: {
    validateValidity(validity,pIndex){
      if(validity < 10) {
        this.$Notice.error({
          duration: 5,
          title: 'Validity Validation Error',
          desc: 'Validity should be greater than 10 days'
        })
      }
    // let me = $('#plans_'+pIndex).find(".container")
    // me.find("#validateErr").html("Validity should be greater than 10")
    // else{
    //     let me = $('#plans_'+pIndex).find(".container")
    //     me.find("#validateErr").html("")
    //   }
    },
    validatePrice(price,pIndex){
      if(price < 50) {
        this.$Notice.error({
          duration: 5,
          title: 'Price Validation Error',
          desc: 'Price should be greater than 50$'
        })
      }
    // console.log("called",price)
    //   if(price < 50){
    //     let me = $('#plans_'+pIndex).find(".container")
    //     me.find("#priceErr").html("Price should be greater than 50")
    //   }
    // else{
    //     let me = $('#plans_'+pIndex).find(".container")
    //     me.find("#priceErr").html("")
    //   }
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

      // axios({
      //           method:'get',
      //           url:"http://localhost:3030/register-resource"
      //         }).then(response => {
      //           console.log("response.....",response.data.data,response.data.data[0])
      //             _.forEach(response.data.data, function(data, key) {
      //               console.log("data",data)
      //               for(let action in data.actions[0]){
      //                 data5.push({"module":data.module,"service":data.service,"action":action,"url":data.actions[0][action],"value":0})
      //               }
      //             })
      //           console.log("dataaaaaaaaaaaaaaaaaaaa",data5)
      //   })
      //   .catch(function (error) {
      //     console.log("**********",error)
      //     self.$Notice.error({
      //         duration: 5,
      //         title: 'Please check...some error'
      //     });
      //   });

        self.plans.push({
         name: '',
         description: '',
         validity:'365',
         price:'999',
         time_unit: 'days',
         details:data5
       })
    },
    async deletePlan (plan) {
      let self = this
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
      this.slideVisible = $("#plan_"+plan).is(":hidden")
      $('#plan_'+plan).slideToggle(function() {
        $(this).is(':hidden') ? 'hidden' : 'visible'
      })
      // $('#plan_'+plan).slideToggle(700)
    },
    update (index, showMsg) {
      this.process.cursor = 'progress!important'
      let self = this
      let dataObj = this.plans[index]
      if(dataObj.validity >= 10 && dataObj.price >= 50) {
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
                desc: 'Please try again' + err
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
      /*else if (dataObj.price < 50) {
        this.$Notice.error({
          duration: 5,
          title: 'Price Validation Error',
          desc: 'Price should be greater than 50$'
        })
      } else if (dataObj.validity < 10) {
        this.$Notice.error({
          duration: 5,
          title: 'Validity Validation Error',
          desc: 'Validity should be greater than 10 days'
        })
      }*/
      // this.process.cursor = ''
      // let obj1 = []
      // axios({
      //   method:'delete',
      //   url:"http://localhost:3030/subscription-plans",
      // }).then(response => {
      //   console.log("response...",response)
      //   axios({
      //             method:'post',
      //             url:"http://localhost:3030/subscription-plans",
      //             data:this.plans
      //           }).then(response => {
      //               console.log("response...",response)
      //               this.$Notice.success({
      //                   duration: 2,
      //                   title: 'Updated successfully...'
      //               });
      //             })
      //             .catch(function (error) {
      //               console.log("**********",error)
      //               this.$Notice.error({
      //                   duration: 5,
      //                   title: 'Please check...some error'
      //               });
      //             });
      // })
      // .catch(function (error) {
      //   console.log("**********",error)
      //   this.$Notice.error({
      //       duration: 5,
      //       title: 'Please check...some error'
      //   });
      // });
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
    margin-left: 20%;
    margin-right: 20%;
    margin-bottom: 1%;
    width: 60%;
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
