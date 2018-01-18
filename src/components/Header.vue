<template>
    <Menu mode="horizontal" theme="primary" style="background:#c5cee74b;">
        <Row type="flex">
            <!-- <Col :span="1">
            <Row type="flex" justify="end" align="middle">

            </Row>
        </Col> -->
            <i-col :span="5">
                <div class="f-logo">
                    <a href="#">
                        <img src="../assets/images/logo.png"> </a>
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
                            <!-- <MenuItem name="1-1">
                                <a @click="settings()">
                                    <Icon type="ios-locked-settings" :size="16"></Icon>
                                    ACL
                                </a>
                                </MenuItem> -->
                            <MenuItem name="1-2">
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

    let location = psl.parse(window.location.hostname)
    location = location.domain === null ? location.input : location.domain
    export default {
        data() {
            return {
                email: this.$store.state.loginUser ? this.$store.state.loginUser : 'User'
            }
        },
        computed: {


        },
        methods: {
            logout () {
                console.log("called....")
                // this.$session.destroy('auth_token');
                // this.$router.push('/login');
                let location = psl.parse(window.location.hostname)
                location = location.domain === null ? location.input : location.domain
                this.$store.commit('SET_TOKEN', null)
                this.$store.commit('SET_USER', null)
                // this.$router.push('login')
                this.$cookie.delete('auth_token', { domain: location });
                this.$router.push('/login');
            },
            settings: function () {
                //this.$session.destroy('auth_token');
                this.$router.push('/acl');
            },
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
