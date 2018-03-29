<template>
 <div class="login">
   <!-- <div class="lhed">
      <a href="#"><img src="../assets/images/flowz_digital_logo2.png" style="height: 50px;"> </a>
      </div> -->
   <div class="lcontended">
      <div v-if="!isSocialLogin" class="lundcon">
         <div class="lrpt" >
            <div class="lsrpt" @click="showLogin">
               <span>Already have an <br> account?</span>
               <a href="javascript:void(0)">Login</a>
            </div>
            <div class="rsrpt" @click="showRegister">
               <span>Don’t Have an <br> account?</span>
               <a href="javascript:void(0)">Register</a>
            </div>
         </div>
         <div class="lrconpt">
            <form id="form-facebook" name="form-facebook" :action="loginWithFacebookUrl" method="get">
               <input type="hidden" name="success_url" :value="facebookSuccessCallbackUrl">
               <input type="hidden" name="failure_url" :value="facebookSuccessCallbackUrl">
            </form>
            <form id="form-google" name="form-google" :action = "loginWithGoogleUrl" method="get">
               <input type="hidden" name="success_url" :value="googleSuccessCallbackUrl">
               <input type="hidden" name="failure_url" :value="googleSuccessCallbackUrl">
            </form>
            <form id="form-twitter" name="form-twitter" :action="loginWithTwitterUrl" method="get">
               <input type="hidden" name="success_url" :value="twitterSuccessCallbackUrl">
               <input type="hidden" name="failure_url" :value="twitterSuccessCallbackUrl">
            </form>
            <form id="form-linkedin" name="form-linkedin" :action="loginWithLinkedInUrl" method="get">
               <input type="hidden" name="success_url" :value="linkedInSuccessCallbackUrl">
               <input type="hidden" name="failure_url" :value="linkedInSuccessCallbackUrl">
            </form>
            <form id="form-github" name="form-github" :action="loginWithGithubUrl" method="get">
               <input type="hidden" name="success_url" :value="githubSuccessCallbackUrl">
               <input type="hidden" name="failure_url" :value="githubSuccessCallbackUrl">
            </form>

            <div class="lconpt">
               <div class="lconun">
                  <span class="lthlob">
                      <!-- <Tooltip content="Login with facebook">
                     <span  @click="submitFb()" class="fb">
                        <icon name="facebook"></icon>
                     </span>

                     </Tooltip>
                     -  -->
                     <Tooltip content="Login with google">
                     <span class="google" @click="submitGoogle()">
                        <icon name="google"></icon>
                      </span>
                      </Tooltip>
                      -
                      <Tooltip content="Login with twitter">
                      <span class="twitter" @click="submitTwitter()">
                        <icon name="twitter"></icon>
                      </span>
                      </Tooltip>
                      -
                      <Tooltip content="Login with linkdin">
                      <span class="linkedin" @click="submitLinkedin()">
                        <icon name="linkedin"></icon>
                      </span> 
                        </Tooltip>
                        -
                      <Tooltip content="Login with github">

                      <span class="github" @click="submitGithub()">
                        <icon name="github"></icon>
                      </span>
                      </Tooltip>

                  </span>
               </div>
               <div class="lconun" >
                  <div class="lther" v-if="!showForgotPassword" style="margin-top:20px"><span>Or login with</span></div>
                  <div class="lther" v-else style="margin-top:20px"><span>FORGOT PASSWORD</span></div>
               </div>
               <div>
                  <el-tabs class="lconun" v-model="activeName" type="card" value="1" @tab-click="tabsClicked">
                     <el-tab-pane label="Standard" name="1" >
                        <div class="lconun">
                           <div class="lrinp">
                              <label style="margin-left: 0px; margin-top: 2px;">*Email</label>
                              <input type="email" v-model="login.email" class="" placeholder="Email " style="margin-left: 0px; margin-top: 2px;">
                           </div>
                        </div>
                        <div class="lconun" v-if="!showForgotPassword">
                           <div class="lrinp">
                              <label style="margin-left: 0px; margin-top: 2px;">*Password</label>
                              <input type="password" class="" v-model="login.password" placeholder="Password " @keyup.enter="loginUser()" style="margin-left: 0px; margin-top: 2px;">
                           </div>
                        </div>
                     </el-tab-pane>
                     <el-tab-pane v-if="!showForgotPassword" label="LDAP" name="2">
                        <div class="lconun">
                           <div class="lrinp">
                              <label style="margin-left: 0px; margin-top: 2px;">*Email</label>
                              <input type="email" v-model="login.email" class="" placeholder="Email " style="margin-left: 0px; margin-top: 2px;">
                           </div>
                        </div>
                        <div class="lconun">
                           <div class="lrinp">
                              <label style="margin-left: 0px; margin-top: 2px;">*Password</label>
                              <input type="password" class="" v-model="login.password" placeholder="Password " @keyup.enter="loginUser()" style="margin-left: 0px; margin-top: 2px;">
                           </div>
                        </div>
                     </el-tab-pane>
                  </el-tabs>
               </div>
               <div class="lconun">
                  <div class="lrinp">

                       <div>
                           <div class="col-md-6">
                               <el-button type="success" v-if="!showForgotPassword" size="small"  class="signupButton" @click="loginUser()" :loading="saveFileLoadingLogin" style="margin-left:18px">Login</el-button>
                              <el-button type="success" size="small" class="signupButton"  v-if="showForgotPassword" @click="forgotPasswordSendEmail()" :loading="saveFileLoadingLogin" style="margin-left:18px" >Submit</el-button>
                           </div>
                           <div class="col-md-6" style="top: 9px;">
                              <a href="javascript:void()" class="lfort" v-if="!showForgotPassword"  v-show="this.selectedTabIndex==0" @click="forgotPassword()" style="margin-right:18px;color:#0e0c0c">Forgot Password</a>
                              <a href="javascript:void()" class="lfort" v-if="showForgotPassword" v-show="this.selectedTabIndex==0" @click="backtoLogin()" style="margin-right:18px;color:#0e0c0c">Back to Login</a>

                           </div>
                        </div>



                  </div>
               </div>
            </div>
            <div class="rconpt">
               <div class="lconun" style="margin-top: 10px;">
                  <span class="lthlob">
                     <span class="lthlob">

                        
                        <!-- <Tooltip content="Login with facebook">
                        <span  @click="submitFb()" class="fb">
                           <icon name="facebook"></icon>
                        </span>
                        </Tooltip>
                        -  -->
                        <Tooltip content="Login with google">

                         <span  @click="submitGoogle()" class="google">
                           <icon name="google"></icon>
                        </span>
                        </Tooltip>
                        -
                        <Tooltip content="Login with twitter">
                      <span class="twitter" @click="submitTwitter()">
                        <icon name="twitter"></icon>
                      </span>
                      </Tooltip>
                      -
                       <Tooltip content="Login with linkdin">
                      <span class="linkedin" @click="submitLinkedin()">
                        <icon name="linkedin"></icon>
                      </span>
                       </Tooltip>
                      -
                      <Tooltip content="Login with github">
                      <span class="github" @click="submitGithub()">
                        <icon name="github"></icon>
                      </span>
                      </Tooltip>

                     </span>
                  </span>
               </div>
               <div class="lconun">
                  <div class="lther" style="margin-top:9px"><span>Or Register with</span></div>
               </div>
               <div class="lconun">
                   <form  v-on:submit.prevent="signupUser" action="#" method="post">
                     <div class="lrinp">
                        <label style="width:150px">*Name</label>
                     </div>
                     <div class="lrinp">
                        <input style="width:48%;display: inline-block;" type="text" required v-model="signup.fname" placeholder="First Name ">    
                        <input type="text" style="width:50%;display: inline-block;" v-model="signup.lname" placeholder="Last Name ">                                            
                     </div>
                     <div class="lrinp">
                        <label>*Email</label>
                        <input type="email" v-model="signup.email"placeholder="Email " >
                     </div>
                     <div class="lrinp">
                        <label>*Password</label>
                        <input type="password" v-model="signup.password" placeholder="Password ">
                     </div>
                     <button type="submit" style="display:none"></button>
                  </form>
                  <el-button type="success" size="medium" class="signupButton"  @click="signupUser()" :loading="saveFileLoadingLogin" >Sign Up</el-button>
               </div>

               <!-- <div class="lconun">
                  <div class="lrinp">
                     <label>First Name</label>
                     <input type="text" class="" v-model="register.fname" placeholder="Enter Your First Name ">
                  </div>
               </div>
               <div class="lconun">
                  <div class="lrinp">
                     <label>Last Name</label>
                     <input type="text" class="" v-model="register.lname" placeholder="Enter Your Last Name ">
                  </div>
               </div>
               <div class="lconun">
                  <div class="lrinp">
                     <label>Email Id</label>
                     <input type="text" class="" v-model="register.email" placeholder="Enter Your Email Id ">
                  </div>
               </div>
               <div class="lconun">

                  <el-button type="success" size="small" class="signupButton" @click="registerUser()" :loading="saveFileLoading" >Sign Up</el-button>
               </div> -->
            </div>
         </div>
      </div>
      <div v-else class="lundcon">
           <div class="login2">
             <div class="login2-triangle"></div>

             <h2 class="login2-header">Email</h2>

             <div class="login2-container">
                 <p><input type="email" placeholder="Email" v-model="varifyEmail"></p>
                 <p><Button type="primary" :loading="emailLoading" @click="getTokenFromSocialLogin" long>PROCEED</Button></p>
                 </div>
             </div>
       </div>
   </div>
