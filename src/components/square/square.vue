<template>
  <div class='square_wrap'>
    心情广场
  </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed:{
    
  },
  components: {

  },
  methods:{
    ...mapMutations([
      'changeWebTitle'
    ])
  },
  mounted(){
    this.changeWebTitle('心情广场');
  }
}
</script>

<style lang='scss' scoped>
  .square_wrap{
    width: 100%;
    height: 100%;
  }
</style>
