define(function(require, exports, module) {

	var $ = require('jquery');
	var Swiper = require('swiper');


	var PostDynamic = function() {
		this.init();
	};

	PostDynamic.prototype = {

		init: function() {
			this.bindEvent();
		},

		bindEvent: function() {
			var context = this;

			var mySwiper3;

			$('.classify-choose').on('click', function() {
				context.choose();
			});
			$('.list-name').click(function() {

				if ($(this).siblings().hasClass('fn-hide')) {
					$(this).find('.icon').html('&#xe605;');
				} else {
					$(this).find('.icon').html('&#xe606;');
				}
				$(this).next().hasClass('fn-hide') ? $(this).next().removeClass('fn-hide') : $(this).next().addClass('fn-hide');
			});
			//表情
			$('.emotion').on('click', function() {
				$(this).toggleClass('emotionblue')
				$('.facebox').toggleClass('faceboxshow');
				
				mySwiper3 = new Swiper('.facebox-container', {
				wrapperClass: 'facebox-wrapper',
				slideClass: 'facebox-slider',
				pagination: '.facebox-pages',
			});
			mySwiper3.reInit();
			 //displaySwiper.destroy(true);
			})
			$('.facebox-container li').on('click', function() {
				var val = $(this).attr("data-val");
				console.log(val);
				$('#saytext').append(val);


			});


		},

		choose: function() {
			$('.choose-classify').removeClass('hide');
			$('.main-wrap').addClass('hide');
		},
	

	};



	module.exports = PostDynamic;
});