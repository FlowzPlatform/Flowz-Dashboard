<template>
    <div>
        <h1 v-model="module" style="text-align: center; font-weight:bold;margin-bottom:10px; margin-top: 15px;">{{ titleCase(module) }}</h1>
            <div class="table-wrapper"> 
                    <table  class="vuetable table-bordered" style="font-size: 115%">
                        <thead class="header">
                         
                        </thead>
                        <tbody v-cloak  class="results">
                            <template v-for="(item, itemNumber) in tableData">
            
                                    <tr v-if="itemNumber == 0" class="row header blue">
                                            <template v-for="(field, fieldNumber) in fields">
                                                
                                                <td v-if="fieldNumber == 0" >
                                                </td>
                                                <td  v-else  scope="col" style="text-align: center;padding:10px;border-left: 3px solid #cdd0d4;" :class="field.titleClass">
                                                    {{ getTitle(field) }}&nbsp;
                                                </td>
                                            </template>
                                        </tr>
                                <tr @dblClick="onRowDoubleClicked(item, $event)" class="row" :class="onRowClass(item, itemNumber)">
                                    <template v-for="(field,fieldNumber) in fields">
                                        <td v-if="fieldNumber ==0" :class="field.dataClass" style="padding:10px;font-weight:bold;border-right: 3px solid #cdd0d4;"  @dblclick="onCellDoubleClicked(item, field, $event)">
                                                {{ titleCase(item.service) }}
                                        </td>
                                        <td v-else>
                                            <table class="table-bordered" style="width:100%">
                                                <tbody>
                                                <tr>
                                                    <template v-for="n in item.actions" >
                                                        <td v-for="(key, index) in Object.keys(n)" style="padding:10px;">
                                                             <span style="font-size:12px">{{ titleCase(key) }}</span><br/> <input class="field.dataClass" style="width: 15px;height: 15px;cursor: pointer;" type="checkbox" @click="setAccessPermision(field, item, key,$event)" :checked="getCheckboxValue(field, item, key)" />
                                                             <!-- {{ titleCase(key) }}
                                                             <div class="checkbox">
                                                                    <label style="font-size: 0.9em;">
                                                                            <input  type="checkbox" @click="setAccessPermision(field, item, key,$event)" :checked="getCheckboxValue(field, item, key)" />
                                                                        <span class="cr"><i class="cr-icon fa fa-check"></i></span>
                                                                    </label>
                                                            </div>   -->
                                                            
                    
                                                        </td>
                                                </template>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                        
                                    </template>
                                </tr>
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
Vue.use(VueWidgets)
     /* eslint-disable*/
     var tableColumns = []
