<template>
<div class="subscriptionList">
    <div class="container" style="margin-top:3%;">
      <div class="row">
          <div class="col-md-4" v-for="(item, index) in mainData">
              <div class="panel panel-info" >
                  <div class="panel-heading">
                      <h3 class="text-center">{{item.name.toUpperCase()}}</h3></div>
                  <div class="panel-body text-center" style="min-height: 250px;">
                    <p class="lead" style="font-size:40px"><strong>${{item.price}} / {{item.validity}} {{item.time_unit}}</strong></p>
                     <Collapse v-model="item.name">
                        <Panel name="item.name">
                            Details
                            <p slot="content"><Table :data="item.details" :columns="details" :show-header="false" :border="false" stripe></Table></p>
                        </Panel>
                    </Collapse>                    
                    <ul class="list-group list-group-flush text-center" style="margin-top:10px;">
                        <li class="list-group-item"><i class="icon-ok text-danger"></i> {{item.description}} </li>
                    </ul>
                  </div>
                  <div class="panel-footer">
                      <a class="btn btn-lg btn-block btn-danger" @click="checkoutFunction(item.id)">SUBSCRIBE !</a>
                  </div>
              </div>
          </div>
      </div>
    </div>
</div>
</template>
<script>
// import defaultSubscription from '@/api/default-subscription'
// import axios from 'axios' 
import subscriptionPlans from '@/api/subscription-plans'

  export default {
    name: 'subscriptionList',
    data () {
      return {
        showDetails:'0',
        mainData: [],
        details: [{
            "key": "key",
            "width": 230,
            "type": "html"
        }, {
            "key": "value"
        }]
      }
    },
    methods: {
      init () {
        let self = this
        subscriptionPlans.get().then(res => {
            self.mainData = res.data.data
           self.mainData = _.filter(self.mainData, function(o) {
                    return o.status == true
                })
            for(let i = 0; i < self.mainData.length; i++) {
                self.mainData[i].details = _.chain(self.mainData[i].details).filter(function(o) {
                    o.value = parseInt(o.value)
                    return o.value > 0
                }).map(function(d) {
                    let str = d.module.charAt(0).toUpperCase() + d.module.slice(1)
                    let str2 = d.service.charAt(0).toUpperCase() + d.service.slice(1)
                    return {'key':'<i class="ivu-icon ivu-icon-android-checkmark-circle"></i> <b>'+str+'</b> '+str2, 'value': d.value}
                }).value()
            }
        }).catch(err => {
            self.$Notice.error({
                duration: 5,
                title: 'Fetching subscription plans',
                desc: err
            });
        })
      },
      checkoutFunction (sub_id) {
        this.$router.push('/checkout/' + sub_id)
      }
    },
    mounted () {
      this.init()
    }
  }
</script>
<!-- <style scoped>
.ivu-table-wrapper {
    border: none !important;
    position: initial !important;
}

</style>
-->