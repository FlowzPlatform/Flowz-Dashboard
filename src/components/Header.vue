<template>
    <Menu mode="horizontal" :theme="'primary'">
        <Row type="flex">
        <Col :span="1">
            <Row type="flex" justify="end" align="middle">
              
            </Row>
        </Col>
        <i-col :span="5">
            <div class="f-logo">
                <a href="#"><img src="../assets/images/logo.png"> </a>
            </div>
        </i-col>
        <i-col :span="18">
            <Row type="flex" justify="end">
                <div class="layout-nav">
                    <Menu-item name="2">
                        
                    </Menu-item>
                    <Menu-item name="3">
                      <Submenu name="1">
                        <template slot="title">
                          <Icon type="person" :size="16"></Icon>
                          {{email}}
                        </template>
                        <Menu-item name="1-1">
                            <a @click="logout()">
                                <Icon type="ios-locked-outline" :size="16"></Icon>
                                Logout
                            </a>
                        </Menu-item>
                    </Submenu>
                    </Menu-item>
                </div>
                </Row>
        </i-col>
        </Row>
    </Menu>
</template>
<script>
/*eslint-disable*/
  export default {
      data () {
    return {
     email : 'User'
    }
  },
    computed: {
        
      
    },
    created() {
        // if(this.$session.get('user')){
        //     this.email = this.$session.get('user');
        // };
    },
    methods:{
      logout () {
            this.$session.destroy('token');
            this.$router.push('/login');
       }
    }
  }
</script>>