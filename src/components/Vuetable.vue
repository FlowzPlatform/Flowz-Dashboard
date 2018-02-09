<template>
        <div>
            <!-- <h1 v-model="module" style="text-align: center; font-weight:bold;margin-bottom:10px; margin-top: 15px;">{{ titleCase(module) }}</h1> -->
                <div class="table-wrapper"> 
                        <table  class="table-bordered" style="font-size: 115%">
                            <thead class="header">
                             
                            </thead>
                            <tbody v-cloak class="results">
                            <template v-for="(moduleName, index) in Object.keys(tableData)">
                            <Widget>
                                <WidgetHeading :id="1" :Title="'Todo'" style="text-align:center;font-weight:bold;font-size:20px" :TextColor="false" :DeleteButton="false" :ColorBox="false" :Expand="false" :Collapse="true"
                                    :HeaderEditable="false">
                                    {{ titleCase(moduleName) }}
                                </WidgetHeading>
                                <WidgetBody>
                                        <tr class="row header blue">
                                                <template v-for="(field, fieldNumber) in fields[moduleName]">
                                                    <td  scope="col" style="text-align: center;padding:10px;border-left: 3px solid #cdd0d4;">
                                                        {{ getTitle(field) }}
                                                    </td>
                                                </template>
                                            </tr>
                                <template v-for="(item, itemNumber) in (tableData)[moduleName]">
                                    <tr class="row">
                                        <template v-for="(field,fieldNumber) in fields[moduleName]">
                                            <td v-if="fieldNumber ==0" style="padding:10px;font-weight:bold;border-right: 3px solid #cdd0d4;">
                                                    {{ titleCase(item.service) }}
                                            </td>
                                            <td v-else>
                                                <table class="table-bordered" style="width:100%">
                                                    <tbody>
                                                    <tr>
                                                        <template v-for="n in item.actions" >
                                                            <td v-for="(key, index) in Object.keys(n)" style="padding:10px;">
                                                                 <span style="font-size:12px">{{ titleCase(key) }}</span><br/> <input class="field.dataClass" style="width: 15px;height: 15px;cursor: pointer;" type="checkbox" @click="setAccessPermision(field, item, key,$event,moduleName)" :checked="getCheckboxValue(field, item, key,moduleName)" />
                                                            </td>
                                                    </template>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </td>
                                        </template>
                                    </tr>
                                </template>
                            
                            </WidgetBody>
                        </Widget>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
      
    </template>
    
    <script>
    import Vue from 'vue'
    import axios from 'axios'
    import _ from 'lodash'
    import VueWidgets from 'vue-widgets'
    import 'vue-widgets/dist/styles/vue-widgets.css'
    import config from '../../config/customConfig'
    
    Vue.use(VueWidgets)
         /* eslint-disable*/
    export default {
        data: function() {
            return {
                tableData: [],
                fields: [],
                permissionsAll:[],
                count: 0
            }
        },
        methods: {
            getAllPermissions: function(appName, totalApps){
            var self = this
            axios.get(config.getAllPermissionsUrl+appName, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
          }).then(function (response) {
             // console.log("Get all permissions:",response.data.data.values());
              if(response.data.data.length > 0){
                    self.count++
                    console.log("Count:",self.count, totalApps);
                    self.permissionsAll = _.union(self.permissionsAll, response.data.data);
                    self.permissionsAll = _.map(self.permissionsAll, o => _.extend({app: appName}, o));
                    if(totalApps == self.count){
                        self.permissionsAll = _.groupBy(self.permissionsAll, 'app');
                    }
              }
              return response.data.data
            })
            .catch(function (error) {
              console.log("Get all roles error:",error);
              console.log(error);
            })
            },
            getRoles: function(){
                var self = this
                    axios.get(config.subscriptionUrl+'register-roles', {
                    headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;'
                    },
                }).then(function (response) {
                //console.log("Get all roles:",_.groupBy(response.data.data, 'module'));
                    console.log("all roles:",response);
                    if(response.data.data.length > 0){
                        var arrRoles = _.groupBy(response.data.data, 'module');
                        for (var tblData in arrRoles){
                            var obj = {
                                name: 'name',
                                title: '',
                                sortField: 'name'
                            };
                            arrRoles[tblData].splice(0, 0, obj);
                            console.log("arraData",arrRoles)
                        }
                        self.fields = arrRoles;
                        self.callTaskList();
              }
              return response.data.data
            })
            .catch(function (error) {
              console.log("Get all roles error:",error);
              console.log(error);
            })
            },
            callTaskList: function () {
                var self = this
                axios.get(config.subscriptionUrl+'register-resource', {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                 }).then(function (response) {
                    console.log("Get resources:",response.data.data);
                    if(response.data.data.length > 0){
                        let arrResources = _.groupBy(response.data.data, 'module');
                        self.tableData = arrResources;
                        //console.log("Table rows:",Object.keys(self.tableData));
                        for (var tblData in arrResources){
                            console.log("arrResources:",tblData)
                            self.getAllPermissions(tblData, Object.keys(self.tableData).length)
                        }
                }
                return response.data.data
                })
                    .catch(function (error) {
                    console.log("Get role permissions error:",error);
                    console.log(error);
                })
                   
            },
            getCheckboxValue: function(role, resources, action, appName){
               let resID = resources.id+"_"+action
                let index = _.findIndex(this.permissionsAll, function(d) { return (d.roleId === role.id) && (d.resourceId === resID) })
                if (index > -1) {
                    let permission = this.permissionsAll[index].access_value
                    return parseInt(permission)
                }
            },
            setAccessPermision: function(roleField, item, action, event, moduleName) {
                var accessVal = 0
                if(event.target.checked) {
                    accessVal = 1
                }
                console.log("Set permission params 1:",moduleName);
                console.log("Set permission params: 2",item.id+'_'+action);
                return axios.post(config.setPermissionUrl, {
                    resourceId:  item.id+'_'+action , //resourceid_action
                    roleId:  roleField.id ,
                    taskType:  'global', // scope
                    accessValue: accessVal,
                    app: moduleName
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                    })
                    .then(function (response) {
                    console.log("Set permission response:",response);
                    })
                    .catch(function (error) {
                    console.log("Set permission error:",error);
                    console.log(error);
                    });
            },
            getTitle: function(field) {
                if (typeof field.title === 'undefined') {
                    return this.titleCase(field.role)
                }
                return this.titleCase(field.title)
            },
            titleCase: function(str)
            {
                return str.replace(/\w+/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                })
            }
        },
        components: {
                VueWidgets
            },
        created: function() {
            this.getRoles();
        },
        mounted(){
            $("#big-video-wrap").css("width","0px");
        }
    }
    </script>
    
    <style>
    .ui.table {
        font-size: 1em;
        display: inline-table;
    }
        .thead > span {
        display: inline-block;
        width: 120px;
        line-height: 40px;
        box-shadow: inset 0 0 1px 0 rgba(0,0,0,.5);
        background-color: rgba(255,0,0,.3);
        text-align: center;
    }

    /* .vw-widget{
        overflow-x:scroll;
        width: 500px;
    } */
    
    .table-wrapper { 
        overflow-x:auto;
        overflow-y:auto;
        margin-left: 100px;
        margin-top:20px;
        margin-right: 100px;
    }
    td {
        text-align: center; /* center checkbox horizontally */
        vertical-align: middle; /* center checkbox vertically */
        height: 50px;
        width: 50px;
    }
    
    /* td, th {
        padding: 5px 20px;
        width: 50px;
    } */
    
    th:first-child {
        /* position: fixed; */
        /* left: 30px */
    }
    td:first-child {
        /* position: fixed;
        left: 30px */
    }
    
    @media screen and (max-width: 580px) {
      .table {
        display: block;
      }
    }
    .row {
      display: table-row;
      background: #f6f6f6;
    }
    .row:nth-of-type(odd) {
      background: #e9e9e9;
    }
    .row.header {
      font-weight: 900;
      color: #ffffff;
      background: #ea6153;
    }
    .row.green {
      background: #27ae60;
    }
    .row.blue {
      background: #2980b9;
    }
    @media screen and (max-width: 580px) {
      .row {
        padding: 8px 0;
        display: block;
      }
    }
    
    .cell {
      padding: 6px 12px;
      display: table-cell;
    }
    @media screen and (max-width: 580px) {
      .cell {
        padding: 2px 12px;
        display: block;
      }
    }
                        
    </style>
    