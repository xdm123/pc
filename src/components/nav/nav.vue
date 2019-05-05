<template>
  <div class='nav'>
    <el-row class="tac">
      <el-col :span="12" style="width:100%;">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          :default-active="$route.path"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item @click='openPath' index="/square" data-index='1' data-title='心情广场' data-path='/square'>
            <span slot="title">心情广场</span>
          </el-menu-item>
          <el-menu-item @click='openPath' index="/hot" data-index='2' data-title='热门分享' data-path='/hot'>
            <span slot="title">热门分享</span>
          </el-menu-item>
          <el-menu-item @click='openPath' index="/star" data-index='3' data-title='集赞达人' data-path='/star'>
            <span slot="title">集赞达人</span>
          </el-menu-item>
          <el-menu-item @click='openPath' index="/mine" data-index='4' data-title='个人资料' data-path='/mine'>
            <span slot="title">个人资料</span>
          </el-menu-item>

          <el-button v-if="islogin" class='exitbtn' @click='exitlogin' type="info">退出登录</el-button>
          <p class='beian'>京ICP备19017171号-1</p>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script src='./nav.js'>
  
</script>

<style>
 @import './nav.css';
 .nav{
  width:100%;
  height:100%;
  position: relative;
}
.el-col-12{
  width:100% !important;
  height:100%;
}
.el-menu{
  height:100%;
}
.el-row{
  height:100%;
}
.el-aside{
  height:100%;
}
.navSelectIcon{
  width:18px;
  margin-top:-3px;
}
.el-menu-item{
  text-align: center;
  letter-spacing: 1px;
}
.exitbtn{
  width: 100%;
  position: absolute;
  bottom: 40px;
}
.beian{
  font-size: 12px;
  color:#fff;
  height:40px;
  position: absolute;
  bottom: 0;
  line-height: 40px;
}
</style>
