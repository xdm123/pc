
import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'
export default {
  data(){
    return{
      activeIndex:'1'
    }
  },
  props:[
    'active'
  ],
  computed:{
    ...mapGetters([
      'islogin'
    ])
  },
  watch:{
    
  },
  mounted(){
    
  },
  methods: {
    ...mapMutations([
      'changeWebTitle',
      'judgelogin'
    ]),
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    openPath:function(e){
      var webtitle = e.$el.dataset.title;
      if(this.islogin == false && webtitle == '个人资料'){
        this.changeWebTitle('登录');
      }else{
        this.changeWebTitle(webtitle)
      }
      var path = e.$el.dataset.path;
      this.$router.push({
        path:path
      })
    },
    setactive:function(){
      this.activeIndex = '1'
    },
    exitlogin:function(){
      this.$confirm('是否确认退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.judgelogin();
        this.$router.push({
          path:'/square'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
  }
}