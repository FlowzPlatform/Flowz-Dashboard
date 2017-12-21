<template>
  <div>
     <Header></Header>
  <!-- <div style="border: 2px solid darkblue; margin:50px 200px 0px 200px; background-color: #fff; position:relative"> -->
    <Card class="ivu-card1-bordered">
    <div class="container">
      <div class="row add-service">
        <div class="col-md-9"></div>
        <div class="col-md-3">
          <div class="col-md-8" @click="createPlan()">
            <h4>new plan</h4>
          </div>
          <div class="col-md-4 main-option" @click="update()">
            <h4>update</h4>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(plan, pIndex) in plans">
      <div class="container">
        <hr>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-7">
              <div class="row">
                <div class="col-md-4 no-margin" align="right">
                  <h4>Plan Name:</h4>
                </div>
                <div class="col-md-8 no-margin">
                  <h4><input type="text" class="description" v-model="plan.name" placeholder="______________________"></h4>
                </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="row">
                <div class="col-md-4 no-margin">
                  <h4>Validity: </h4>
                </div>
                <div class="col-md-3 no-margin" align="right">
                  <h4><input type="number" title="Validity" class="description" v-model="plan.validity" min=1 placeholder="____________________"></input></h4>
                </div>
                <div class="col-md-5 no-margin" align="left">
                  <h4>days</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="row pull-right">
            <div class="col-md-4 no-margin" align="right">
              <h4>Price:</h4>
            </div>
            <div class="col-md-5 no-margin">
              <div class="row no-margin">
                <div class="col-md-2 no-margin">
                  <h4>$</h4>
                </div>
                <div class="col-md-10 no-margin">
                  <h4><input type="number" class="description" v-model="plan.price" placeholder="______________________"></input></h4>
                </div>
              </div>
            </div>
            <div class="col-md-3 options-main">
              <div class="row">
                <div class="col-md-6" @click="deletePlan(pIndex)">
                  <icon name="trash" scale="1.4"></icon>
                </div>
                <div class="col-md-6" v-if="checkOpen(pIndex)" @click="expand(pIndex)">
                  <icon name="arrow-up" scale="1.4"></icon>
                </div>
                <div class="col-md-6" v-else @click="expand(pIndex)">
                  <icon name="arrow-down" scale="1.4"></icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :id="'plan_'+pIndex" class="outer-toggle">
        <Card class="ivu-card-bordered">
         <div class="schema-form ivu-table-wrapper">
         <div class="ivu-table ivu-table-border">
                <div class="ivu-table-body">
                    <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
                        <colgroup>
                            <col width="20">
                                <col width="20">
                                    <col width="20">
                                        <col width="20">
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
                                <th class="">
                                    <div class="ivu-table-cell">
                                      <span>Route</span>
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
                                    {{item.url}}
                                  </div>
                                </td>
                                <td class="">
                                  <div class="ivu-table-cell">
                                        <Input type="text" v-model="item.value" placeholder="Module" size="small" class="schema-form-input" v-if="item.value == 0" @on-change="update()"></Input>
                                      <Input type="text" v-model="item.value" placeholder="Module" size="small" class="schema-form-input redInput" v-else  @on-change="update()"></Input>
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
    <div class="container">
      <hr>
    </div>
  </Card>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import vSelect from "vue-select";
import feathers from 'feathers/client';
// import socketio from 'feathers-socketio/client';
// import io from 'socket.io-client';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import vueJsonEditor from 'vue-json-editor'
Vue.use(BootstrapVue);
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import _ from 'lodash'
// let baseUrl = process.env.baseUrl;
// import defaultSubscription from '@/api/default-subscription'
// import secureRoutes from '@/api/secure-routes'
import axios from 'axios'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import 'iview/dist/styles/iview.css' // CSS
Vue.use(iView, { locale })
import Header from './Header.vue'
import 'vue-awesome/icons'
import $ from 'jquery'
Vue.component('icon', Icon)
export default {
  name: 'createPlan',
  components: {
    vSelect,
    Header
  },
  data(){
    return {
      services: [],
      plans: [],
      currentOpen: [],
      time_units: ['day/s', 'month/s', 'year/s'],
      data5: []
}
  },
  created()  {
    let data5 = []
    let self = this
    axios({
              method:'get',
              url:"http://localhost:3030/subscription-plans"
            }).then(response => {
              console.log("response.....",response)
              for(let i=0;i<response.data.data.length;i++){
               self.plans.push(response.data.data[i])
             }
      })
      .catch(function (error) {
        console.log("**********",error)
        self.$Notice.error({
            duration: 5,
            title: 'Please check...some error'
        });
      });
  },
  methods: {
    checkOpen (index) {
      return false
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
      axios({
                method:'get',
                url:"http://localhost:3030/register-resource"
              }).then(response => {
                console.log("response.....",response.data.data,response.data.data[0])

                  _.forEach(response.data.data, function(data, key) {
                    console.log("data",data)
                    for(let action in data.actions[0]){
                      data5.push({"module":data.module,"service":data.service,"action":action,"url":data.actions[0][action],"value":0})
                    }
                  })
                console.log("dataaaaaaaaaaaaaaaaaaaa",data5)
        })
        .catch(function (error) {
          console.log("**********",error)
          self.$Notice.error({
              duration: 5,
              title: 'Please check...some error'
          });
        });

        self.plans.push({
         name: '',
         validity:'',
         price:'',
         time_unit: 'days',
         details:data5
       })




    },
    deletePlan (plan) {
      this.plans.splice(plan, 1)
    },
    expand (plan) {
      $('#plan_'+plan).slideToggle(700)
    },
    update () {
      console.log("this.plans",this.plans)
      axios({
                method:'delete',
                url:"http://localhost:3030/subscription-plans",
              }).then(response => {
                console.log("response...",response)
                axios({
                          method:'post',
                          url:"http://localhost:3030/subscription-plans",
                          data:this.plans
                        }).then(response => {
                            console.log("response...",response)
                            this.$Notice.success({
                                duration: 2,
                                title: 'Updated successfully...'
                            });
                          })
                          .catch(function (error) {
                            console.log("**********",error)
                            this.$Notice.error({
                                duration: 5,
                                title: 'Please check...some error'
                            });
                          });
              })
              .catch(function (error) {
                console.log("**********",error)
                this.$Notice.error({
                    duration: 5,
                    title: 'Please check...some error'
                });
              });
    }
  }
}
</script>

<style>
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

  h4 {
    font-size: 2em;
    margin: 8px;
  }

  h5 {
    font-size: 1.5em;
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
  }

  .main-option {
    border-left: solid 1px #bbbbbb;
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
.ivu-card1-bordered {
    border: 4px solid #dddee1;
    border-color: #072C75;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 1%;
    margin-top:5%;
    width: 70%;
}

.redInput input {
  background-color: #19be6b;
  color: #fff;
}

.ivu-table-cell{
  font-size: 15px;
}
</style>
