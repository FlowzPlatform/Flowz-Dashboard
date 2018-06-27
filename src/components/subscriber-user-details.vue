<template>
    <div>
        <Table :loading="detailsLoading" border :columns="userDetailList" :data="userList"></Table>		
		<Page size="small" show-sizer show-total style="margin-top:10px;" class="pull-right" :total="userDetailData.length" :page-size="pageSize" :current="currentPage" @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    </div>
</template>
<script>
import userAddon from './add-on.vue'
import moment from 'moment'
moment().format()

export default {
	props: {
		row: Array
	},
	components: { userAddon },
	data: function () {
		return {
			detailsLoading: true,
			userDetailList: [
				{
					type: 'expand',
					width: 50,
					render: (h, params) => {
						return h(userAddon, {
							props: {
								userDetail: true,
								row: params.row.subscription
							}
						})
					}
				},
				{
					type: 'index',
					// title: 'index',
					width: 40,
					align: 'center'
					// ,sortable: true
				}, {
					title: 'ChargeBee Customer Id',
					render: (h, params) => {
						return h('span', params.row.customer.id)
					}
				}, {
					title: 'Customers Name',
					align: 'center',
					render: (h, params) => {
						return h('span', params.row.customer.first_name + ' ' + params.row.customer.last_name)
					}
				}, {
					title: 'Email',
					align: 'center',
					render: (h, params) => {
						return h('span', params.row.customer.email)
					}
				}, {
					title: 'Start At',
					align: 'center',
					render: (h, params) => {
						return h('span', moment.unix(params.row.subscription.started_at).format('DD MMM YYYY'))
					}
				}, {
					title: 'Next Billing At',
					align: 'center',
					render: (h, params) => {
						return h('span', moment.unix(params.row.subscription.next_billing_at).format('DD MMM YYYY'))
					}
				}, {
					title: 'Monthly Recurring Revenue (USD)',
					align: 'center',
					render: (h, params) => {
						return h('span', params.row.subscription.mrr / 100)
					}
				}, {
					title: 'Current Status',
					align: 'center',
					render: (h, params) => {
						return h('span', params.row.subscription.status)
					},
					filters: [
						{
							label: 'Active',
							value: 1
						},
						{
							label: 'Archived',
							value: 2
						}
					],
					filterMultiple: false,
					filterMethod (value, row) {
						console.log('row >>>', row)
						if (value === 1) {
							if (row.subscription.status == 'active') {
								return row.subscription.status
							}
						} else if (value === 2) {
							if (row.subscription.status == 'archived') {
								return row.subscription.status
							}
						}
					}
				}
			],
			userDetailData: [],
			userList: [],
			currentPage: 1,
			pageSize: 10
		}
	},
	methods: {
		async changePage (pageNo) {
			this.userList = await this.makeChunk(pageNo, this.pageSize)
		},
		async makeChunk (pageNo, size) {
			let chunk = []
			for (let i = (pageNo - 1) * size; i < size + (pageNo - 1) * size; i++) {
				if (this.userDetailData[i] != undefined) {
					await chunk.push(this.userDetailData[i])
				}
			}
			return chunk.slice()
		},
		changePageSize (changedSize) {
			this.pageSize = changedSize
			this.changePage(1)
		}
	},
	async mounted () {
		this.userDetailData = this.row
		this.userList = await this.makeChunk(this.currentPage, this.pageSize)
		this.detailsLoading = false
		console.log('>>ROW DATA', this.row)
		// this.$emit('interface', this.row)
	}
}
</script>