export default {
  data () {
    return {
      chess:'', //棋盘
      context:'', //获取canvas上下文
      me:true, // 判断下一步是谁下棋
      saveArr:[], //棋盘格子数组，记录已经下棋的位置
      wins:[], //赢法数组
      count:0, //赢法数量
      mywin:[],
      computerwin:[],
      over:false,
      time:0,
      timestart:true,
      restartcanvas:true,
      timefn:''
    }
  },
  components: {
    
  },
  mounted(){
    var that = this;
    var chessArr = []; 

    //创建二维数组，保存棋盘
    for(var i = 0;i < 15; i++){
      chessArr[i] = [];
      for(var j = 0; j < 15; j++){
        chessArr[i][j] = 0
      }
    }
    this.chessWin()
    this.saveArr = chessArr;
    setTimeout(function(){
      that.init()
    },30)
  },
  methods:{
    //初始化获取canvas
    init:function(){
      this.chess = this.$refs.chess
      this.context = this.chess.getContext("2d");
      this.chessborad()
    },
    //画棋盘
    chessborad:function(){
      var drawcontext = this.context;
      drawcontext.clearRect(0,0,450,450);  
      drawcontext.strokeStyle='#b9b9b9';
      for (let i = 0; i < 15; i++) {
        drawcontext.moveTo(15 + i * 30, 15)
        drawcontext.lineTo(15 + i * 30, 435)
        drawcontext.stroke()
        drawcontext.moveTo(15, 15 + i * 30)
        drawcontext.lineTo(435, 15 + i * 30)
        drawcontext.stroke();
      }
    },

    //画棋子
    drawqizi:function(i,j,me){
      var drawcontext = this.context;
      drawcontext.beginPath();
      drawcontext.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
      drawcontext.closePath();
      var gradient = drawcontext.createRadialGradient(15 + i * 30 + 2,15 + j * 30 - 2,13,15 + i * 30 + 2,15 + j * 30 - 2,0);
      if(me){
        gradient.addColorStop(0,'#0a0a0a');
        gradient.addColorStop(1,'#636766');
      }else{
        gradient.addColorStop(0,'#d1d1d1');
        gradient.addColorStop(1,'#f9f9f9');
      }
      drawcontext.fillStyle = gradient
      drawcontext.fill();
    },

    //鼠标点击落子
    playgame:function(e){
      var that = this;
      if(that.timestart){
        that.gametime();
        that.timestart = false;
      }
      if(this.over){
        return
      }
      if(!this.me){
        return
      }
      console.log(e);
      var x = e.offsetX;
      var y = e.offsetY;
      var i = Math.floor(x / 30);
      var j = Math.floor(y / 30);
      if(this.saveArr[i][j] == 0){
        this.drawqizi(i,j,this.me);
        this.saveArr[i][j] = 1
        for(var k=0; k<this.count; k++){
          if(this.wins[i][j][k]){
            this.mywin[k]++;
            console.log(this.mywin[k])
            this.computerwin[k] = 6;
            if(this.mywin[k] == 5){
              setTimeout(function(){
                alert('你赢了');
                that.over = true;
              },30)
            }
          }
        }
        if(!that.over){
          this.me = !this.me;
          this.computerAi()
        }
      }
    },

    //计算机下棋ai算法学习
    //统计赢法
    chessWin:function(){    
      var chesswinarr = [];
      var count = 0; //赢法数量统计
      //创建三维赢法数组
      for(var i = 0;i < 15; i++){
        chesswinarr[i] = [];
        for(var j = 0; j < 15; j++){
          chesswinarr[i][j] = [];
        }
      }
      //横线赢法
      for(var i=0; i<15; i++){
        for(var j=0; j<11; j++){
          for(var k=0; k<5; k++){
            chesswinarr[i][j+k][count] = true;
          }
          count++;
        }
      }
      //竖线赢法
      for(var i=0; i<15; i++){
        for(var j=0; j<11; j++){
          for(var k=0; k<5; k++){
            chesswinarr[j+k][i][count] = true;
          }
          count++;
        }
      }
      //斜线赢法
      for(var i=0; i<11; i++){
        for(var j=0; j<11; j++){
          for(var k=0; k<5; k++){
            chesswinarr[i+k][j+k][count] = true;
          }
          count++;
        }
      }
      //反竖线赢法
      for(var i=0; i<11; i++){
        for(var j=14; j>3; j--){
          for(var k=0; k<5; k++){
            chesswinarr[i+k][j-k][count] = true;
          }
          count++;
        }
      }
      this.count = count;
      this.wins = chesswinarr;

      //统计赢法种类
      for(var i=0; i<this.count; i++){
        this.mywin[i] = 0;
        this.computerwin[i] = 0;
      }
    },

    //计算机下棋ai算法
    computerAi:function(){
      var that = this;
      var myscore = [];
      var computerscore = [];
      var max = 0;
      var u = 0, v = 0;
      for(var i=0; i<15; i++){
        myscore[i] = [];
        computerscore[i] = [];
        for(var j=0; j<15; j++){
          myscore[i][j] = 0;
          computerscore[i][j] = 0;
        }
      }
      for(var i=0; i<15; i++){
        for(var j=0; j<15; j++){
          if(this.saveArr[i][j] == 0){
            for(var k=0; k<this.count; k++){
              if(this.wins[i][j][k]){
                if(this.mywin[k] == 1){
                  myscore[i][j] += 200;
                }else if(this.mywin[k] == 2){
                  myscore[i][j] += 400;
                }else if(this.mywin[k] == 3){
                  myscore[i][j] += 2000;
                }else if(this.mywin[k] == 4){
                  myscore[i][j] += 10000;
                }
                if(this.computerwin[k] == 1){
                  computerscore[i][j] += 220;
                }else if(this.computerwin[k] == 2){
                  computerscore[i][j] += 420;
                }else if(this.computerwin[k] == 3){
                  computerscore[i][j] += 2100;
                }else if(this.computerwin[k] == 4){
                  computerscore[i][j] += 20000;
                }
              }
            }
            if(myscore[i][j] > max){
              max = myscore[i][j];
              u = i;
              v = j;
            }else if(myscore[i][j] == max){
              if(computerscore[i][j] > computerscore[u][v]){
                u = i;
                v = j;
              }
            }
            if(computerscore[i][j] > max){
              max = computerscore[i][j];
              u = i;
              v = j;
            }else if(computerscore[i][j] == max){
              if(myscore[i][j] > myscore[u][v]){
                u = i;
                v = j;
              }
            }
          }
        }
      }
      this.drawqizi(u,v,false);
      this.saveArr[u][v] = 2;
      for(var k=0; k<this.count; k++){
        if(this.wins[u][v][k]){
          this.computerwin[k]++;
          this.mywin[k] = 6;
          if(this.computerwin[k] == 5){
            var that = this
            setTimeout(function(){
              alert('计算机赢了');
              that.over = true;
            },30)
          }
        }
      }
      if(!that.over){
        this.me = !this.me;
      }
    },
    //重新开始本局
    restart:function(){
      var that = this;
      clearInterval(that.timefn);
      this.chess=''
      this.context=''
      this.me=true
      this.saveArr=[]
      this.wins=[]
      this.timestart=true
      this.count=0
      this.mywin=[]
      this.computerwin=[]
      this.time=0
      this.over=false
      this.timefn = ''
      this.restartcanvas = false;
      setTimeout(function(){
        that.restartcanvas = true;
        // 创建二维数组，保存棋盘
        var chessArr = [];
        for(var i = 0;i < 15; i++){
          chessArr[i] = [];
          for(var j = 0; j < 15; j++){
            chessArr[i][j] = 0
          }
        }
        that.chessWin()
        that.saveArr = chessArr;
        setTimeout(function(){
          that.init();
        },30)
      },30)
    },

    //计算对局用时
    gametime:function(){
      var that = this;
      that.timefn = setInterval(function(){
        if(that.over){
          clearInterval(that.timefn);
          return
        }
        that.time += 1
      },1000)
    }
  }
}