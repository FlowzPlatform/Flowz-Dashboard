<template>
  <Card>
    <!-- <h3>Thank You for Subscribing...!</h3> -->
    <div style="font-size: x-large;">Your Plan Details are:-</div><br>
    <Table :loading="loading" class='dataTable' :columns="planDetails" :data="planList"></Table>
  </Card>
</template>
<script>
/*eslint-disable*/
import getUserDetails from '@/api/userdetails';
import userSubscription from '@/api/user-subscription'
import _ from 'lodash'
var moment = require('moment');
moment().format();
// import Emitter from '@/mixins/emitter'
let index
export default {
    name: 'planDetails',
    data () {
        return {
            loading: true,
            planDetails: [
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
            planList: [],
            moment : moment
        }
    },
    methods:{

    },
    mounted(){
        let self = this
        this.$Message.success('Thank You for Subscribing...!');
        let auth_token = this.$cookie.get('auth_token')
        let response

        let packages, pkgId
        getUserDetails.get(auth_token).then(res => {
            packages = res.data.data.package
            _.forEach(packages, function (item) {
                userSubscription.get(item.subscriptionId).then(res => {
                    res.data.expiredOn = moment(res.data.expiredOn).format("DD-MM-YYYY")
                    self.planList.push(res.data)
                    if(self.planList.length > 0) {
                        self.loading = false
                    }
                })
                .catch(err => {
                    self.$Notice.error({
                    duration: 5,
                    title: 'Package not found'
                    })
                })
            })
        }).catch(err => {
            self.$Notice.error({
              duration: 5,
              title: 'Error while gettings user details',
              desc: err
            })
        })
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
