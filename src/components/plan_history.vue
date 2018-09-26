<template>
    <div>
      <div  style="margin-bottom: 1%;">
        <h3>Plan History</h3>
      </div>
        <div class="ivu-tabs-tabpane">
              <div class="ivu-table-wrapper">
                <div class="ivu-table ivu-table-small">
                  <div class="ivu-table-header">
                      <table cellspacing="0" cellpadding="0" style="width: 100%;" border="1">
                          <colgroup>
                            <col width="200">
                            <col width="200">
                            <col width="200">
                            <col width="200">
                          </colgroup>
                          <thead>
                            <tr>
                            <th class="">
                              <div class="ivu-table-cell">
                                <span>Plan</span>
                              </div>
                            </th>
                            <th class="">
                              <div class="ivu-table-cell">
                                <span>Price</span>
                              </div>
                            </th>
                            <th class="">
                              <div class="ivu-table-cell">
                                <span>Validity</span>
                              </div>
                            </th>
                            <th class="">
                              <div class="ivu-table-cell">
                                <span>Expired on</span>
                              </div>
                            </th>
                           </tr>
                         </thead>
                         <tbody class="ivu-table-tbody">
                         <tr class="ivu-table-row" v-for="(item,index) in row.package_history">
                           <td class="">
                             <div class="ivu-table-cell">
                               <span>{{item.name}}</span>
                             </div>
                           </td>
                           <td class="">
                             <div class="ivu-table-cell">
                               <span>{{item.price}}</span>
                             </div>
                           </td>
                           <td class="">
                             <div class="ivu-table-cell">
                               <span>{{item.validity}}</span>
                             </div>
                           </td>
                           <td class="">
                             <div class="ivu-table-cell">
                               <span>{{moment(item.expiredOn).format('DD-MM-YYYY')}}</span>
                             </div>
                           </td>
                         </tr>
                       </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
    </div>
</template>
<script>
var moment = require('moment');
moment().format();
    export default {
      components: {},
      name: "planHistory",
        props: {
            row: Object
        },
        data(){
          return {
              moment : moment
        }
      },
      methods:{
     },
     mounted(){
        // this.row.package_history = this.row.package_history.reverse()
     }
    };
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    .ivu-table td, .ivu-table th {
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-top: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
    border-bottom: 1px solid #e9eaec;
    border-left: 1px solid #e9eaec;
  }
  .ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #606266;
    color: #fff;
}

  h3 {
      font-size: 22px;
      text-align:center;
      margin-top: 15px;
  }
  /*th .ivu-table-cell {
      display: inline-block;
      word-wrap: normal;
      vertical-align: middle;
      font-size: 16px ;
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
  }*/

</style>
