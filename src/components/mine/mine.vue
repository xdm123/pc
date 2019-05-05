<template>
  <div class='mine_wrap'>
    <el-card class="userinfocard">
      <div v-if="showinfo" class="transition-box">
        <p class='headimg'><img :src="headimg" alt=""></p>
        <p class='userinfoitem'>{{inputUserName}}</p>
        <p class='userinfoitem'>{{userSex}}</p>
        <p class='userinfoitem'>{{inputUserage}}</p>
        <p class='userinfoitem'>{{inputUseraddress}}</p>
        <p class='userinfoitem'>{{inputUserwork}}</p>
        <p class='userinfoitem'>{{inputUserfun}}</p>
        <p class='userinfoitem'>{{inputsentence}}</p>
      </div>
      <div v-if="!showinfo" class="transition-box">
        <p class='headimg' @click='chooseheadimg'>
          <img :src="headimg" alt="">
        </p>
        <el-button v-if="chooseheadimgbtn" @click='uploadheadimg' v-loading.fullscreen.lock="fullscreenLoading" 
        class='editinfo' type="success">保存头像</el-button>
        <input style="display:none;" value='' type="file" ref="uploadimg" accept=".jpg, .jpeg, .png" @change="uploadAvatar">
        <el-input class='inputName' maxlength='10' placeholder="用户昵称" v-model="inputUserName" clearable></el-input>
        <div class='sexchoose'>
          <el-radio class='men' v-model="userSex" border label="男">男</el-radio>
          <el-radio class='women' v-model="userSex" border label="女">女</el-radio>
        </div>
        <el-input class='inputName' maxlength='3' placeholder="年龄" v-model="inputUserage" clearable></el-input>
        <el-input class='inputName' maxlength='20' placeholder="居住地点" v-model="inputUseraddress" clearable></el-input>
        <el-input class='inputName' maxlength='20' placeholder="职业" v-model="inputUserwork" clearable></el-input>
        <el-input class='inputName' maxlength='30' placeholder="爱好" v-model="inputUserfun" clearable></el-input>
        <el-input class='inputName' maxlength='100' clearable type="textarea" v-model="inputsentence"></el-input>
      </div>
      <el-button v-if="showinfo" @click='editinfo' class='editinfo' type="primary">编辑资料</el-button>
      <el-button v-if="!showinfo" @click='saveinfo' v-loading.fullscreen.lock="fullscreenLoading" 
      class='editinfo' type="success">保存</el-button>
      <el-button v-if="!showinfo" @click='editinfo' class='editinfo' type="warning">取消</el-button>
      <!-- <p class='userinfoitem'>累计获得了223颗小星星</p> -->
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from "vuex"
import { setTimeout } from 'timers';
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      showinfo:true,
      data:'', 
      inputUserName:'', //保存用户昵称
      userSex:'男',
      inputUserage:'',
      inputUseraddress:'',
      inputUserwork:'',
      inputUserfun:'',
      inputsentence:'',
      headimg:'',
      chooseheadimgbtn:false, //选择头像后出现上传按钮
      fullscreenLoading:false,
      formdata:''
    }
  },
  computed:{
    ...mapGetters([
      'getuid'
    ])
  },
  components: {

  },
  mounted(){
    this.getUserInfo()
  },
  methods:{
    ...mapMutations([
      'setuserobj'
    ]),
    editinfo:function(){
      this.showinfo = !this.showinfo;
      this.chooseheadimgbtn = false;
      this.headimg = this.data.headimg;
    },
    getUserInfo:function(){
      var _this = this
      this.$http.get('http://www.num12138.top:3000/userInfo?id=' + this.getuid)
      .then(function(data){
        _this.inputUserName = data.data.list[0].name
        _this.userSex = data.data.list[0].sex
        _this.inputUserage = data.data.list[0].age
        _this.inputUseraddress = data.data.list[0].address
        _this.inputUserwork = data.data.list[0].object
        _this.inputUserfun = data.data.list[0].fun
        _this.inputsentence = data.data.list[0].sentence
        _this.headimg = data.data.list[0].headimg
        _this.setuserobj(data.data.list[0])
        _this.data = data.data.list[0]
      })
      .catch(function(error){
      })
    },
    saveinfo:function(){
      var _this = this
      this.fullscreenLoading = true
      var saveid = this.getuid;
      var savename = this.inputUserName == '' ? "未设置昵称" : this.inputUserName;
      var savesex = this.userSex;
      var saveage = this.inputUserage == '' ? 18 : this.inputUserage;
      var saveworke = this.inputUserwork == '' ? "未设置职业" : this.inputUserwork;
      var saveaddress = this.inputUseraddress == '' ? "未设置地址" : this.inputUseraddress;
      var savefun = this.inputUserfun == '' ? "未设置兴趣爱好" : this.inputUserfun;
      var savesentence = this.inputsentence == '' ? "未设置喜欢的句子" : this.inputsentence;
      var saveobj = {
        "id":saveid,
        "name":savename,
        "sex":savesex,
        "age":saveage,
        "work":saveworke,
        "address":saveaddress,
        "fun":savefun,
        "sentence":savesentence
      }
      this.$http.post('http://www.num12138.top:3000/saveuserinfo',saveobj)
      .then(function(data){
        setTimeout(function(){
          _this.fullscreenLoading = false
          _this.$message({
            message: '保存成功',
            type: 'success'
          });
          _this.showinfo = !_this.showinfo;
          _this.getUserInfo()
        },1000)
      })
      .catch(function(error){
        setTimeout(function(){
          _this.fullscreenLoading = false
          _this.$message.error('保存失败');
        },1000)
      })
    },
    chooseheadimg:function(){
      this.$refs.uploadimg.click()
    },
    //点击头像框选择图片展示在页面
    uploadAvatar:function(e){
      
      var maxsize = 2048;
      var imgdata = e.target.files[0];
      console.log(imgdata);
      var imgsize = imgdata.size/1024;
      if(imgsize > 1024){
        this.$message({
          showClose: true,
          message: '图片不能大于1M,可以下载自己的微信头像上传',
          type:'warning'
        });
        return
      }
      var getObjectURL = (file) => {
        var url = null;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
      };

      var geturl = getObjectURL(imgdata);
      console.log(geturl);
      var imgobj = new Image();
      imgobj.src = geturl;
      imgobj.onload = () => {
        this.headimg = geturl
      }
      this.chooseheadimgbtn = true
      console.log(this.$refs.uploadimg)
      this.$refs.uploadimg.value = ''  //选择一次清空value的值，解决选择同一文件不触发change事件

      //创建formdata上传图片使用
      let formData = new FormData();
      var formdataid = this.getuid
      formData.append('headimg',imgdata,imgdata.name)
      formData.append('id',formdataid);
      var obj = {
        "test":1
      }
      this.formdata = formData
    },

    //上传头像
    uploadheadimg:function(){
      // var _this = this
      // console.log(_this.formdata.get('headimg'))
      // this.$http.post('http://localhost:3000/sendheadimg',_this.formdata).then((data) => {
      //   console.log(data)
      // })
      // .catch((error) => {
      //   console.log(error);
      // })
      this.$message({
        showClose: true,
        message: '暂不支持修改头像,你可以先预览哦亲',
        type: 'warning'
      });
    }
  }
}
</script>

