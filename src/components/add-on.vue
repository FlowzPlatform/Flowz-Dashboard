<template>
  <div>
      <Table :columns="addOnDetails" :data="addOnList" no-data-text="No Data"></Table>
  </div>
</template>

<script>
export default {
    name: 'addOnDetails',
    props: {
        row: Object
    },
    data() {
        return {
            planDetails: [
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
            addOnList: [],
            currentPage: 1,
            pageSize: 10 
        }
    }
  
}
</script>
