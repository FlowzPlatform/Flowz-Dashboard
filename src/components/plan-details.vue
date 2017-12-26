<template>
  <Card>
    <!-- <h3>Thank You for Subscribing...!</h3> -->
    <div style="font-size: x-large;">Your Plan Details are:-</div><br>
    <Table class='dataTable' :columns="columns1" :data="data2"></Table>
  </Card>
</template>
<script>
/*eslint-disable*/
import planHistory from './plan_history.vue';
let axios = require("axios")
var moment = require('moment');
moment().format();
// import Emitter from '@/mixins/emitter'
let index
export default {
    name: 'planDetails',
    components: {planHistory},
    data () {
        return {
            columns1: [
                {
                    type: 'expand',
                    width: 25,
                    render: (h, params) => {
                      return h('thead', {
                                style: {
                                    fontSize: '16px'
                                }
                            }),
                        h(planHistory, {
                            props: {
                                row: params.row
                            }
                        })
                    }
                },
                {
                    title: 'Plan',
                    key: 'name'
                },
                {
                    title: 'Price',
                    key: 'price'
                },
                {
                    title: 'Validity',
                    key: 'validity'
                },
                {
                    title: 'Expired on',
                    key: 'expiredOn'
                }
            ],
            data2: [],
            moment : moment
        }
    },
    methods:{

    },
    mounted(){
        this.$Message.success('Thank You for Subscribing...!');
        let auth_token = this.$cookie.get('auth_token')
        let response
        axios({
                method:'get',
                url:"http://auth.flowz.com/api/userdetails",
                headers: {'authorization': auth_token},
              }).then(response => {
                console.log("response.....",response.data.data)
                response = response.data.data
                this.data2.push({"name":response.package.name,"price":response.package.price,"validity":response.package.validity,"expiredOn":moment(response.package.expiredOn).format("DD-MM-YYYY"),"package_history":response.package_history.reverse()})
                // console.log("this.data2...",this.data2)

        })
        .catch(function (error) {
          console.log("**********",error)
          self.$Notice.error({
              duration: 5,
              title: 'Please check...some error'
          });
        });
    }
}
</script>
<style>
h3 {
    font-size: 30px;
    text-align: center;
}
.ivu-table th {
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  background-color: #054890;
  color: #fff;
}
th .ivu-table-cell {
    display: inline-block;
    word-wrap: normal;
    vertical-align: middle;
    font-size: 16px;
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
}
td.ivu-table-expanded-cell {
    padding: 0px;
    background: #f8f8f9;
}
</style>
