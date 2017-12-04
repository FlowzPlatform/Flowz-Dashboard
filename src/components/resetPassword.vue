<template>
  <div class="resetpassword">
     
   <div class="lhed">
        <a href="#"><img src="../assets/images/logo.png"> </a>
    </div> 

     <!-- <vue-particles color="#ccc"  :particleOpacity="7"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        ></vue-particles> -->
        
   <div class="lcontended">
      <div class="lundcon lundconreset">
                 <div class="lconun">
            <div class="lther" style="margin-top:9px;margin-bottom: 40px;"><span>Reset Password</span></div>
         </div>
          <div class="lconun">
            <div class="lrinp">
               <label>Email Id</label>
               <input type="text" class="" v-model="reset.email" placeholder="Enter Your Email Id (Required) ">
            </div>
         </div>
         <div class="lconun">
            <div class="lrinp">
               <label>Type New Password</label>
               <input type="text" class="" v-model="reset.newpassword" placeholder="Enter password (Required) ">
            </div>
         </div>
         <div class="lconun">
            <div class="lrinp">
               <label>Re-type Password</label>
               <input type="text" class="" v-model="reset.renewpassword" placeholder="re-enter password (Required) ">
            </div>
         </div>
        
         <div class="lconun lconunresetbutton">
           
            <el-button type="success" size="small" class="signupButton" @click="resetPassword()" :loading="saveFileLoading" >Reset Password</el-button>
         </div>
      </div>
   </div>
</div>
</template>
<script>

import Vue from 'vue'
import axios from 'axios'

import VueParticles from 'vue-particles'
Vue.use(VueParticles)
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
  name: 'resetpassword',
  data () {
    return {
      saveFileLoading : false,
      saveFileLoadingLogin:false,
      facebookSuccessCallbackUrl : config.facebookSuccessCallbackUrl,
      googleSuccessCallbackUrl : config.googleSuccessCallbackUrl,
      loginWithFacebookUrl : config.loginWithFacebookUrl,
      loginWithGoogleUrl : config.loginWithGoogleUrl,
      reset:{
          newpassword:"",
          renewpassword:"",
          email:""
      }
    }
  },

  created(){

        var url_string = window.location.href;
        var url = new URL(url_string);
        location = location.domain === null ? location.input : location.domain ;
        

        let token = url.searchParams.get("ob_id");
        if(token){
            this.$cookie.set('auth_token', token, {expires: 1, domain: location});
        }
  },
  
    
  
   methods: {
       resetPassword: async function(){
           let self = this;
           let emailValidator = await this.validateEmail(self.reset.email);
          if(self.reset.newpassword == ""){
               self.$message.warning("New password is required");
           }else if(self.reset.renewpassword == ""){
               self.$message.warning("re-type password is required");
           }else if(self.reset.email == ""){
               self.$message.warning("Email is required");
           }else if(emailValidator == false){
               self.$message.warning("Email is not valid");
           }else if(self.reset.newpassword != self.reset.renewpassword){
               self.$message.warning("Password dosen't match");
           }else{
               self.saveFileLoading = true;
               axios.post(config.resetpassword, {
                new_password: self.reset.renewpassword.trim(),
                token:this.$cookie.get('auth_token')
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
                    self.$router.push('/');
                }else{
                   self.saveFileLoading = false;
                   self.$message({
                    message: response.data.error,
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                self.saveFileLoading = false;
                self.$message.error("invalid token");
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

.lundconreset{
    max-width: 340px !important;
}

.lconunresetbutton{
    margin-top: 25px;
}

/* .backToLogin {
        font-family: 'Helvetica-NT-Lt';
        font-size: 14px;
        color: #888888;
        text-decoration: none;
        float: right;
        margin-top: 10px;
} */
</style>


