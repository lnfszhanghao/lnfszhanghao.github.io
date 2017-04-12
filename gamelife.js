
var inputcount=0;
var n=20,z=50,p=30;
window.onload=function(){
	var canvas =document.getElementById("gameCanvas")
	var context=canvas.getContext("2d");
	drawLines(canvas,context);
	var button=document.getElementById("randomButton");
	button.onclick=inputlife;
	var button1=document.getElementById("startButton")
	button1.onclick=autolife;
	var button2=document.getElementById("resetButton")
	button2.onclick=resetlife;
	var button3=document.getElementById("pauseButton")
	button3.onclick=pauselife;
}
//画网格
function drawLines(canvas,context){
	context.fillStyle="#000000";
	var positionX=[];
	for(var i=0;i<n;i++){
		positionX[i]=i*20;
	}
	var positionY=[];
	for(var j=0;j<n;j++){
		positionY[j]=j*20;
	}
	for(var k=0;k<n;k++){
		for(var l=0;l<n;l++){
			context.fillRect(positionX[k],positionY[l],20,20);
			context.clearRect(positionX[k]+1,positionY[l]+1,18,18);
		}
	}
}
//初始化数组
var firstGeneration = new Array();
for (var i = 0; i < z; i++) {
  firstGeneration[i]=new Array();
  for (var j = 0; j < z; j++) {
  	firstGeneration[i][j]=0;
  }
}
var nextGeneration = new Array();
for (var i = 0; i < z; i++) {
  nextGeneration[i]=new Array();
  for (var j = 0; j < z; j++) {
  	nextGeneration[i][j]=0;
  }
}
//展示画图
function displaylife(life){
	var canvas =document.getElementById("gameCanvas")
	var context=canvas.getContext("2d");
	for (var i = 0; i < p; i++) {
		for (var j = 0; j < p; j++) {
		if (life[i][j]==1){
			context.fillStyle="#FF0000";
			context.fillRect(i*20+1,j*20+1,18,18);
		} else if (life[i][j]==0) {
			context.fillStyle="#FFFFFF";
			context.fillRect(i*20+1,j*20+1,18,18);
		}
		}
	}
}
//随机初始赋值
function inputlife(){
	for (var i = 0; i < z; i++) {
		for (var j = 0; j < z; j++) {
		firstGeneration[i][j]=Math.round(Math.random()*0.6);
		}
	}
	displaylife(firstGeneration);
	inputcount++;
}
//生存规则
function evolutionlife(life){
	var nextround=new Array()
	for (var i = 0; i < z; i++) {
		nextround[i]=new Array();
		for (var j = 0; j < z; j++) {
			nextround[i][j]=0;
		}
	}
	for (var i = 1; i < z-1; i++) {
		for (var j = 1; j < z-1; j++) {
  		var count=life[i-1][j]+life[i+1][j]+life[i][j-1]+life[i][j+1]+life[i+1][j+1]+life[i+1][j-1]+life[i-1][j+1]+life[i-1][j-1];
  		//console.log(count);
  			if (life[i][j]== 1 && count == 2) {
  			//if (life[i][j]== 0 && count == 3) {
  			nextround[i][j]=1;
  			}
  			else if (count==3) {
  			//else if (life[i][j] == 1 && (count == 2 || count == 3)) {
  				nextround[i][j]=1;
  			}else{
  				nextround[i][j]=0;
  			}
  	    }	
	}
	for (var i = 0; i < z; i++) {
		for (var j = 0; j < z; j++) {
			nextGeneration[i][j]=nextround[i][j];
		}
	}
	return nextround;
}
//自动演化
function autolife(){
	if(inputcount==0){
		inputlife();
		displaylife(evolutionlife(firstGeneration));
		setInterval(function(){
			displaylife(evolutionlife(nextGeneration));
		},z);
	} else {
		displaylife(evolutionlife(firstGeneration));
		setInterval(function(){
			displaylife(evolutionlife(nextGeneration));
		},z);
	}
}
//重置
function resetlife(){
	return window.location.reload()
}
//暂停
var ss=setInterval(function(){
			displaylife(evolutionlife(nextGeneration));},z);
function pauselife(){
	return clearInterval(ss)
}