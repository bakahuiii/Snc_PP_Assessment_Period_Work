var iUp = (function () {
	var t = 0,
		d = 150,
		clean = function () {
			t = 0;
		},
		up = function (e) {
			setTimeout(function () {
				$(e).addClass("up")
			}, t);
			t += d;
		},
		down = function (e) {
			$(e).removeClass("up");
		},
		toggle = function (e) {
			setTimeout(function () {
				$(e).toggleClass("up")
			}, t);
			t += d;
		};
	return {
		clean: clean,
		up: up,
		down: down,
		toggle: toggle
	}
})();

/*function getBingImages(imgUrls) {
	var indexName = "bing-image-index";
	var index = sessionStorage.getItem(indexName);
	var $panel = $('#panel');
	if (isNaN(index) || index == 7) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "https://bing.com" + imgUrl;
	$panel.css("background", "url('" + url + "') center center no-repeat #666");
	$panel.css("background-size", "cover");
	sessionStorage.setItem(indexName, index);
}*/
var index;
function getBingImages(imgUrls) {
	var indexName = "bing-image-index";
	 index = sessionStorage.getItem(indexName);
	var $panel = $('#panel');
	if ( index == 5 ) index = 0;
	else index++;
	var imgUrl = imgUrls[index];
	var url = "/static/img" + imgUrl;
	$panel.css("background", "url('" + url + "') center center no-repeat #666");
	$panel.css("background-size", "cover");
	sessionStorage.setItem(indexName, index);
}
$(document).ready(function () {
	// 获取一言数据
	$.get(res = '/static/js/1/1.txt', function (res) {
		var bdy=new Array();
		var frm=new Array();
		bdy[1] = '因为一直自我麻痹 才会被微小的希望所欺骗'
		frm[1] = 'ソラゴト--明透'
		bdy[2] = '为何我唯独认为那段逝去的时光美丽呢 为何我还对那早已放手的憎恨感到依依不舍呢'
		frm[2] = 'なぜ--カンザキイオリ'
		bdy[3] = '为何我心中愈是认为你可爱 我便会愈加丑陋呢'
		frm[3] = 'なぜ--カンザキイオリ'
		bdy[4] = '从现在开始 我准备好了成为一个不成熟的大人。'
		frm[4] = '17さいのうた。--『ユイカ』'
		bdy[5] = '对你说什么才是正确的呢？ 能拯救你的话语是什么呢？'
		frm[5] = '月がない街--Guiano/初音ミク'
		bdy[6] = '我想知道雪为什么冰冷 想知道你为什么想死'
		frm[6] = '月がない街--Guiano/初音ミク'
		bdy[7] = 'If you are with me, then everything is alright'
		frm[7] = 'Everything is Alright--《去月球》主题曲'
		bdy[0] = '正确的东西就要以正确的形式存在 不想死就活下去。'
		frm[0] = '命に嫌われている--カンザキイオリ'
		$('#description').html(bdy[index] + "<br/> -「<strong>" + frm[index] + "</strong>」")
	});

	$(".iUp").each(function (i, e) {
		iUp.up(e);
	});
	$(".js-avatar")[0].onload = function () {
		$(".js-avatar").addClass("show");
	}

});

$('.btn-mobile-menu__icon').click(function () {
	if ($('.navigation-wrapper').css('display') == "block") {
		$('.navigation-wrapper').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$('.navigation-wrapper').toggleClass('visible animated bounceOutUp');
			$('.navigation-wrapper').off('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
		});
		$('.navigation-wrapper').toggleClass('animated bounceInDown animated bounceOutUp');

	} else {
		$('.navigation-wrapper').toggleClass('visible animated bounceInDown');
	}
	$('.btn-mobile-menu__icon').toggleClass('social iconfont icon-list social iconfont icon-angleup animated fadeIn');
});