</div>

</template>

<script>


import Vue from 'vue'
import Cookie from 'js-cookie'
//import VueSession from 'vue-session'
//Vue.use(VueSession)

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueSession from 'vue-session'
import config from '../../config/customConfig'
// import { mapMutations } from "vuex";
var psl = require('psl');


Vue.use(VueSession)

Vue.use(ElementUI)
Vue.use(psl)

let baseUrl = config.feathersServiceBaseUrl;
let facebookSuccessCallbackUrl = config.facebookSuccessCallbackUrl;


let location = psl.parse(window.location.hostname)
location = location.domain === null ? location.input : location.domain ;


export default {
  name: 'login',
  data () {
    return {
    signup: {
            fname: "",
            lname:'',
            password: "",
            email: ""
        },
     varifyEmail : "",
      saveFileLoading : false,
      emailLoading : false,
      obId : '',
      saveFileLoadingLogin:false,
      facebookSuccessCallbackUrl : config.facebookSuccessCallbackUrl,
        googleSuccessCallbackUrl : config.googleSuccessCallbackUrl,
        twitterSuccessCallbackUrl: config.twitterSuccessCallbackUrl,
        githubSuccessCallbackUrl: config.githubSuccessCallbackUrl,
        linkedInSuccessCallbackUrl: config.linkedInSuccessCallbackUrl,
        loginWithFacebookUrl : config.loginWithFacebookUrl,
        loginWithGoogleUrl : config.loginWithGoogleUrl,
        loginWithTwitterUrl: config.loginWithTwitterUrl,
        loginWithGithubUrl: config.loginWithGithubUrl,
        loginWithLinkedInUrl: config.loginWithLinkedInUrl,
      isSocialLogin : false,
      register:{
          fname:"",
          lname:"",
          email:""
      },
      login : {
          email:"",
          password:""
      },
      selectedTabIndex:0,
      activeName: '1',
      showForgotPassword : false
    }
  },

  created(){
        let self = this;
       var configObj = {};
    //    console.log(window.location.search)

       var url = new URL(window.location.href);
       var ob_id = url.searchParams.get("ob_id");
    //    console.log(ob_id);
        if(ob_id  && ob_id != undefined)
        {
            this.obId = ob_id;
            self.isSocialLogin = true;

        }

  },



   methods: {

       forgotPassword(){
             let params = new URLSearchParams(document.location.href);
        console.log(params)
        let name = params.get("ob_id"); // is the string "Jonathan"

        // alert(name)
            this.showForgotPassword = true;
        },

        forgotPasswordSendEmail: async function() {
            let self = this;
            let emailValidator = await this.validateEmail(self.login.email);
            console.log(emailValidator);

            if (self.login.email == "") {
                self.$message.warning("email field is required");
            } else if (emailValidator == false) {
                self.$message.warning("Email is not valid");
            } else {
                self.saveFileLoadingLogin = true;
                axios.post(config.forgotPasswordUrl, {
                        email: self.login.email.trim(),
                         url: config.resetPasswordRedirectUrl
                      // url: "http://localhost:8082/reset-password"
                    })
                    .then(function(response) {
                        self.saveFileLoadingLogin = false;
                        console.log(response)
                        if (response.data.code == 200) {
                            self.$message.success(response.data.message);
                            self.login.email = ""
                        }
                    })
                    .catch(function(error) {
                        console.log("error-->", error.response)
                        self.saveFileLoadingLogin = false;

                        self.$message.error(error.response.data);

                    });
            }
        },
        backtoLogin(){
            this.showForgotPassword = false;
        },

    async  getTokenFromSocialLogin(){
                let self = this
                let valid = await this.validateEmail(this.varifyEmail); ;
                if(!valid){
                    this.$message.warning("Please enter a valid email address")
                }else{
                    this.emailLoading = true;
                    axios.post(config.varifyEmailUrl, {
                        email: this.varifyEmail,
                        id: this.obId
                    })
                    .then(function(response) {
                        self.emailLoading = false ;
                        console.log(response)
                        self.saveFileLoadingLogin = false;

                        axios({
                            method: 'get',
                            url: config.userDetail,
                            headers: {'Authorization': response.data.logintoken}
                        })
                        .then(function(result) {
                            console.log(result)
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                             Cookie.set('user',  result.data.data.email  , {domain: location});
                              Cookie.set('auth_token', response.data.logintoken , {domain: location});

                            if(response.data.data.package !== undefined) {
                              self.$router.push('/');
                            } else {
                              self.$router.push('/subscription-list');
                            }


                        })
                    }).catch(function(error){
                        self.emailLoading = false ;
                       console.log(error.response)
                       if(error.response.status == 409){
                            self.$message.error(error.response.data)
                        }
                    })
                }


        },
    tabsClicked(val){
                this.login.email = ''
                this.login.password = ''
                console.log('value is:',val.index);
                this.selectedTabIndex = val.index;
        },
       showLogin : async function(targetName, action){
           $('.lundcon').addClass('sing');
       },
       showRegister : async function(targetName, action){
           $('.lundcon').removeClass('sing');
       },
       submitFb : function(){
            this.$store.commit("FB_SIGN_IN",true)
           $("#form-facebook").submit();
       },
       submitGoogle : function(){
           this.$store.commit("GOOGLE_SIGN_IN",true)
           $("#form-google").submit();
        },
        submitTwitter : function(){

           $("#form-twitter").submit();
        },
        submitLinkedin : function(){

           $("#form-linkedin").submit();
        },
        submitGithub : function(){

           $("#form-github").submit();
        },
    //    registerUser: async function(){
    //        let self = this;
    //        let emailValidator = await this.validateEmail(self.register.email);
    //        console.log('Email Validator', emailValidator)
    //       if(self.register.fname == ""){
    //            self.$message.warning("First Name is required");
    //        }else if(self.register.lname == ""){
    //            self.$message.warning("Last Name is required");
    //        }else if(self.register.email == ""){
    //            self.$message.warning("Email is required");
    //        }else if(emailValidator == false){
    //            self.$message.warning("Email is not valid");
    //        }else{
    //            self.saveFileLoading = true;
    //            console.log('Registartion URL', config.registrationUrl)
    //            axios.post(config.registrationUrl, {
    //             firstName: self.register.fname.trim(),
    //             lastName: self.register.lname.trim(),
    //             email: self.register.email.trim()
    //         })
    //         .then(function (response) {
    //             console.log("Response",response)
    //             if(response.status == 200){
    //                 self.saveFileLoading = false;
    //                 //alert(response.data.message+", please check your email for password")
    //                 self.$message({
    //                     message : " please check your email for password",
    //                     type: 'success'
    //                 });
    //                  $('.lundcon').addClass('sing');
    //             }else{
    //                // alert(response.data.error)
    //                self.saveFileLoading = false;
    //                self.$message({
    //                 message: response.data.error,
    //                 type: 'warning'
    //                 });
    //             }
    //         })
    //         .catch(function (error) {
    //             console.log('Error', error.response.data)
    //             // this.login.password = ''
    //             // console.log(error);
    //             self.saveFileLoading = false;
    //             //alert(error);
    //             self.$message.error(error.response.data);
    //         });
    //        }
    //    },

          signupUser:async function(){
            let self = this;
           let emailValidator = await this.validateEmail(self.signup.email);
           console.log(emailValidator)
          if(self.signup.fname == ""){
               self.$message.warning("First name is required");
           }else if(self.signup.lname == ""){
               self.$message.warning("Last name is required");
           }else if(self.signup.email == ""){
               self.$message.warning("email is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else if(self.signup.password == ""){
               self.$message.warning("password is required");
           }else{
               self.saveFileLoading = true;
               axios.post(config.signupUrl, {
                email: self.signup.email.trim(),
                password: self.signup.password.trim(),
                firstname: self.signup.fname.trim(),
                lastname : self.signup.lname.trim()
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    self.saveFileLoading = false;
                    //alert(response.data.message+", please check your email for password")
                    self.$message({
                        message : response.data.message,
                        type: 'success'
                    });

                    self.signup.email = '';
                    self.signup.password = "";
                    self.signup.fname = "";
                    self.signup.lname = "";
                    
                     $('.lundcon').addClass('sing');
                }else{
                   self.saveFileLoading = false;
                   self.$message({
                    message: response.data.error,
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                // this.login.password = ''
                 console.log(error.response);
                //self.saveFileLoading = false;
                //alert(error);

                if(error.response.status == 409){
                    self.$message.error(error.response.data);
                }else{
                    self.$message.error("Something went wrong , Please try again later");
                }

            });
           }
          },

       loginUser: async function(){
           let self = this;
           let emailValidator = await this.validateEmail(self.login.email);
        //    console.log('emailvalidator', emailValidator);

           if(self.login.email == ""){
               self.$message.warning("email field is required");
           }else if(self.login.password == ""){
               self.$message.warning("password field is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else{
             self.saveFileLoadingLogin = true;
            //  console.log('login URL:', config.loginUrl)
             axios.post(this.selectedTabIndex==0? config.loginUrl:config.ldapLoginUrl , {email: self.login.email.trim(),
                    password: self.login.password.trim()})
            .then(function (response) {

                axios({
                            method: 'get',
                            url: config.userDetail,
                            headers: {'Authorization': response.data.logintoken}
                        })
                        .then(function(result) {
                            let location = psl.parse(window.location.hostname)
                            location = location.domain === null ? location.input : location.domain
                            Cookie.set('user',  result.data.data.email  , {domain: location});
                            Cookie.set('auth_token', response.data.logintoken , {domain: location});

                            if(result.data.data.package !== undefined) {
                              self.$router.push('/');
                            } else {
                              self.$router.push('/subscription-list');
                            }
                            // self.$router.push('/');
                        })


            // //    console.log('Login response:',response);

            //    let email = self.login.email.trim().split('@');
            // //    console.log('Email',email);
            //    self.$store.commit('SET_LOGIN_USER', email[0]);
            //    self.saveFileLoadingLogin = false;
            //     //self.$session.set('auth_token', response.data.logintoken)
            //     let location = psl.parse(window.location.hostname)
            //     location = location.domain === null ? location.input : location.domain
            //     //   location = location.domain === null ? location.input : location.domain
            //     //   console.log('Cookie :', Vue.cookie)
            //     //   Vue.cookie.set('auth_token', token, {expires: 1, domain: location});
            //     // console.log('domain', location.domain);
            //     // location = location.domain === null ? location.input : location.domain ;
            //      alert(response.data.logintoken)

            //     Cookies.set('auth_token', response.data.logintoken , {domain: location});
            //     // Cookie.set('auth_token', response.data.logintoken, {expires: 1, domain: location});
            //     self.$router.push({path: '/dashboard'})


            //     // console.log('before call dashboard');
            //     // self.$router.push('/');
            })
            .catch(function (error) {
                // console.log("error-->",error.response)
                self.saveFileLoadingLogin = false;
                if(!error.response || error.response != undefined){
                    self.$message.error(error.response.data)
                }else{
                    self.$message.error("email or password is incorrect");
                }

            });
           }
       },
        validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        }
   }
}
</script>

<style>


.fb {
background-color: #337ab7;
color: #fff  !important;
padding: 12px 12px 3px 10px;
border-radius: 50%;
cursor: pointer;
}

.signupButton {

    background: #8ec622;
    /* line-height: 21px; */
    color: #fff;
    font-size: 17px;
    padding: 10px 25px;
    font-family: Helvetica-N-Md;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.8);
}

.google {
    background-color: #dd4b39;
  color: white;
  padding: 12px 12px 3px 10px;
border-radius: 50%;
cursor: pointer;
}

.linkedin {
    background: #1a77b5;
  color: white;
  padding: 12px 12px 3px 10px;
border-radius: 50%;
cursor: pointer;
}

.twitter {
    background: #1da1f2;
  color: white;
  padding: 12px 12px 3px 10px;
border-radius: 50%;
cursor: pointer;
}

.github {
    background: #24292e;
  color: white;
  padding: 12px 12px 3px 10px;
border-radius: 50%;
cursor: pointer;
}

.login2 {
    width: 400px;
    margin: 16px auto;
    font-size: 16px;
  }

  /* Reset top and bottom margins from certain elements */
  .login2-header,
  .login2 p {
    margin-top: 0;
    margin-bottom: 0;
  }

  /* The triangle form is achieved by a CSS hack */
  .login2-triangle {
    width: 0;
    margin-right: auto;
    margin-left: auto;
    border: 12px solid transparent;
    border-bottom-color: #28d;
  }

  .login2-header {
    background: #28d;
    padding: 20px;
    font-size: 1.4em;
    font-weight: normal;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
  }

  .login2-container {
    background: #ebebeb;
    padding: 12px;
  }

  /* Every row inside .login-container is defined with p tags */
  .login2 p {
    padding: 12px;
  }

  .login2 input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    border-width: 1px;
    border-style: solid;
    padding: 16px;
    outline: 0;
    font-family: inherit;
    font-size: 0.95em;
  }

  .login2 input[type="email"],
  .login2 input[type="password"] {
    background: #fff;
    border-color: #bbb;
    color: #555;
  }

  /* Text fields' focus effect */
  .login2 input[type="email"]:focus,
  .login2 input[type="password"]:focus {
    border-color: #888;
  }

  .login2 input[type="submit"] {
    background: #28d;
    border-color: transparent;
    color: #fff;
    cursor: pointer;
  }

  .login2 input[type="submit"]:hover {
    background: #17c;
  }

  /* Buttons' focus effect */
  .login2 input[type="submit"]:focus {
    border-color: #05a;
  }

   .lconpt {height: -webkit-fill-available}

</style>
<style>
    .vjs-control-bar {display:none;}
</style>
