<template>
  <div class='login_wrap'>
    <el-button style="display:none;" type="text" @click="open">点击打开 Message Box</el-button>
    <el-button style="display:none;" :plain="true" @click="openerror">错误</el-button>
    <el-button style="display:none;" :plain="true" @click="opensuccess">成功</el-button>
    <el-card class="login-card">
      <el-input
      class='accountInput'
      placeholder="登录用手机号"
      maxlength='11'
      v-model="phonenum"
      clearable>
      </el-input>
      <el-input
      class='accountInput'
      placeholder="登录密码"
      v-model="psd"
      maxlength='10'
      minLength='6'
      type='password'
      clearable>
      </el-input>
      <el-button 
      @click='clicklogin' 
      class='loginbtn' 
      v-loading.fullscreen.lock="fullscreenLoading"
      type="success">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
import { setTimeout } from 'timers';
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      phonenum:'',
      psd:'',
      fullscreenLoading:false
    }
  },
  components: {

  },
  computed:{

  },
  mounted(){
    this.changeWebTitle('登录');
    this.open()
  },
  methods:{
    ...mapActions([
      'changeWebTitle'
    ]),
    ...mapMutations([
      'judgelogin',
      'setUid',
      'setactiveIndex'
    ]),
    open() {
      this.$alert('登录后自动注册，请记好你的账号和密码', '登录提示', {
        confirmButtonText: '我知道了',
        callback: action => {
          this.$message({
            type: 'success',
            showClose:true,
            message: '请登录'
          });
        }
      });
    },
    openerror(message) {
      this.$message({
        showClose: true,
        message: message,
        duration:4000,
        type: 'error'
      });
    },
    opensuccess(message){
      this.$message({
        message: message,
        type: 'success',
        showClose: true,
        duration:4000,
      });
    },
    fullscreen:function(){

    },
    clicklogin:function(){
      var testnum = /^1[34578]\d{9}$/ //检查手机号是否正确
      var testpsd = /^[0-9a-zA-Z]+$/ //检查密码只能是数字或字母
      if(testnum.test(this.phonenum)){
      }else{
        this.openerror('错误的手机号');
        return
      }
      if(this.psd.length<6){
        this.openerror('密码长度为6到10位');
        return
      }
      if(testpsd.test(this.psd)){
      }else{
        this.openerror('密码只能由数字和字母组成');
        return
      }
      this.fullscreenLoading = true
      this.loginhttp()
    },
    loginhttp:function(){
      var _this = this
      this.$http.post('http://www.num12138.top:3000/insertUser',{
        "account":_this.phonenum,
        "password":_this.psd
      })
      .then(function(data){
        var status = data.data.status;
        if(status == 100){
          setTimeout(function(){
            _this.fullscreenLoading = false
            _this.opensuccess('恭喜您！注册成功！');
            _this.judgelogin()
            _this.setUid(_this.phonenum)
            _this.$router.push({
              path:'/square'
            })
          },2000)
        }else if(status == 200){
          setTimeout(function(){
            _this.fullscreenLoading = false
            _this.opensuccess('成功登录');
            _this.setUid(_this.phonenum)
            _this.judgelogin();
            _this.$router.push({
              path:'/square'
            })
          },2000)
        }else if(status == 400){
          _this.fullscreenLoading = false
          _this.openerror('对不起，密码错误!');
        }
      })
      .catch(function(erre){
        _this.fullscreenLoading = false
        console.log(erre)
        _this.openerror('网络错误');
      })
    }
  }
  
}
</script>

<style scoped lang='scss'>
  .login_wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .login-card{
    width: 400px;
    height:auto;
    padding:10px;
    margin:0 auto;
    margin-top:100px;
  }
  .accountInput,.loginbtn{
    width: 300px;
    display:block;
    margin:30px auto;
  }
  .loginbtn{
    font-size: 16px;
    color:#fff;
  }
</style>
