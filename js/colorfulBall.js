let canvas = document.getElementsByTagName("canvas")[0];
if(!canvas){
	canvas = document.createElement("canvas");
	canvas.setAttribute("id", "canvas");
	document.body.appendChild(canvas);
}
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
});
var ctx = canvas.getContext('2d');
var ballNum = 300;//С��ĸ���
var balls = [];//���С�����Ϣ������
var mouseX = 0;//����x��λ��
var mouseY = 0;//���y���λ��
canvas.style = {
	position:"absolute",
	top: "0",
	left: "0"
}
createBall();
//�����ƶ���ʱ��
setInterval(move, 20);
//������ƶ��¼�
document.addEventListener('mousemove', function(e){
	var event = e || window.event;
	mouseX = event.x;
	mouseY = event.y;
}, false);

//С���ƶ�����
function move(){
	//������ջ���
	ctx.clearRect(0, 0, width, height);
	for(var i = 0; i < ballNum; i++){//����ÿ��С��
		balls[i].x += balls[i].sx;
		balls[i].y += balls[i].sy;
		//��������߽�,���ٶ�ȡ��
		if(balls[i].x < 0 ||balls[i].x > width){
			balls[i].sx = -balls[i].sx;
		}
		if(balls[i].y < 0 ||balls[i].y > width){
			balls[i].sy = -balls[i].sy;
		}
		//�������������һ����Χ��,��뾶���
		if(Math.pow(balls[i].x - mouseX, 2) + Math.pow(balls[i].y - mouseY, 2) <= 20000){
			balls[i].r = 50;
		}else{
			if(balls[i].r >= balls[i].r1){
				balls[i].r --;
			}
		}
		drawBall(balls[i].x, balls[i].y, balls[i].r, balls[i].color);
	}

}
//����С��
function createBall(){
	for(var i = 0; i < ballNum; i++){
		balls[i] = {};
		var R = Math.floor(Math.random()*255);
		var G = Math.floor(Math.random()*255);
		var B = Math.floor(Math.random()*255);	
		balls[i].x = Math.random()*width;
		balls[i].y = Math.random()*height;
		balls[i].r = Math.random()*20 + 5;
		balls[i].sx = Math.random()*2 - 1;
		balls[i].sy = Math.random()*2 - 1;
		balls[i].r1 = balls[i].r;
		balls[i].color = 'rgb('+ R +','+ G +','+ B +')';
		drawBall(balls[i].x, balls[i].y, balls[i].r, balls[i].color);
	}
}
//��С����
function drawBall(x, y, r, color){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, r, 0, Math.PI*2);
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}
