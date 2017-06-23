define(function(require, exports, module) {

    var $ = require('jquery');

    var Box = function() {
        this.init();
    };

    Box.prototype = {

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var that = this;
            var h = 0; //设置一个全局的变量
            $('.addcover-text').on('click', function() {
                h += 1; //第单击一次i的值加1
                $(this).attr("addval", h);
                that.addcovertext();
                that.sort();
            })
            $('.addcover-picture').on('click', function() {
                h += 1; //第单击一次i的值加1
                $(this).attr("addval", h);
                that.addcoverpicture();
                that.sort();

            });

            $('form').on('click', '.addto-text-upicon', function() {
                var aa = $(this).parents('.addto-text');
                console.log(aa.length);
                if (aa.length > 0) {
                    console.log("wenzi");

                    var k = $(this).parents('.addto-text').attr('data-id');
                    $(this).parents('.addto-text').attr('data-id', k - 1);
                } else {

                    var k = $(this).parents('.addto-picture').attr('data-id');
                    $(this).parents('.addto-picture').attr('data-id', k - 1);
                    console.log("tupian");
                }

                that.sort();

            });
            $('form').on('click', '.addto-text-downicon', function() {
                var aa = $(this).parents('.addto-text');

                console.log(aa.length);
                if (aa.length > 0) {
                    console.log("wenzi");

                    var k = $(this).parents('.addto-text').attr('data-id');
                    $(this).parents('.addto-text').attr('data-id', Number(k) + 1);
                } else {

                    var k = $(this).parents('.addto-picture').attr('data-id');
                    $(this).parents('.addto-picture').attr('data-id', Number(k) + 1);
                    console.log("tupian");
                }



                that.sort();
            });
            $('form').on('click', '.addto-text-closeicon', function() {
                if (confirm('是否删除此版块?')) {
                    $(this).parents('.addto-text').remove();
                    console.log('删除.');
                }


            });

        },
        addcovertext: function() {
            var that = this;
            var texthtml = "";
            var dataId = $('.addcover-text').attr('addval');
            texthtml += '<div class="addto-text" data-id="' + dataId + '">' +
                '<div class="addto-text-h2">' +
                '<i class="addto-text-upicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3dd97d0180887b7c-200w-200h.png"></i>' +
                '<i class="addto-text-downicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3b7b4997430f46b7-200w-200h.png"></i>' +
                '<span class="addto-texts fl">调整排序' + dataId + '</span>' +
                '<i class="addto-text-closeicon icon fr">&#xe601;</i>' +
                '</div>' +
                '<div class="addto-textbox">' +
                '<textarea class="addto-textbox-textarea" name="textarea"  placeholder="请输入文字"></textarea>' +
                '</div>' +
                '</div>';
            $('.addcover-bottom').after(texthtml);


        },
        addcoverpicture: function() {
            var that = this;
            var picturehtml = "";
            var dataId = $('.addcover-picture').attr('addval');
            picturehtml += '<div class="addto-picture"  data-id="' + dataId + '">' +
                '<div class="addto-text-h2">' +
                '<i class="addto-text-upicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3dd97d0180887b7c-200w-200h.png"></i>' +
                '<i class="addto-text-downicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3b7b4997430f46b7-200w-200h.png"></i>' +
                '<span class="addto-texts fl">调整排序' + dataId + '</span>' +
                '<i class="addto-text-closeicon icon fr">&#xe601;</i>' +
                '</div>' +
                '<div class="addto-picturebox">' +
                '<img src="http://bbs.diandong.com/data/attachment/forum/201704/17/201136lfges4b4itff2xoi.jpg" alt="">' +
                '<div class="addto-picturebox-text">' +
                '<input type="text" placeholder="添加注释" value="添加注释">' +
                '</div>' +
                '<div class="addto-picturebox-setcover">设为封面</div>' +
                '<div class="addto-picturebox-intocover"><i class="icon addto-picturebox-intocover-checkicon">&#xe600;</i>封面</div>' +
                '</div>' +
                '</div>';
            $('.addcover-bottom').after(picturehtml);
        },
        sort: function() {
            var aDiv = document.querySelectorAll(".addto-text,.addto-picture");
            // var aDiv = $("body div[data-id]");
            //console.log(aDiv);
            var arr = [];
            for (var i = 0; i < aDiv.length; i++) {
                arr.push(aDiv[i]); //aDiv是元素的集合，并不是数组，所以不能直接用数组的sort进行排序。
            }
            arr.sort(function(a, b) {
                return b.getAttribute('data-id') - a.getAttribute('data-id')
            });
            for (var i = 0; i < arr.length; i++) {
                $('.addcover-bottom').after(arr[i]); //将排好序的元素重新排列
            }

        },

    };

    module.exports = Box;
});