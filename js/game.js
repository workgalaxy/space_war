document.addEventListener("DOMContentLoaded", workjs);



function alien(number)
{
	this.number = number;
	this.width = 60;
	this.height = 30;
}

function workjs()
{
	/*получаем размеры поля*/
	var war_around = document.getElementById('war_around');
	var width_around = parseInt(getComputedStyle(war_around).width);
	var height_around = parseInt(getComputedStyle(war_around).height);
	/*расчитываем количество короблей и рядов*/
	var colShip = Math.ceil(width_around/(60+20));
	var rowShip = Math.round(height_around*0.4/(30+20));
	//console.log(colShip);
	//console.log(rowShip);
	for (var i = 0; i < rowShip; i++) 
	{
		var el = document.createElement('div');
		el.className = 'ship_row';
		for (var i2 = 0; i2 < colShip; i2++) {
			var ship_b = document.createElement('div');
			ship_b.className = 'ship_cell';
			el.appendChild(ship_b);
		}
		war_around.appendChild(el);
	}
	var tank = document.createElement('div');
	tank.innerHTML = '<div id="tancer"><img id="tankF" src="img/tank.jpg" alt=""></div>';
	//alert(tank.innerHTML)
	war_around.appendChild(tank);

	// двигаем каретку за мышкой
	var moving = document.getElementById('tankF');
	var posTankx = parseInt(getComputedStyle(moving).width) / 2;
	war_around.addEventListener('mousemove', function(e)
		{
			moving = document.getElementById('tankF');
			posTankx = parseInt(getComputedStyle(moving).width) / 2;
			moving.style.marginLeft = (+e.pageX-((parseInt(getComputedStyle(document.body).width))-width_around)/2)-posTankx+'px';

		});
	// разрабатываем стрельбу
	var bomMass = new Array();
	war_around.addEventListener('click', function(e)
		{
			var bom = document.createElement('img');
			bom.src = 'img/bom.png';
			bom.className = 'bom';
			var dd = war_around.appendChild(bom);
			dd.style.marginLeft = (+e.pageX-((parseInt(getComputedStyle(document.body).width))-width_around)/2)+'px';
			var intervalBom = setInterval(function(){dd.style.marginTop = (parseInt(getComputedStyle(dd).marginTop))-2+'px'},0);
			bomMass.push({objS: dd, evenS: intervalBom});
			//alert(bomMass.length);
		});
	// удаляем бомбу и вызрываем корабль
	//setTimeout(function(){alert(bomMass.length)},5000);
	setInterval(function(){
		for(var i = 0; i < bomMass.length; i++) 
		{
			//alert(bomMass[i].objS.src);
			if (parseInt(getComputedStyle(bomMass[i].objS).marginTop) < -500) {
				clearInterval(bomMass[i].evenS);
			}
		}
			//clearInterval(timerId).
	} ,0);

}
