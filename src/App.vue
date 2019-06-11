<template>
  <div id="app">
    <el-container>
      <el-header class='head-temp' style="padding:0;background:rgb(84, 92, 100);color:#fff;text-indent:136px;position:relative;">
        <transition name="el-zoom-in-center">
          <div 
          ref="cityName" 
          class="transition-box cityName">{{city}}</div>
        </transition>
        <transition name="el-zoom-in-center">
          <div ref="cityWeather"  class="transition-box cityWeather">
            <el-button v-popover:popover1>
              {{type}}&nbsp;&nbsp;{{low}}&nbsp;&nbsp;{{high}}
            </el-button>
            <el-popover
              ref="popover1"
              placement="top-start"
              title="近期天气情况"
              width="auto"
              trigger="hover"
              content="">
              <ul class='hoverWeather'>
                <li v-for='(item) in weatherData' :key='item.date'>
                  {{item.date}}<br />
                  {{item.type}}<br />
                  {{item.low}}<br />
                  {{item.high}}<br />
                  {{item.fengxiang}}
                </li>
              </ul>
            </el-popover>
          </div>
        </transition>
        <span class='webtitle'>{{webtitle}}</span>
        <div>
          <div v-if='!islogin' class='logindiv' @click="tologin">
            登录   
          </div>
          <div v-else class='userinfoheaddiv'>
            <el-button v-popover:popover2>{{getuserobj.name}}</el-button>
            <el-popover
              ref="popover2"
              placement="top-start"
              title=""
              width="auto"
              trigger="click"
              content="">
              <div class='usercard'>
                <img class='headimg' :src="getuserobj.headimg" alt="">
                <span class='userinfoitem'>{{getuserobj.name}}</span>
                <span class='userinfoitem'>{{getuserobj.age}}</span>
                <span class='userinfoitem'>{{getuserobj.object}}</span>
                <span class='userinfoitem'>{{getuserobj.sentence}}</span>
              </div>
            </el-popover>
          </div>
        </div>
      </el-header>
      <el-container style="height:100%; position:relative;">
        <el-aside width="136px" style="height:100%;">
          <Nav :active='active'></Nav> 
        </el-aside>
        <el-main style="padding:0; position:relative;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div id="allmap" ref="allmap" style="width: 100%;height: 500px;display:none;"></div>
    <div v-if='showMsgbox'>{{text}}</div>
  </div>





</template>

<script>
  import Nav from './components/nav/nav.vue'
  import { mapGetters } from 'vuex'
  import {mapMutations} from 'vuex'
  import BMap from 'BMap'
  export default {
    data(){
      return{
        showMsgbox:false,
        text:'',
        city:'北京',
        low:'',
        high:'',
        type:'',
        color:'',
        weatherData:'',
        active:'',
        name:'未设置昵称',
        
      }
    },
    computed: {
      ...mapGetters([
        'webtitle',
        'islogin',
        'getuid',
        'getactiveIndex',
        'getuserobj'
      ])
    },
    watch:{
      islogin(){
        this.getUserInfo()
      }
    },
    components:{
      Nav
    },
    mounted(){
      //设置默认标题
      this.$store.dispatch('changeWebTitle','心情广场');
      //获取城市名称
      this.getPosition();
      // this.$router.push({
      //   path:'/home'
      // })
    },
    methods:{
      ...mapMutations([
        'changeWebTitle',
        'setuserobj'
      ]),
      //获取城市名字
      getPosition:function(){
        var that = this;
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);

        function myFun(result){
          var cityName = result.name;
          map.setCenter(cityName);
          that.city = cityName;
          that.getweather(cityName)
        }
        var myCity = new BMap.LocalCity();
        myCity.get(myFun);
      },

      //获取城市天气
      getweather:function(city){
        var that = this;
        var geturl = 'https://www.apiopen.top/weatherApi?city=' + city;
        $.ajax({
          url:geturl,
          type:'get',
          success:function(data){
            that.weatherData = data.data.forecast;
            that.low = data.data.forecast[0].low
            that.high = data.data.forecast[0].high
            that.type = data.data.forecast[0].type
          }
        })
      },
      tologin:function(){
        this.changeWebTitle('登录');
        this.$router.push({
          path:'/login'
        })
      },
      getUserInfo:function(){
      var _this = this
      this.$http.get('http://www.num12138.top:3000/userInfo?id=' + this.getuid)
      .then(function(data){
        _this.name = data.data.list[0].name
        _this.setuserobj(data.data.list[0]);
      })
      .catch(function(error){
      })
    }
    }
  }
</script>

<style>
html,body{
  width:100%;
  height:100%;
}
#app{
  height:100%;
}
  .head-temp{
    padding:0;
    text-align: center;
    line-height: 60px;
    letter-spacing:2px;
    border-bottom:1px solid #fff;
  }
  .el-container.is-vertical{
    height:100%;
  }
  .cityName{
    position: absolute;
    width:136px;
    height: 59px;
    line-height: 59px;
    text-align: center;
    text-indent: 0;
    left: 0;
  }
  .cityWeather{
    position: absolute;
    width:300px;
    float:left;
    text-indent: 0;
    height: 59px;
    line-height: 59px;
    text-align: left;
    left:136px;
    cursor: pointer;
  }
  .hoverWeather{
    border-top:1px solid #837f7f;
  }
  .hoverWeather li{
    width:100px;
    text-align: center;
    float:left;
    line-height: 30px;
    cursor: pointer;
  }
  .hoverWeather li:nth-child(1){
    color:orange;
    font-weight: 600;
  }
  .hoverWeather li:hover{
    color:blue;
  }
  .webtitle{
    font-size: 20px;
  }
  .logindiv{
    width: 100px;
    height: 100%;
    text-indent: 0;
    text-align: center;
    float:right;
    color:#fff;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
  }
  .userinfoheaddiv{
    width: 150px;
    height: 100%;
    text-indent: 0;
    text-align: center;
    float:right;
    color:#fff;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 16px;
  }
  .loginbtn{
    color:lightgreen;
  }
  .registerbtn{
    color:lightcoral;
  }
  .headimg{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: block;
    margin:10px auto;
  }
  .usercard{
    width: 250px;
    text-align: center;
    height:auto;
  }
  .userinfoitem{
    display: block;
    padding:10px 0;
  }
</style>



