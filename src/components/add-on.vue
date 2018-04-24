<template>
  <div id="addOnDetails">
      <Table :loading="loading" :columns="addOnDetails" :data="addOnList" no-data-text="Add-on plan not found"></Table>
      <Page size="small" show-total style="margin-top:10px;" class="pull-right" :total="addOnListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
  </div>
</template>

<script>
import userAddon from '@/api/user-addon';
import _ from 'lodash';
var moment = require('moment');
moment().format();

export default {
    name: 'addOnDetails',
    props: {
        row: Object
    },
    data() {
        return {
            addOnDetails: [
                {
                    title: 'Add-on',
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
            loading: true,
            addOnListData: [],
            addOnList: [],
            currentPage: 1,
            pageSize: 5 
        }
    },
    methods: {
        async changePage (pageNo) {
            this.addOnList = await this.makeChunk(pageNo, this.pageSize)
        },
        async makeChunk (pageNo, size) {
            let chunk = []
            for (let i=(pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
                if(this.addOnListData[i] != undefined) {
                    await chunk.push(this.addOnListData[i])
                }
            }
            return chunk.slice()
        }
    },
    mounted() {
        let self = this
        userAddon.get(this.row.id).then(async res => {
            res.data = await _.orderBy(res.data, 'createdAt', 'desc')
            await res.data.filter(function(o) { 
                o.expiredOn = moment(o.expiredOn).format("DD-MMM-YYYY")
                o.createdAt = moment(o.createdAt).fromNow()
            })
            self.addOnListData = res.data
            self.addOnList = await self.makeChunk(self.currentPage, self.pageSize)
            self.loading = false
        }).catch(err => {
            if(err.message == 'Network Error'){
                self.$Notice.error({
                    duration: 5,
                    title: 'Getting your plans',
                    desc: 'API service unavailable.'
                });
            } else {
                self.$Notice.error({
                    duration: 5,
                    title: 'Getting your plans',
                    desc: err.response.data.message
                });
            }
            self.loading = false
        })
    } 
}
</script>