export default {
    
     props: {
    //     wrapperClass: {
    //         type: String,
    //         default: function() {
    //             return null
    //         }
    //     },
    //     tableWrapper: {
    //         type: String,
    //         default: function() {
    //             return null
    //         }
    //     },
    //     tableClass: {
    //         type: String,
    //         default: function() {
    //             return 'ui blue striped selectable celled stackable attached table'
    //         }
    //     },
    //     fields: {
    //         type: Array,
    //         required: true
    //     },
    //     itemActions: {
    //         type: Array,
    //         default: function() {
    //             return []
    //         }
    //     },
    //     rowClassCallback: {
    //         type: String,
    //         default: ''
    //     },
    //     tableData:{
    //         type: Array,
    //         required: true
    //     }
    //     ,
    // taskTypeId:{
    //         type: String,
    //         required: true
    //     },
    rowClassCallback: {
            type: String,
            default: ''
        }
     },
    data: function() {
        return {
            eventPrefix: 'vuetable:',
            tablePagination: null,
            currentPage: 1,
            visibleDetailRows: [],
            tableData: [],
            fields: tableColumns,
            permissionsAll:[],
            module: ''
        }
    },
    directives: {
        'attr': {
            update: function(value) {
                for (var i in value) {
                    this.el.setAttribute(i, value[i])
                }
            }
        },
    },
    methods: {
        countColspan: function(){
            var arraData = []
            for (var tblData in this.tableData){
                let tblAction = this.tableData[tblData]
                for (var action in tblAction.actions){
                     arraData.push(Object.keys(tblAction.actions[action]).length) 
                }
            }
            return _.max(arraData)
            console.log("Array data: ",_.max(arraData));

        },
        getRoles: function(){
        var self = this
        axios.get('http://localhost:3050/register-roles?module=todo', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      }).then(function (response) {
          console.log("Get all roles:",response.data.data);
          self.module = response.data.data[0].module
          if(response.data.data.length > 0){
            tableColumns = [{
                    name: 'name',
                    title: '',
                    sortField: 'name'
                }];
                self.fields = tableColumns;
                //this.roles = response.body;
                response.data.data.forEach(function (row) {
                    row.titleClass = 'center aligned'
                    row.dataClass = 'center aligned'
                    tableColumns.push(row)
                }, self);
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
                // services.roleAccessService.find({
                //     query: {
                //         $client: {
                //             flag: 'rolePermision'
                //         }
                //     }

                // }).then(response => {
                //     console.log("Response roles:--", response)
                //     this.tableData = response;
                // });
                ///http://localhost:3030/register-permission-scope?module=dbetl

        var self = this
        axios.get('http://localhost:3050/register-resource?module=todo', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      }).then(function (response) {
          console.log("Get resources:",response.data.data);
          if(response.data.data.length > 0){
            self.tableData = response.data.data;
            console.log("Table rows:",self.tableData);
            //self.setpermissionArray()
          }
          return response.data.data
        })
        .catch(function (error) {
          console.log("Get role permissions error:",error);
          console.log(error);
        })
               
        },
        getCheckboxValue: function(role, resources, action){
           let resID = resources.id+"_"+action
         
            let index = _.findIndex(this.permissionsAll, function(d) { return (d.roleId === role.id) && (d.resourceId === resID) })
            if (index > -1) {
                let permission = this.permissionsAll[index].access_value
                // console.log("----------------------------------------------------------")
                // console.log("role:",role.role)
                // console.log("resources:",resources.service)
                // console.log("resources:",resources.id+"_"+action)
                // console.log("action:",action);
                // console.log("Permissions:",permission);
                return parseInt(permission)
               // return tag_name
            }
        },
        getRoleValue:function(index)
        {
            if (index == 1)
                return 8
            else if (index == 2)
                return 4
            else if (index == 3)
                return 2
            else
                return 1
        },
        getFieldValue:function(index)
        {
            if (index == 1)
                return "C"
            else if (index == 2)
                return "R"
            else if (index == 3)
                return "U"
            else if (index == 4)
                return "D"
            else
                return ""
        },
        onRowClass: function(dataItem, index) {
            var func = this.rowClassCallback.trim()

            if (func !== '' && typeof this.$parent[func] === 'function') {
                return this.$parent[func].call(this.$parent, dataItem, index)
            }
            return ''
        },
        isSelectedRow: function(key) {
            return this.selectedTo.indexOf(key) >= 0
        },
        rowSelected: function(dataItem, fieldName) {
            var idColumn = fieldName
            var key = dataItem[idColumn]
            return key
        },
        setAccessPermision: function(roleField, item, action, event) {
        var accessVal = 0
        if(event.target.checked) {
            accessVal = 1
        }
        console.log("Set permission params 1:",accessVal);
        console.log("Set permission params: 2",item.id+'_'+action);
        return axios.post('http://api.flowz.com/authldap/setpermission', {
            resourceId:  item.id+'_'+action , //resourceid_action
            roleId:  roleField.id ,
            taskType:  'global', // scope
            accessValue: accessVal,
            app: "todo"
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
        normalizeFields: function() {
            var self = this
            var obj
            this.fields.forEach(function (field, i) {
                if (typeof (field) === 'string') {
                    obj = {
                        name: field,
                        title: self.setTitle(field),
                        titleClass: '',
                        dataClass: '',
                        callback: null,
                        visible: true
                    }
                } else {
                    obj = {
                        name: field.name,
                        title: (field.title === undefined) ? self.setTitle(field.name) : field.title,
                        sortField: field.sortField,
                        titleClass: (field.titleClass === undefined) ? '' : field.titleClass,
                        dataClass: (field.dataClass === undefined) ? '' : field.dataClass,
                        callback: (field.callback === undefined) ? '' : field.callback,
                        visible: (field.visible === undefined) ? true : field.visible
                    }
                }
                self.fields.$set(i, obj)
            })
        },
        getObjectValue: function(object, path, crudIndex) { //item, field, n
            // defaultValue = (typeof defaultValue == 'undefined') ? null : defaultValue
            if (path.id) {
                var roleId = object.roleid;
                let roleIndex = _.findIndex(roleId, function (role) { return role.roleId === path.id })
                if (roleIndex < 0)
                    return false;

                var role = roleId[roleIndex];
                if (role.roleId == path.id) {
                    if (role.access_value) {
                        if (crudIndex == 1) {
                            return role.access_value >= 8
                        } else if (crudIndex == 2) {
                            var readValue = [4, 5, 6, 7, 12, 13, 14, 15];
                            return readValue.includes(role.access_value)//>=4 && path.access_value<=7) || (path.access_value>12 && path.access_value<=15) 
                        } else if (crudIndex == 3) {
                            var updatevalue = [2, 3, 6, 7, 10, 11, 14, 15]
                            return updatevalue.includes(role.access_value)
                        } else {

                            var deletevalue = [1, 3, 5, 7, 9, 11, 13, 15]
                            return deletevalue.includes(role.access_value)
                        }
                    }
                }
                return false;
            } else {
                return object.name;
            }
               
        },
        getTitle: function(field) {
            if (typeof field.title === 'undefined') {
                return this.titleCase(field.role.replace('.', ' '))
            }
            return this.titleCase(field.title)
        },
        setTitle: function(str) {
            if (this.isSpecialField(str)) {
                return ''
            }
            return this.titleCase(str)
        },
        titleCase: function(str)
        {
            return str.replace(/\w+/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            })
        },
        checkCheckboxesState: function(fieldName) {
            var self = this
            var idColumn = this.extractArgs(fieldName)
            var selector = 'th.checkbox_' + idColumn + ' input[type=checkbox]'
            var els = document.querySelectorAll(selector)
            var selected = this.tableData.filter(function(item) {
                return self.selectedTo.indexOf(item[idColumn]) >= 0
            })
            if (selected.length <= 0) {
                els.forEach(function(el) {
                    el.indeterminate = false
                })
                return false
            }
            else if (selected.length < this.perPage) {
                els.forEach(function(el) {
                    el.indeterminate = true
                })
                return true
            }
            else {
                els.forEach(function(el) {
                    el.indeterminate = false
                })
                return true
            }
        },
        extractName: function(string) {
            return string.split(':')[0].trim()
        },
        extractArgs: function(string) {
            return string.split(':')[1]
        },
        callDetailRowCallback: function(item) {
            var func = this.detailRowCallback.trim()
            if (func === '') {
                return ''
            }

            if (typeof this.$parent[func] == 'function') {
                return this.$parent[func].call(this.$parent, item)
            } else {
            }
        },
        deleteRole: function(item) {
            this.$store.dispatch('removeNewRole', item)
        }
    },
    watch: {
        'multiSort': function(newVal, oldVal){
            if (newVal === false && this.sortOrder.length > 1) {
                this.sortOrder.splice(1);
                this.loadData();
            }
        }
    },
    events: {
        'vuetable-pagination:change-page': function(page) {
            if (page == 'prev') {
                this.gotoPreviousPage()
            } else if (page == 'next') {
                this.gotoNextPage()
            } else {
                this.gotoPage(page)
            }
        },
        'vuetable:reload': function() {
            this.loadData()
        },
        'vuetable:refresh': function() {
            this.currentPage = 1
            this.loadData()
        },
        'vuetable:goto-page': function(page) {
            this.$emit('vuetable-pagination:change-page', page)
        },
        'vuetable:set-options': function(options) {
            for (var n in options) {
                this.$set(n, options[n])
            }
        },
        'vuetable:toggle-detail': function(dataItem) {
            this.toggleDetailRow(dataItem)
        },
        'vuetable:show-detail': function(dataItem) {
            this.showDetailRow(dataItem)
        },
        'vuetable:hide-detail': function(dataItem) {
            this.hideDetailRow(dataItem)
        },
        'vuetable:normalize-fields': function() {
            console.log("Normalized fields called");
            this.normalizeFields()
        }
    },
    components: {
            VueWidgets
        },
    created: function() {
        var self = this
        axios.get('http://api.flowz.com/authldap/getallpermission/todo', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      }).then(function (response) {
          console.log("Get all permissions:",response.data.data);
          if(response.data.data.length > 0){
                self.permissionsAll = response.data.data;
                self.getRoles();
          }
          return response.data.data
        })
        .catch(function (error) {
          console.log("Get all roles error:",error);
          console.log(error);
        })
    }
}
</script>

<style>
           .ui.table {
    font-size: 1em;
    display: inline-table;
}
    .vuetable th.sortable:hover {
      color: #2185d0;
      cursor: pointer;
    }
    .vuetable-actions {
      width: 15%;
      padding: 12px 0px;
      text-align: center;
    }
    .vuetable-pagination {
      background: #f9fafb !important;
    }
    .vuetable-pagination-info {
      margin-top: auto;
      margin-bottom: auto;
    }
    .vuetable-wrapper.ui.basic.segment {
       overflow-x: overlay;
    display: grid;
    width: 100%;
    }

    .thead > span {
    display: inline-block;
    width: 120px;
    line-height: 40px;
    box-shadow: inset 0 0 1px 0 rgba(0,0,0,.5);
    background-color: rgba(255,0,0,.3);
    text-align: center;
}

.table-wrapper { 
    overflow-x:auto;
    overflow-y:auto;
    margin-left: 50px;
    margin-top:20px;
    margin-right: 50px;
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

/* new css */

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
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

                            
.checkbox label:after, 
.radio label:after {
    content: '';
    display: table;
    clear: both;
}

.checkbox .cr,
.radio .cr {
    position: relative;
    display: inline-block;
    border: 1px solid #a9a9a9;
    border-radius: .25em;
    width: 1.3em;
    height: 1.3em;
    float: left;
    margin-right: 20px;

}

.radio .cr {
    border-radius: 50%;
}

.checkbox .cr .cr-icon,
.radio .cr .cr-icon {
    position: absolute;
    font-size: .8em;
    line-height: 0;
    top: 50%;
    left: 15%;
}

.radio .cr .cr-icon {
    margin-left: 0.04em;
}

.checkbox label input[type="checkbox"],
.radio label input[type="radio"] {
    display: none;
}

.checkbox label input[type="checkbox"] + .cr > .cr-icon,
.radio label input[type="radio"] + .cr > .cr-icon {
    transform: scale(3) rotateZ(-20deg);
    opacity: 0;
    transition: all .3s ease-in;
}

.checkbox label input[type="checkbox"]:checked + .cr > .cr-icon,
.radio label input[type="radio"]:checked + .cr > .cr-icon {
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
}

.checkbox label input[type="checkbox"]:disabled + .cr,
.radio label input[type="radio"]:disabled + .cr {
    opacity: .5;
}

    
                        
</style>
