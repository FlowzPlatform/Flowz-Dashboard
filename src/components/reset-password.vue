<template>
  <div>
    <div class="mainBody">
      
      <div class="loginContainer">
        <div class="frontbox" style="right:unset">
           <div class="login">
             <h2>Reset Password</h2>
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem  prop="newPassword">
                    <label>New Password</label>
                    <Input type="password" v-model="formValidate.newPassword" placeholder="Enter New Password"></Input>
                </FormItem>
                <FormItem  prop="confirmPassword">
                    <label>Confirm Password</label>
                    <Input type="password" v-model="formValidate.confirmPassword" placeholder="Enter Confirm Password"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="saveFileLoadingLogin" @click="handleSubmit('formValidate')">Submit</Button>
                </FormItem>
             </Form>
           </div>
         </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import config from '../../config/customConfig' 
export default {
  name: 'reset-password',
  data () {
    const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter confirm password!'));
                } else if (value !== this.formValidate.newPassword) {
                    callback(new Error('The entered new and confirm password does not match!'));
                } else {
                    callback();
                }
            };
  return {
      saveFileLoadingLogin : false,
    formValidate: {
                    newPassword: '',
                    confirmPassword: ''
                  },
    ruleValidate: {
      newPassword: [
          { required: true, message: 'Please enter NewPassword', trigger: 'blur' }
        ],
        confirmPassword: [
            { required: true, validator: validatePassCheck, trigger: 'blur' }
                    ]}

    }
  },
  methods: {
    handleSubmit (name) {
                let self = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        let url = new URL(window.location.href);
                        let forget_token = url.searchParams.get("forget_token");
                        
                    axios.post(config.resetPasswordUrl, {
                              new_password: self.formValidate.newPassword.trim(),
                              token: forget_token
                        })
                        .then(function (response) {
                            console.log(response);
                            self.$message.success(response.data.message);
                            self.$router.push('/login');
                        })
                        .catch(function (error) {
                            console.log(error.response);
                            self.$message.error(error.response.data);
                        });
                    // axios({
                    // method: 'post',
                    // url: "config.resetPasswordUrl",
                    // data: {
                    //     new_password: self.formValidate.newPassword.trim(),
                    //      token: forget_token
                    // }
                    // })
                    // .then(function(response) {
                    //    // self.saveFileLoadingLogin = false;
                    //     console.log(response)
                    //     if (response.data.code == 200) {
                    //         self.$message.success(response.data.message);
                    //         self.login.email = ""
                    //     }
                    // })
                    // .catch(function(error) {
                    //     console.log("error-->", error.response)
                    //    // self.saveFileLoadingLogin = false;
                        
                    //     self.$message.error(error.response.data);

                    // });
                    console.log(111)
                    } else {
                        this.$Message.error('Please enter correct inputs');
                    }
                })
            }

  },
  mounted(){

  }
}
</script>


<style scoped>
    @import './login.css';
</style>
