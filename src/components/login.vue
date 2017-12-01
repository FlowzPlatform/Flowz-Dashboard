<template>
  <div class="login">
    
    <div class="lhed">
        <a href="#"><img src="../assets/images/logo.png"> </a>
    </div> 
   
    <div class="lcontended">
        <div class="lundcon">
            
            <div class="lrpt" >
                <div class="lsrpt" @click="showLogin">
                    <span>Have you an <br> account?</span>
                    <a href="javascript:void(0)">Login</a>
                </div>
                <div class="rsrpt" @click="showRegister">
                    <span>Don’t Have an <br> account?</span>
                    <a href="javascript:void(0)">Register</a>
                </div>
            </div>
            
            <div class="lrconpt">

                <form id="form-facebook" name="form-facebook" :action=loginWithFacebookUrl method="post">
                            <input type="hidden" name="success_url" :value=facebookSuccessCallbackUrl>
                            
                </form>

                <form id="form-google" name="form-google"
                :action = loginWithGoogleUrl method="post">
                <input type="hidden" name="success_url" :value=googleSuccessCallbackUrl>
                </form>

                <div class="lconpt">
                    
                    <div class="lconun">
                        <span class="lthlob">
                            <span  @click="submitFb()" class="fb"><icon name="facebook"></icon></span> - <a href="#" class="google" @click="submitGoogle()"><icon name="google"></icon></a> - <a href="#" class="linkdin"><icon name="linkedin"></icon></a>
                        </span>
                    </div>
                   
                    <div class="lconun" >
                        <div class="lther" style="margin-top:20px"><span>Or login with</span></div>
                    </div>

                    <div class="lconun">
                        <div class="lrinp">
                            <label>Email</label>
                            <input type="email" v-model="login.email" class="" placeholder="Enter Your Email (Required) ">
                        </div>
                    </div>
                    <div class="lconun">
                        <div class="lrinp">
                            <label>Password</label>
                            <input type="password" class="" v-model="login.password" placeholder="Enter Your Password (Required) ">
                        </div>
                    </div>
                    
                    <div class="lconun">
                        <div class="lrinp">
                          
                            <el-button type="success" size="small" class="signupButton" @click="loginUser()" :loading="saveFileLoadingLogin" >Login</el-button>
                            <a href="javascript:void()" class="lfort">Forgot Password</a>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="rconpt">

                    
                    <div class="lconun" style="margin-top: 10px;">
                        <span class="lthlob">
                            <span class="lthlob">
                            <span  @click="submitFb()" class="fb"><icon name="facebook"></icon></span> - <a href="#" @click="submitGoogle()" class="google"><icon name="google"></icon></a> - <a href="#" class="linkdin"><icon name="linkedin"></icon></a>
                        </span>
                        </span>
                    </div>

                    <div class="lconun">
                        <div class="lther" style="margin-top:9px"><span>Or Register with</span></div>
                    </div>


                    <div class="lconun">
                        <div class="lrinp">
                            <label>First Name</label>
                            <input type="text" class="" v-model="register.fname" placeholder="Enter Your First Name (Required) ">
                        </div>
                    </div>
                    <div class="lconun">
                        <div class="lrinp">
                            <label>Last Name</label>
                            <input type="text" class="" v-model="register.lname" placeholder="Enter Your Last Name (Required) ">
                        </div>
                    </div>
                    <div class="lconun">
                        <div class="lrinp">
                            <label>Email Id</label>
                            <input type="text" class="" v-model="register.email" placeholder="Enter Your Email Id (Required) ">
                        </div>
                    </div>
                    
                    <div class="lconun">
                        <!-- <div class="lrinp">
                            <input type="button" value="Sign Up" @click="registerUser()" class="lbtn"> -->
                            <el-button type="success" size="small" class="signupButton" @click="registerUser()" :loading="saveFileLoading" >Sign Up</el-button>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>

import Vue from 'vue'
//import VueSession from 'vue-session'
//Vue.use(VueSession)

import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueSession from 'vue-session'
import config from '../../config/customConfig'
var psl = require('psl');


Vue.use(VueSession)

Vue.use(ElementUI)
Vue.use(psl)

let baseUrl = config.feathersServiceBaseUrl;
let facebookSuccessCallbackUrl = config.facebookSuccessCallbackUrl;


let location = psl.parse(window.location.hostname)

export default {
  name: 'login',
  data () {
    return {
      saveFileLoading : false,
      saveFileLoadingLogin:false,
      facebookSuccessCallbackUrl : config.facebookSuccessCallbackUrl,
      googleSuccessCallbackUrl : config.googleSuccessCallbackUrl,
      loginWithFacebookUrl : config.loginWithFacebookUrl,
      loginWithGoogleUrl : config.loginWithGoogleUrl,
      register:{
          fname:"",
          lname:"",
          email:""
      },
      login : {
          email:"",
          password:""
      }
    }
  },

  created(){
        
        // let token = this.$session.get('auth_token');
        // if(token){
        //     this.$router.push('/');
        // }
        let token = this.$cookie.get('auth_token') ;
        if(token || token != null){
            this.$router.push('/');
        }
        
  },
  
    
  
   methods: {
       showLogin : async function(targetName, action){
           $('.lundcon').addClass('sing');
       },
       showRegister : async function(targetName, action){
           $('.lundcon').removeClass('sing');
       },
       submitFb : function(){
           $("#form-facebook").submit();           
       },
       submitGoogle : function(){
          
           $("#form-google").submit();
        },
       registerUser: async function(){
           let self = this;
           let emailValidator = await this.validateEmail(self.register.email);
           console.log(emailValidator)
          
          if(self.register.fname == ""){
               self.$message.warning("First Name is required");
           }else if(self.register.lname == ""){
               self.$message.warning("Last Name is required");
           }else if(self.register.email == ""){
               self.$message.warning("Email is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else{
               self.saveFileLoading = true;
               axios.post(config.registrationUrl, {
                firstName: self.register.fname.trim(),
                lastName: self.register.lname.trim(),
                email: self.register.email.trim()
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    self.saveFileLoading = false;
                    //alert(response.data.message+", please check your email for password")
                    self.$message({
                        message : response.data.message+", please check your email for password",
                        type: 'success'
                    });
                     $('.lundcon').addClass('sing');
                }else{
                   // alert(response.data.error)
                   self.saveFileLoading = false;
                   self.$message({
                    message: response.data.error,
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                self.saveFileLoading = false;
                //alert(error);
                self.$message.error(error);
            });
           }


           
       },

      
       loginUser: async function(){
           let self = this;
           let emailValidator = await this.validateEmail(self.login.email);
           console.log(emailValidator);

           if(self.login.email == ""){
               self.$message.warning("email field is required");
           }else if(self.login.password == ""){
               self.$message.warning("password field is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else{
               self.saveFileLoadingLogin = true;
               axios.post(config.loginUrl , {
                email: self.login.email.trim(),
                password: self.login.password.trim()
            })
            .then(function (response) {
               // console.log(response);
                self.saveFileLoadingLogin = false;
                //self.$session.set('auth_token', response.data.logintoken)

                
                location = location.domain === null ? location.input : location.domain ;
                self.$cookie.set('auth_token', response.data.logintoken, {expires: 1, domain: location});

                
                self.$router.push('/');
            })
            .catch(function (error) {
                self.saveFileLoadingLogin = false;
                 self.$message.error("email or password is incorrect");
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
}

.linkdin {
    background: #007bb5;
  color: white;
  padding: 12px 12px 3px 10px;
border-radius: 50%;
}
</style>


