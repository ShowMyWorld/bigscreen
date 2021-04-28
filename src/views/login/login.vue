<template>
  <div class="login">
      <div class="bg"></div>
      <particles/>
      <div class="login_box">
          <i></i>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="login_from">
            <p class="login_title">大数据中心</p>
             
              <el-form-item  prop="userName">
                <el-input
                class="userName_input"
                placeholder="请输入账号名称"
                v-model="ruleForm.userName"
                clearable>
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
             
             <el-form-item  prop="userPassword">
                <el-input
              class="userPassword_input"
              placeholder="请输入密码"
              v-model="ruleForm.userPassword"
              show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
             </el-input>
            </el-form-item>
            
             <div class="verify"> 
               <el-form-item  prop="userCode">
                  <el-input class="code_input" v-model="ruleForm.userCode" placeholder="请输入验证码" ></el-input>
                 </el-form-item>
                <vue-img-verify @getImgCode="getImgCode" ref="vueImgVerify" />
             </div>

              <el-button type="primary" round @click="Submit('ruleForm')">登陆</el-button>

          </el-form>
      </div>
  </div>
</template>

<script>
import vueImgVerify from '@/components/img-verify/vue-img-verify'
export default {  
  components: {
    vueImgVerify
  },
  mounted(){
    console.log(process.env.VUE_APP_API_URL)
    //this.$router.push({ name: 'commercial', params: {} })
  },
  data(){
     return{  
       ruleForm:{
         userName:'',
         userPassword:'',
         userCode:''
       },
       rules:{
         userName:[{required: true,message: '请输入账号名称', trigger: 'blur' }],
         userPassword:[{required: true,message: '请输入密码', trigger: 'blur' },
         { min: 6, message: '长度至少6个字符', trigger: 'blur' }],
         userCode:[{required: true,message: '请输入验证码', trigger: 'blur' }]
       },
      
      imgCode:'',
     
    }
  },
  methods:{
     getImgCode (code) {
      this.imgCode = code
    },
    Submit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.userName=='admin'&&this.ruleForm.userPassword=='123456'){
              //请求接口
              //  this.$store
              //   .dispatch('loginByUserNameAction', '')
              //   .then(response => {
              //   console.log(response)
              //   }, reason => {
              //     console.log(reason)
              //   })
              
            }
          } else {
            this.$router.push({ name: 'commercial', params: {} })
            console.log('error submit!!');
            
            return false;
          }
        });
    },
  }
}
</script>

<style lang='scss'>
.login{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
   .bg{
    background-image: url("../../assets/img/login-bg-1.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
  }
  .login_box{
    width: 306px;
    height: 364px;
    background-color: rgba(0, 0, 0, 0.2);
    position:absolute;
    margin: 0 auto;
    z-index: 1001;
    border-radius: 5px;
    box-shadow: 0px 0px 22px rgba(12, 143, 244, 0.85);
    .login_from{
      padding: 0 32px;
       .login_title{
         font-size: 27px;
         color: #fff;
         text-align: center;
         padding: 23px 0 15px 0;
       }
       .userName_input,.userPassword_input{
        font-size: 18px;
        margin: 8px 0 0 0;
        }
        .el-form-item__error{
         margin: 5px 0 0 5px;
        }
        .verify {
          display: flex;
          justify-content: space-between;
          margin-top: 36px;
          .code_input{
          .el-input__inner{
             padding-left: 10px;
             width: 85%;
             text-align: center;
          }
        }
        }
        
         .el-input__inner{
        background-color: #03233d;
        border-radius: 18px;
        border: solid 1px #175dce;
        color: #b8c6e2;
        padding-left: 42px;
        }
        .el-input__inner:hover{
          border: solid 1px #1890ff;
        }
        .el-input__inner:focus{
           border: solid 1px #1890ff;
        }
        .verifyText{
          color: #f00;
          font-size: 15px;
          padding: 8px 0 5px 8px;
        }
        .el-button{
          margin-top: 7px;
          width: 100%;
         
        }
    }

  }
}
 
</style>