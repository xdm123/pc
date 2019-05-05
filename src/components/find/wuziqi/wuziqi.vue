<template>
  <div>
    <div class='gametitle'>
      <p>电脑：白棋</p>
      <p style="color:red;">玩家先手</p>
      <p>玩家：黑棋</p>
      <p>本局用时：{{time}}秒</p>
      <p style='width:100%;'>
        <el-button 
        @click='restart'
        type="warning">重新开始</el-button>
      </p>
    </div>
    <div class='wuziqi'>
      <canvas 
      v-if="restartcanvas"
      @click='playgame'
      ref="chess" 
      id="chess" 
      width=450px 
      height=450px>
      </canvas>
    </div>
  </div>
</template>

<script src='./wuziqi.js'>
  
</script>

<style src='./wuziqi.css'>

</style>
