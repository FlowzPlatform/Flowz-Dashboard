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

                <form id="form-facebook" name="form-facebook" action="http://ec2-54-88-11-110.compute-1.amazonaws.com/auth/facebook" method="post">
                            <input type="hidden" name="success_url" value="http://localhost:8081/dashboard">
                            <input type="hidden" name="key" value="108343389875876">
                            <input type="hidden" name="seceret" value="a121fc6c5188e589ef5b662866da47fe">
                            <input type="hidden" name="callbackUrl" value="http://ec2-54-88-11-110.compute-1.amazonaws.com/auth/facebook/callback">
                        
                </form>



                <div class="lconpt">
                    
                    <div class="lconun">
                        <span class="lthlob">
                            <span  @click="submitFb()" class="fb"><icon name="facebook"></icon></span> - <a href="#" class="google"><icon name="google"></icon></a> - <a href="#" class="linkdin"><icon name="linkedin"></icon></a>
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
                            <input type="button" @click="loginUser()" value="Login" class="lbtn">
                            <a href="javascript:void()" class="lfort">Forgot Password</a>
                        </div>
                    </div>
                    
                    
                </div>
                <div class="rconpt">

                    
                    <div class="lconun" style="margin-top: 10px;">
                        <span class="lthlob">
                            <span class="lthlob">
                            <span  @click="submitFb()" class="fb"><icon name="facebook"></icon></span> - <a href="#" class="google"><icon name="google"></icon></a> - <a href="#" class="linkdin"><icon name="linkedin"></icon></a>
                        </span>
                        </span>
                    </div>

                    <div class="lconun">
                        <div class="lther" style="margin-top:9px"><span>Or login with</span></div>
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
                        <div class="lrinp">
                            <input type="button" value="Sign Up" @click="registerUser()" class="lbtn">
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

Vue.use(VueSession)

Vue.use(ElementUI)

let baseUrl = 'http://localhost:3030';

export default {
  name: 'login',
  data () {
    return {
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
        
        let token = this.$session.get('token');
        if(token){
            this.$router.push('dashboard');
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
       registerUser: function(){
           let self = this;
           axios.post(baseUrl+'/register', {
                firstName: self.register.fname,
                lastName: self.register.lname,
                email: self.register.email
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    //alert(response.data.message+", please check your email for password")
                    self.$message({
                        message : response.data.message+", please check your email for password",
                        type: 'success'
                    });
                     $('.lundcon').addClass('sing');
                }else{
                   // alert(response.data.error)
                   self.$message({
                    message: response.data.error,
                    type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
                //alert(error);
                self.$message.error(error);
            });
       },
       loginUser:function(){
           let self = this;
           if(self.login.email == ""){
               self.$message.warning("email field is required");
           }else if(self.login.password == ""){
               self.$message.warning("password field is required");
           }else{
               axios.post('http://ec2-54-88-11-110.compute-1.amazonaws.com/api/login', {
                email: self.login.email.trim(),
                password: self.login.password.trim()
            })
            .then(function (response) {
               // console.log(response);
                
                self.$session.set('token', response.data.logintoken)
                
                self.$router.push('/dashboard');
            })
            .catch(function (error) {
                 self.$message.error("email or password is incorrect");
            });
           }
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


