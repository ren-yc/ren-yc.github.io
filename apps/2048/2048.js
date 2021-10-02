var game={
    data:[],//启动后是一个二维数组，存储每个格的数字
    RN:4, //总行数
    CN:4, //总列数
    score:0, //保存游戏分数
    state:0, //保存游戏的状态
    RUNNING:1, //专门表示游戏正在运行
    GAMEOVER:0, //专门表示游戏结束
    getGridsHtml:function(){//生成所有背景格的html代码
    //r从0开始，到<RN结束，每次增1，同时声明空数组arr
        for(var r=0,arr=[];r<this.RN;r++){
    //  c从0开始，到<CN结束，每次增1
            for(var c=0;c<this.CN;arr.push(""+r+c++));
        }
        return '<div id="g'+
            arr.join('" class="grid"></div><div id="g')
            +'" class="grid"></div>';
    },
    getCellsHtml:function(){//生成所有前景格的html代码
        for(var r=0,arr=[];r<this.RN;r++){
            for(var c=0;c<this.CN;arr.push(""+r+c++));
        }
        return '<div id="c'+
            arr.join('" class="cell"></div><div id="c')
            +'" class="cell"></div>';
    },
    init:function(){//生成所有背景和前景格，并加入到页面
        var gp=document.getElementById("gridPanel");
        gp.style.width=116*this.CN+16+"px";
        gp.style.height=116*this.RN+16+"px";
        gp.innerHTML=this.getGridsHtml()
                    +this.getCellsHtml();
    },
    start:function(){//游戏启动方法，启动游戏时调用
        this.init();
        this.state=this.RUNNING; //游戏状态改为启动
        //初始化数组为RN行，CN列的二维数组，所有元素为0
        //初始化空数组
        for(var r=0;r<this.RN;r++){
            this.data[r]=[];//初始化每一行为空数组
            for(var c=0;c<this.CN;c++){
                this.data[r][c]=0;//初始化每个格为0
            }
        }
        this.score=0;//初始化游戏分数为0
        //随机生成2个2或4
        this.randomNum();
        this.randomNum();
        this.updateView();//将data的数据，更行到页面div
    },
    isGameOver:function(){//判断当前游戏是否结束
        //遍历data中所有元素
        for(var r=0;r<this.data.length;r++){
            for(var c=0;c<this.data[r].length;c++){
        //    如果当前元素值==0,就返回false
                if(this.data[r][c]==0){return false;}
                else{//否则 如果当前列不是最右侧列，
        //             且当前元素等于右侧元素
                    if(c!=this.data[r].length-1
                &&this.data[r][c]==this.data[r][c+1]){
                        return false;//返回false
                    }else if(r!=this.data.length-1
                &&this.data[r][c]==this.data[r+1][c]){
                        //否则 如果当前行不是最后一行
        //             且当前元素等于下方元素
                        return false;//返回false
                    }
                }
            }
        }//(遍历结束)将游戏状态改为GAMEOVER
        this.state=this.GAMEOVER;
        return true;//返回true
    },
    randomNum:function(){//随机挑选一个位置，生成2或4
        if(!this.isFull()){//只有不满，才执行以下所有代码
        while(true){//反复执行
        //    随机生成一个行下标，保存在r中
            var r=parseInt(Math.random()*(this.RN));
        //    随机生成一个列下标，保存在c中
            var c=parseInt(Math.random()*(this.CN));
        //    如果data中r行c列位置的值==0
            if(this.data[r][c]==0){
        //        随机生成2或4，放入r行c列的元素中
        //       如果生成一个随机数<0.5，就放入2，否则放4
                this.data[r][c]=Math.random()<0.5?2:4;
                break;//退出循环
            }
        }
        }
    },
    isFull:function(){//专门用来判断数组是否已满
        //遍历data中每个元素
        for(var r=0;r<this.data.length;r++){
            for(var c=0;c<this.data[r].length;c++){
        //    只要发现当前元素==0
                if(this.data[r][c]==0){
                    return false;//返回false
                }
            }
        }//(遍历结束)返回true;
        return true;
    },
    //负责将data中每个元素刷到页面中
    //并修改页面每个div的class属性
    updateView:function(){
        //遍历data中每个元素
        for(var r=0;r<this.data.length;r++){
            for(var c=0;c<this.data[r].length;c++){
                //找到页面中和当前元素对应位置的div
                var div=document.getElementById("c"+r+c);
                //只有当前元素指不等于0
                if(this.data[r][c]!=0){
                    //将当前元素值放入div的内容中
                    div.innerHTML=this.data[r][c];
                    //给div的class穿上和数值对应的衣服
                    div.className=
                        "cell n"+this.data[r][c];
                }else{
                //否则，重置div的样式为cell，并清空内容
                    div.className="cell";
                    div.innerHTML="";
                }
            }
        }
        /*将分数写到页面*/
        var span=document.getElementById("score");
        span.innerHTML=this.score;
        //找到#gameover，
        var gameover=document.getElementById("gameover");
        if(this.state==this.GAMEOVER){//如果游戏结束
            var span=document.getElementById("finalScore");
            span.innerHTML=this.score;
            //修改display为block
            gameover.style.display="block";
        }else{//否则，修改display为none
            gameover.style.display="none";
        }
    },
    moveLeft:function(){//左移所有行
        var before=this.data.toString();
        for(var r=0;r<this.data.length;r++){
            this.moveLeftInRow(r);
        }
        var after=this.data.toString();
        if(before!=after){
            this.randomNum();//随机生成一个新数
            this.isGameOver();//判断游戏是否结束
            this.updateView(); //更新界面
        }
    },
    moveLeftInRow:function(r){//左移第r行
        for(var c=0;c<this.data[r].length-1;c++){
            //从c开始，找下一个不为0的位置下标next
            var next=this.getRightNext(r,c);
            //如果next==-1，说明都是0了
            if(next==-1){break;}//退出循环
            else{
                if(this.data[r][c]==0){
                    this.data[r][c]=this.data[r][next];
                    this.data[r][next]=0;
                    c--;
                }else if(this.data[r][c]
                            ==this.data[r][next]){
                    this.data[r][c]*=2;
                    this.data[r][next]=0;
                    this.score+=this.data[r][c];
                }
            }
        }
    },
    getRightNext:function(r,c){//专门找当前位置右侧下一个
        //从c+1开始遍历之后所有元素
        for(var next=c+1;next<this.data[r].length;next++){
            if(this.data[r][next]!=0){//如果找到!=0的
                return next;//返回next
            }
        }//(遍历结束)返回-1
        return -1;
    },
    moveRight:function(){
        var before=this.data.toString();
        for(var r=0;r<this.data.length;r++){
            this.moveRightInRow(r);
        }
        var after=this.data.toString();
        if(before!=after){
            this.randomNum();
            this.isGameOver();//判断游戏是否结束
            this.updateView();
        }
    },
    moveRightInRow:function(r){
        /*遍历当前行中每个元素，
            c从length-1开始，到1结束，每次递减1*/
        for(var c=this.data[r].length-1;c>0;c--){
        //  找左侧下一个不为0的数的下标，保存在prev中
            var prev=this.getLeftPrev(r,c);
        //  如果prev等于-1，就退出循环
            if(prev==-1){break;}
            else{//  否则
                if(this.data[r][c]==0){//如果当前元素是0
        //          用prev位置的元素，替换当前元素
                    this.data[r][c]=this.data[r][prev];
        //          将prev位置的元素设置为0
                    this.data[r][prev]=0;
                    c++;//c右移一位
                }else if(this.data[r][c]
                            ==this.data[r][prev]){
        //      否则，如果当前元素和prev位置的元素相等
        //          将当前位置的元素乘2
                    this.data[r][c]*=2;
        //          将prev位置的元素设置为0
                    this.data[r][prev]=0;
                    this.score+=this.data[r][c];
                }
            }
        }
    },
    getLeftPrev:function(r,c){
        /*遍历c左侧剩余元素，
          prevC从c-1开始，到0结束，每次递减1*/
        for(var prevC=c-1;prevC>=0;prevC--){
        //     如果prevC位置的元素不等于0，就返回prevC
            if(this.data[r][prevC]!=0){return prevC;}
        }
        return -1;//(循环退出)返回-1;
    },
    moveUp:function(){//遍历每一列
        var before=this.data.toString();
        for(var c=0;c<this.CN;c++){
            this.moveUpInCol(c);
        }
        var after=this.data.toString();
        if(before!=after){
            this.randomNum();
            this.isGameOver();//判断游戏是否结束
            this.updateView();
        }
    },
    moveUpInCol:function(c){
        /*遍历当前列中每个元素，
        r从0开始，到<整个数组的length-1结束，每次递增1*/
        for(var r=0;r<this.data.length-1;r++){
        //  找下方下一个不为0的数的下标，保存在down中
            var down=this.getDownNext(r,c);
        //  如果down等于-1，就退出循环
            if(down==-1){break;}
            else{//  否则
                if(this.data[r][c]==0){//如果当前元素是0
        //          用down位置的元素，替换当前元素
                    this.data[r][c]=this.data[down][c];
        //          将down位置的元素设置为0
                    this.data[down][c]=0;
                    r--;//r向上退一位
                }else if(this.data[r][c]
                            ==this.data[down][c]){
        //      否则，如果当前元素和down位置的元素相等
        //          将当前位置的元素乘2
                    this.data[r][c]*=2;
        //          将down位置的元素设置为0
                    this.data[down][c]=0;
                    this.score+=this.data[r][c];
                }
            }
        }
    },
    getDownNext:function(r,c){
        /*遍历当前列中下方剩余元素
    downR从r+1开始，到<整个数组的length结束,downR递增1*/
        for(var downR=r+1;downR<this.data.length;downR++){
        //    如果downR位置的元素!=0，就返回downR
            if(this.data[downR][c]!=0){return downR}
        }
        return -1;//(遍历结束)返回-1;
    },
    moveDown:function(){//遍历每一列
        var before=this.data.toString();
        for(var c=0;c<this.CN;c++){
            this.moveDownInCol(c);
        }
        var after=this.data.toString();
        if(before!=after){
            this.randomNum();
            this.isGameOver();//判断游戏是否结束
            this.updateView();
        }
    },
    moveDownInCol:function(c){
        /*r从最后一行开始,向上遍历当前列每个元素
          到>0结束，每次递减1*/
        for(var r=this.data.length-1;r>0;r--){
        //  获得当前位置上方不为0的数的位置，保存在up中
            var up=this.getUpPrev(r,c);
        //  如果up==-1，就退出循环
            if(up==-1){break;}
            else{//  否则
        //      如果当前位置等于0
                if(this.data[r][c]==0){
        //          用up位置的值替换当前位置的值
                    this.data[r][c]=this.data[up][c];
        //          将up位置设置为0
                    this.data[up][c]=0;
                    r++;//r增1
                }else if(this.data[r][c]
                        ==this.data[up][c]){
        //      否则，如果当前位置等于up位置
        //          将当前位置*=2;
                    this.data[r][c]*=2;
        //          将up位置设置为0
                    this.data[up][c]=0;
                    this.score+=this.data[r][c];
                }
            }
        }
    },
    getUpPrev:function(r,c){
        //upR从r的上方开始，到0结束，每次递减1
        for(var upR=r-1;upR>=0;upR--){
        //    如果upR位置的值!=0，就返回upR
            if(this.data[upR][c]!=0){return upR}
        }
        return -1;//(遍历结束)返回-1
    }
}
//当页面加载后，启动游戏
window.onload=function(){
    game.start();
    //当按键按下时
    document.onkeydown=function(){
        //只有游戏运行时才响应按键操作
        if(game.state==game.RUNNING){
            var e=window.event||arguments[0];
            if(e.keyCode==37){ 
                game.moveLeft();
            }else if(e.keyCode==39){
                game.moveRight();
            }else if(e.keyCode==38){
                game.moveUp();
            }else if(e.keyCode==40){
                game.moveDown();
            }
        }
    }
}