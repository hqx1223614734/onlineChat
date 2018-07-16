
		var canvas = document.getElementById("canvas");
		if(!canvas){
			canvas = document.createElement("canvas");
			canvas.id = "canvas";
			document.body.appendChild(canvas);
		}
		var width = canvas.width = window.innerWidth;
		var height = canvas.height = window.innerHeight;
		var ctx = canvas.getContext('2d');
		var data = [];//��������
		var num = 250;//��������
		var mouseX = 0;//���X������
		var mouseY = 0;//���y������
		init();
		//��ʼ������
		function init(){
			//������ƶ�����
			document.addEventListener('mousemove', function(e){
				var e = e || window.event;
				mouseX = e.x;
				mouseY = e.y;
			}, false);
			createGrain();
			setInterval(move, 20);	
		}
		//���崴�����Ӻ���
		function createGrain(){
			for (var i = 0; i < num; i++) {
				data[i] = {};
				data[i].x = Math.random()*width;
				data[i].y = Math.random()*height;
				data[i].sx = -Math.random()*1.0 + 0.5;
				data[i].sy = -Math.random()*1.0 + 0.5;
				drawArc(data[i].x, data[i].y);
			}
		}
		//���������ƶ�����
		function move(){
			var len = data.length;
			ctx.clearRect(0, 0, width, height);
			for(var i = 0; i < len; i++){
				data[i].x += data[i].sx;
				data[i].y += data[i].sy;
				//�ж��Ƿ���ײ�߽�
				if(data[i].x < 0 || data[i].x > width){
					data[i].sx = -data[i].sx;
				}
				if(data[i].y < 0 || data[i].y > height){
					data[i].sy = -data[i].sy;
				}
				//�ж������ľ���
				// if(Math.pow(data[i].x - mouseX, 2) + Math.pow(data[i].y - mouseY, 2) <= 20000){
				// 	drawLine(data[i].x, data[i].y, mouseX, mouseY, 'rgba(255,255,255,.3)');
				// 	// data[i].x -= data[i].sx;
				// 	// data[i].y -= data[i].sy;
				// 	//�涨�������ľ���
				// 	if(data[i].x <= mouseX){
				// 		if(data[i].sx < 0){
				// 			data[i].sx = -data[i].sx;
				// 		}
				// 	}else{
				// 		if(data[i].sx > 0){
				// 			data[i].sx = -data[i].sx;
				// 		}
				// 	}
				// 	if(data[i].y <= mouseY){
				// 		if(data[i].sy < 0){
				// 			data[i].sy = -data[i].sy;
				// 		}
				// 	}else{
				// 		if(data[i].sy > 0){
				// 			data[i].sy = -data[i].sy;
				// 		}
				// 	}
				// 	if(Math.pow(data[i].x - mouseX, 2) + Math.pow(data[i].y - mouseY, 2) <= 19000){
				// 			data[i].sx = -data[i].sx;
				// 			data[i].sy = -data[i].sy;
				// 	}
				// }
				//�ж����������,���С��ĳֵ,������
				for(var j = i + 1; j < len; j++){
					if(Math.pow(data[i].x - data[j].x, 2) + Math.pow(data[i].y - data[j].y, 2) <= 2000){
						drawLine(data[i].x, data[i].y, data[j].x, data[j].y);
					}
				}
				drawArc(data[i].x, data[i].y);
			}
		}
		//��Բ����
		function drawArc(x, y){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = 'rgba(255,255,255,.3)';
			ctx.arc(x, y, 1, 0, Math.PI*2);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}
		//���ߺ���
		function drawLine(x0, y0, x1, y1, color){
			ctx.strokeStyle = color || 'rgba(255,255,255,.1)';
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.stroke();
			ctx.closePath();
			ctx.restore();
		}