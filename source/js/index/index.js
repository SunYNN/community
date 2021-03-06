define(function(require, exports, module) {

    var $ = require('jquery');

    var Swiper = require('swiper');

    var Box = function() {
        this.init();
    };

    Box.prototype = {

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var that = this;

            var mySwiper2 = new Swiper('.focus-swiper-container', {
                wrapperClass: 'focus-swiper-wrapper',
                slideClass: 'focus-swiper-slide',
                autoplay: 3000,
                loop: true,
                pagination: '.focus-pages',
            });
        },

    };

    module.exports = Box;
});