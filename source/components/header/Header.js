define(function(require, exports, module) {

    var $ = require('jquery');

    require('./header.css');

    var Header = function() {
        this.init();
    };

    Header.prototype = {

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var context = this;

            $('.header').on('click', function() {
                context.render();
            });
        },

        render: function() {
            $('.header').html('这里是header');
        }
    };

    module.exports = Header;
});