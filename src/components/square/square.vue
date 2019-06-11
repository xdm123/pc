<template>
  <div class='square_wrap'>
    <ul>
      <li v-for="(item , index) in feeldata" :key='index'>
        <el-card shadow="hover" class="box-card">
          <p class='list_head'>
            <img :src="item.headimg" alt="">
            <span>{{item.name}}</span>
          </p>
          <p class='item_inner'>{{item.feeltext}}</p>
          <p class='item_time'>
            {{item.posttime}}
            <span class='lightnum'>0</span>
            <span class='lightstar'></span>
          </p>
        </el-card>
      </li>
    </ul>
    <el-button 
    @click='editinner'
    v-if="islogin"
    class='postfeel' 
    type="primary">发布一条</el-button>
    <el-card  v-if="postboxshow" class="box-card postcard">
      <el-input 
      type="textarea" 
      class='inputarea'
      rows='10'
      maxlength='300'
      placeholder='现在的感觉是这样的'
      v-model="postinner"></el-input>
      <div class='postbtn_wrap'>
        <el-button @click='cencelpost' type="info">取消发布</el-button>
        <el-button @click='confirmpost' type="success">确认发布</el-button>
      </div>
    </el-card>
    <el-button
    type="primary"
    style='opacity:0;'
    v-if='fullscreenLoading'
    @click="openFullScreen"
    v-loading.fullscreen.lock="fullscreenLoading">
    </el-button>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      postboxshow:false, //打开内容输入卡片
      postinner:'', //输入框内容
      fullscreenLoading:false,
      feeldata:''
    }
  },
  computed:{
    ...mapGetters([
      'islogin',
      'getuserobj'
    ])
  },
  components: {

  },
  methods:{
    ...mapMutations([
      'changeWebTitle'
    ]),
    openFullScreen:function(){
      this.fullscreenLoading = !this.fullscreenLoading
    },
    //打开编辑框
    editinner:function(){
      var _this = this
      if(this.postboxshow){
        this.$confirm('确认取消发布吗')
        .then(_ => {
          _this.postboxshow = false
        })
        .catch(_ => {
          console.log('继续编辑')
        });
      }else{
        this.postboxshow = !this.postboxshow
      }
    },
    cencelpost:function(){
      var _this = this
      this.$confirm('确认取消发布吗')
      .then(_ => {
        _this.postboxshow = false
      })
      .catch(_ => {
        console.log('继续编辑');
      });
    },
    confirmpost:function(){
      var _this = this
      if(this.postinner == '' || this.postinner.length < 20){
        this.$message({
          message: '内容过短',
          type: 'warning'
        });
        return
      }
      this.$confirm('确认发布吗')
      .then(_ => {
        this.openFullScreen()
        console.log('请求发布接口');
        var time = new Date();
        var y = time.getFullYear()
        var m = time.getMonth() + 1
        var d = time.getDate()
        var h = time.getHours()
        var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
        console.log(y,m,d,h,min)
        var posttime = y + '-' + m + '-' + d + ' ' + h + ':' + min
        console.log(posttime)
        var postdata = {
          "id":this.getuserobj.id,
          "name":this.getuserobj.name,
          "headimg":this.getuserobj.headimg,
          "feeltext":this.postinner,
          "posttime":posttime
        }
        this.$http.post('http://www.num12138.top:3000/savefeel',postdata)
        .then((data) => {
          setTimeout(function(){
            _this.openFullScreen();
            _this.postboxshow = false
            _this.postinner = ''
            _this.getpostlist()
          },1000)
          console.log(data)
        })
        .catch((error) => {
          console.log(error);
        })
      })
      .catch(_ => {
        console.log('继续编辑');
      });
      
    },
    getpostlist:function(){
      this.$http.get('http://www.num12138.top:3000/getfeel')
      .then((data) => {
        console.log(data)
        this.feeldata = data.data.list.reverse()
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.changeWebTitle('心情广场');
    this.getpostlist()
  }
}
</script>

<style lang='scss' scoped>
  .square_wrap{
    width: 100%;
    height: 100%;
    position: relative;
    // overflow: hidden;
    li{
      width: 70%;
      margin:20px auto;
    }
  }
  .postfeel{
    width: 100px;
    height:100px;
    position: fixed;
    right: 50px;
    bottom:50px;
    border-radius: 50%;
  }
  .postcard{
    width: 400px;
    height:auto;
    margin:0 auto;
    margin-top:100px;
    position: fixed;
    top: 0;
    left:50%;
    margin-left:-142px;
    background:skyblue;
  }
  .inputarea textarea{
    resize: none;
  }
  .postbtn_wrap{
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top:20px;
  }
  .list_head{
    width:100%;
    height:70px;
    line-height: 70px;
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      float:left;
      margin-right:20px;
    }
  }
  .item_inner{
    padding:20px 40px;
  }
  .item_time{
    width: 100%;
    text-align: right;
    height: 40px;
    line-height:60px;
  }
  .lightstar{
    display: inline-block;
    background:url('../../assets/img/star.png') no-repeat center;
    background-size: 100% 100%;
    width: 40px;
    height:40px;
    float:right;
    margin-left:20px;
    margin-right:10px;
    cursor: pointer;
  }
  .lightnum{
    display: inline-block;
    height:40px;
    float:right;
    margin-right:40px;
  }
</style>
