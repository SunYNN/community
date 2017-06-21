define(function(require, exports, module) {

    var $ = require('jquery');


    require('./header.css');

    var Swiper = require('swiper');

    var Header = function() {
        this.init();
    };

    Header.prototype = {

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var that = this;

            $('.quickselect-more').on('click', function() {

                $('.slider-up').show();

            });
            $('.slider-header-icon').on('click', function() {
                $('.slider-up').hide();
            });


            var mySwiper1 = new Swiper('.slider', {
                wrapperClass: 'slider-nav',
                slideClass: 'slider-nav-list',
                freeMode: true,
                slidesPerView: 'auto',
                freeModeSticky: true,
            });
        },
        /* render: function() {
                $('.slider-up').show();
            }*/
    };

    module.exports = Header;
});