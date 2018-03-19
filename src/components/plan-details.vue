<template>
<Row style="margin-top:30px;">
    <Col span="14" push="5">
        <Card>
            <!-- <h3>Thank You for Subscribing...!</h3> -->
            <div style="font-size: x-large;">My Plan</div><br>
                <Row>
                    <Col span="22" push="1">
                        <Table :loading="loading" class='dataTable' :columns="planDetails" :data="planList" no-data-text="No Data"></Table>
                        <Page style="margin-top:10px;" class="pull-right" :total="planListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
                    </Col>
                </Row>
        </Card>
    </Col>
</Row>
</template>
<script>
/*eslint-disable*/
import getUserDetails from '@/api/userdetails';
import userSubscription from '@/api/user-subscription'
import Cookies from 'js-cookie'
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
                    key: 'price',
                    align: 'center'
                },
                {
                    title: 'Validity (Months)',
                    key: 'validity',
                    align: 'center'
                },
                {
                    title: 'Subscribed',
                    key: 'createdAt',
                    align: 'center',
                },
                {
                    title: 'Expiry Date',
                    key: 'expiredOn',
                    sortable: true
                }
            ],
            planListData: [],
            planList: [],
            moment : moment,
            currentPage: 1,
            pageSize: 10 
        }
    },
    methods:{
    async changePage (pageNo) {
        this.planList = await this.makeChunk(pageNo, this.pageSize)
    },
    async makeChunk (pageNo, size) {
        let chunk = []
        for (let i=(pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
            if(this.planListData[i] != undefined) {
                await chunk.push(this.planListData[i])
            }
        }
        return chunk.slice()
    }

    },
    mounted(){
        let self = this
        if(Cookies.get('welcomeMsg')) {
            this.$Message.success(Cookies.get('welcomeMsg'));
            Cookies.remove('welcomeMsg')
        }
        userSubscription.getOwn().then(async res => {
            res.data.data = await _.orderBy(res.data.data, 'createdAt', 'desc')
            await res.data.data.filter(function(o) { 
                o.expiredOn = moment(o.expiredOn).format("DD-MMM-YYYY")
                o.createdAt = moment(o.createdAt).fromNow()
            })
            self.planListData = res.data.data
            self.planList = await self.makeChunk(self.currentPage, self.pageSize)
            // if(self.planList.length > 0) {
            self.loading = false
            // }
        })
        /* getUserDetails.get().then(res => {
            packages = res.data.data.package

            _.forEach(packages, function (item) {
                userSubscription.get(item.subscriptionId).then(res => {
                    res.data.expiredOn = moment(res.data.expiredOn).format("DD-MMM-YYYY")
                    self.planList.push(res.data)
                    self.planList.sort(function(a, b)
                    {
                      a.createdAt = a.createdAt === undefined ? 0 : a.createdAt
                      b.createdAt = b.createdAt === undefined ? 0 : b.createdAt
                      return  new Date(a.createdAt) < new Date(b.createdAt)
                    });
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
        }) */
    }
}
</script>
<style scoped>
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
