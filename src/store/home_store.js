export default {
  state:{
    webtitle:'',
    islogin:false, //判断是否登录
    uid:'', //保存用户id
    activeIndex:'0', //左侧导航栏默认选中项
    userobj:[]
  },
  getters:{
      webtitle(state){//这里的state对应着上面这个state
        return state.webtitle;
      },
      islogin(state){
        return state.islogin
      },
      getuid(state){
        return state.uid
      },
      getactiveIndex(state){
        return state.activeIndex
      },
      getuserobj(state){
        return state.userobj
      }
  },
  mutations:{
    changeWebTitle(state,data){
      state.webtitle = data
    },
    judgelogin(state){
      state.islogin = !state.islogin;
    },
    setUid(state,data){
      state.uid = data
    },
    setactiveIndex(state,data){
      state.activeIndex = data
    },
    setuserobj(state,data){
      state.userobj = data
    }
  },
  actions:{
    changeWebTitle(context,data){//这里的context和我们使用的$store拥有相同的对象和方法
      context.commit('changeWebTitle',data);
    }
  }
}