<style lang='scss' scoped>
  .mine_wrap{
    width: 100%;
    height: 100%;
    overflow: auto;
    .userinfocard{
      width: 700px;
      margin:0 auto;
      height:auto;
      overflow: hidden;
      margin-top:50px;
      position: relative;
    }
    .headimg{
      width: 100px;
      height: 100px;
      display: block;
      border-radius: 50%;
      margin:0 auto;
      margin-top:20px;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .userinfoitem{
      width: 100%;
      text-align: center;
      font-size: 16px;
      padding:15px 0;
    }
    .editinfo{
      display: block;
      margin:0 auto;
      margin-top:20px;
    }
    // .transition-box{
    //   position: absolute;
    //   top:0;
    //   left:0;
    // }
  }
  .transitionRouter-enter-active,
  .transitionRouter-leave-active {
    transition: all 0.3s;
  }
  .transitionRouter-enter{
    transform: translate3d(100%, 0%, 0);
  }
  .transitionRouter-leave-to{
    transform: translate3d(100%, 0%, 0);
  }
  .inputName{
    width: 200px;
    display: block;
    margin:10px auto;
    margin-top:20px;
  }
  .sexchoose{
    width: 200px;
    margin:0 auto;
    text-align: center;
    overflow: hidden;
  }
  .men{
    float:left;
  }
  .women{
    float:right;
  }
</style>
