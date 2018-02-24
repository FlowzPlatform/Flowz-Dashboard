<template>
    <Menu mode="horizontal" theme="primary" style="background:#c5cee74b;">
        <Row type="flex">
            <!-- <Col :span="1">
            <Row type="flex" justify="end" align="middle">

            </Row>
        </Col> -->
            <i-col :span="5">
                <div class="f-logo">
                    <a @click="mainPage()">
                        <img src="../assets/images/flowz_digital_logo2.png" style="height: 50px; margin-left: 10px;"/> </a>
                </div>
            </i-col>
            <i-col :span="18">
                <Row type="flex" justify="end">
                    <div class="layout-nav">
                        <Submenu name="3">
                            <template slot="title" >
                                <Icon type="person" :size="16"></Icon>
                                {{email}}
                            </template>
                            <!-- MenuItem name="1-1">
                                <a @click="settings()">
                                    <Icon type="ios-locked-settings" :size="16"></Icon>
                                    ACL
                                </a>
                                </MenuItem -->
                            <MenuItem name="1-2">
                                <a @click="subscriptionList()">
                                    <Icon type="ios-locked-settings" :size="16"></Icon>
                                    Subscription List
                                </a>
                            </MenuItem>
                            <MenuItem name="1-3">
                                <a @click="planList()">
                                    <Icon type="ios-locked-settings" :size="16"></Icon>
                                    Subscribed List
                                </a>
                            </MenuItem>
                            <MenuItem name="1-4">
                            <a @click="logout()">
                                <Icon type="ios-locked-outline" :size="16"></Icon>
                                Logout
                            </a>
                              <!-- <p>csdcsscd</p> -->
                            </MenuItem>
                        </Submenu>
                    </div>
                </Row>
            </i-col>
        </Row>
    </Menu>
</template>
<script>
    /*eslint-disable*/
    import Cookie from 'js-cookie'
    let location = psl.parse(window.location.hostname)
    location = location.domain === null ? location.input : location.domain
    export default {
        data() {
            return {
                email: Cookie.get('user') ? Cookie.get('user') : 'User'
            }
        },
        computed: {


        },
        methods: {
            //   logout () {
            //         this.$session.destroy('auth_token');
            //         this.$router.push('/login');
            //    }

            logout: function () {
                //this.$session.destroy('auth_token');

                this.$store.commit("FB_SIGN_IN",false);
                this.$store.commit("GOOGLE_SIGN_IN",false);
                this.$store.commit('SET_LOGIN_USER', "");
                this.$cookie.delete('auth_token');
                Cookie.remove('auth_token' ,{domain: location})
                Cookie.remove('user' ,{domain: location})
                this.$router.push('/login');
                this.$Message.success({content:'You have Succesfully Logged Out',duration:3})

            },
            settings: function () {
                //this.$session.destroy('auth_token');
                //his.$router.push('/acl');
                let routeData = this.$router.resolve({name: 'acl'});
                window.open(routeData.href, '_blank');
            },
            subscriptionList: function () {
                //this.$router.push('/subscription-list');
                let routeData = this.$router.resolve({name: 'subscriptionList'});
                window.open(routeData.href, '_blank');
            },
            planList: function () {
                //this.$router.push('/plan-details');
                let routeData = this.$router.resolve({name: 'planDetails'});
                window.open(routeData.href, '_blank');
            },
            mainPage: function () {
                this.$router.push('/');
            }
        },

        mounted (){
            setTimeout(function() {
            this.email = Cookie.get('user') ? Cookie.get('user') : 'User'
            }, 1000);

        }
    }
</script>
<style scoped>
    .user.background--light {
        color: #be2828;
      }

    .user.background--dark {
        color: rgb(32, 136, 63);
      }
</style>
