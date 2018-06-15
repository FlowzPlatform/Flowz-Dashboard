<template>
    <div>
        <Table highlight-row :loading="loading" class='dataTable' :columns="planDetails" :data="planList" no-data-text="No Data" @on-current-change="currentRow"></Table>
        <Page v-if="planListData.length > pageSize" size="small" show-total style="margin-top:10px;" class="pull-right" :total="planListData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage"></Page>
    </div>
</template>
<script>
import getUserDetails from '@/api/userdetails'
import cbSubscription from '@/api/cb-subscription'
import cbPlan from '@/api/cb-plan'
import expandRow from './add-on.vue'
import Cookies from 'js-cookie'
import psl from 'psl'
var moment = require('moment')
moment().format()
export default {
	components: {
		expandRow
	},
	name: 'planDetails',
	data () {
		return {
			loading: true,
			planDetails: [
				// {
				//     type: 'expand',
				//     width: 50,
				//     render: (h, params) => {
				//         return h(expandRow, {
				//             props: {
				//                 row: params.row
				//             }
				//         })
				//     }
				// },
				{
					title: 'Plan',
					render: (h, params) => {
						return h('div', [
							h('a', params.row.plan_name)
						])
					}
				},
				{
					title: 'Price',
					key: 'plan_unit_price',
					align: 'center'
				},
				{
					title: 'Validity (Months)',
					key: 'billing_period',
					align: 'center'
				},
				{
					title: 'Subscribed',
					key: 'started_at',
					align: 'center'
				},
				{
					title: 'Expiry Date',
					key: 'current_term_end',
					sortable: true
				}
			],
			planListData: [],
			planList: [],
			moment: moment,
			userDetails: null,
			currentPage: 1,
			pageSize: 10,
			currentMsgInst: this.$store.state.currentMsgInst
		}
	},
	methods: {
		async changePage (pageNo) {
			this.planList = await this.makeChunk(pageNo, this.pageSize)
		},
		async makeChunk (pageNo, size) {
			let chunk = []
			for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
				if (this.planListData[i] != undefined) {
					await chunk.push(this.planListData[i])
				}
			}
			return chunk.slice()
		},
		currentRow (currentRow) {
			this.$emit('selectedSubscription', [currentRow.id, currentRow.plan_id, currentRow.plan_unit_price, currentRow.next_billing_at])
		},
		async getPlanName (itm) {
			return cbPlan.get(itm.subscription.plan_id).then(res => {
				return res.data.name
			})
		}
	},
	async mounted () {
		let self = this

		await getUserDetails.get().then(res => {
			self.userDetails = res.data.data
		}).catch(err => {
			if (err.response && err.response.data.message == 'User authentication fail') {
				this.$Message.error({
					content: 'Your session has been expired please login again.',
					duration: 7,
					closable: true
				})
				let location = psl.parse(window.location.hostname)
				location = location.domain === null ? location.input : location.domain
				Cookies.remove('auth_token', {domain: location})
				Cookies.remove('access', {domain: location})
				Cookies.remove('user', {domain: location})
				self.$router.push({ name: 'login' })
			} else {
				self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: err.message
				})
			}
		})
		cbSubscription.getOwn(self.userDetails._id).then(async res => {
			// console.log('Res of cb-subscription:: ', res)

			let obj = res.data.map(async (itm) => {
				itm.subscription.plan_unit_price /= 100
				itm.subscription.started_at = moment.unix(itm.subscription.started_at).format('DD MMM YYYY')
				itm.subscription.current_term_end = moment.unix(itm.subscription.current_term_end).format('DD MMM YYYY')
				itm.subscription.plan_name = await self.getPlanName(itm)
				Promise.resolve(itm.subscription.plan_name)
				return itm.subscription
			})
			Promise.all(obj).then(async res => {
				self.planListData = res
				self.planList = await self.makeChunk(self.currentPage, self.pageSize)
				self.loading = false
			})
		}).catch(err => {
			if (self.currentMsgInst &&	!self.currentMsgInst.closed) {
				self.$Notice.error({
					duration: 5,
					title: 'Getting your plans',
					desc: err.message
				})
			}
			self.loading = false
		})

		/*  userSubscription.getOwn().then(async res => {
            res.data = await _.orderBy(res.data, 'createdAt', 'desc')
            await res.data.filter(function(o) {
                o.expiredOn = moment(o.expiredOn).format("DD-MMM-YYYY")
                o.createdAt = moment(o.createdAt).fromNow()
            })
            self.planListData = res.data
            self.planList = await self.makeChunk(self.currentPage, self.pageSize)
            // if(self.planList.length > 0) {
            self.loading = false
            // }
        }).catch(err => {
            console.log(err)
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
