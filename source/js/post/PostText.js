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
            $('.addcover-classify-val').on('click', function() {

                $('.choose-classify').addClass('choose-classify-show');

              

            });
            $('.list-name').click(function() {

                if ($(this).siblings().hasClass('fn-hide')) {
                    $(this).find('.icon').html('&#xe605;');
                } else {
                    $(this).find('.icon').html('&#xe606;');
                }
                $(this).next().hasClass('fn-hide') ? $(this).next().removeClass('fn-hide') : $(this).next().addClass('fn-hide');
            });
            $('.list-num a').on('click', function() {
                console.log("111")
               $(this).addClass('car_color');
               $(this).parent().siblings().find('a').removeClass('car_color');
               var carid=$('.car_color').attr('data-carid');
               console.log(carid);
               that.carid =carid;
               var carhtml=$('.car_color').html();
               console.log(carhtml);
               that.carhtml=carhtml;
               htmls='';
               htmls+='<span data-carid="'+carid+'">'+carhtml+'</span><i class="icon addcover-classify-icon">&#xe603;</i>'
               $('.addcover-classify-val').html(htmls);

            });
            
            $('.confirm').on('click',function(){
                $('.choose-classify').removeClass('choose-classify-show');
            })
            var h = 0; //设置一个变量
            //window.h = 0;
            $('.addcover-text').on('click', function() {
                h += 1; //第单击一次i的值加1
                $(this).attr("addval", h);
                that.addcovertext();
                that.sort();
                that.iid
            });
            $('.addcover-picture').on('click', function() {
                //console.log(h);
                h += 1; //第单击一次i的值加1
                $(this).attr("addval", h);
                $(".file-input-one").off();
                $(".file-input-one").change(function(e) {
                    that.UpLoad();
                });
                //console.log(h);
                that.sort();
                //console.log(h);
            });


            $('form').on('click', '.addto-text-upicon', function() {
                var aa = $(this).parents('.addto-text');
                if (aa.length > 0) {
                    var k = $(this).parents('.addto-text').attr('data-id');
                    $(this).parents('.addto-text').attr('data-id', k - 1);
                } else {
                    var k = $(this).parents('.addto-picture').attr('data-id');
                    $(this).parents('.addto-picture').attr('data-id', k - 1);
                }
                that.sort();
            });
            $('form').on('click', '.addto-text-downicon', function() {
                var aa = $(this).parents('.addto-text');
                if (aa.length > 0) {

                    var k = $(this).parents('.addto-text').attr('data-id');
                    $(this).parents('.addto-text').attr('data-id', Number(k) + 1);
                } else {

                    var k = $(this).parents('.addto-picture').attr('data-id');
                    $(this).parents('.addto-picture').attr('data-id', Number(k) + 1);
                }
                that.sort();
            });
            $('form').on('click', '.addto-text-closeicon', function() {
                var aa = $(this).parents('.addto-text');
                if (aa.length > 0) {
                    if (confirm('是否删除此版块?')) {
                        $(this).parents('.addto-text').remove();
                        console.log('删除.');
                    }
                } else {
                    if (confirm('是否删除此版块?')) {
                        $(this).parents('.addto-picture').remove();
                        console.log('删除.');
                    }
                }
            });
            $('form').on('click', '.addto-picturebox-setcover', function() {
                var count = $('.addto-picturebox-intocover').length;
                if (count > 0) {
                    confirm('已经设置封面')
                    console.log("yijingyou")
                } else {
                    console.log("meiyyou")
                    var coverhtml = '';
                    $(this).after('<div class="addto-picturebox-intocover"><i class="icon addto-picturebox-intocover-checkicon">&#xe600;</i>封面</div>');
                    $(this).remove();
                }
            });
            $('form').on('click', '.addto-picturebox-intocover', function() {
                var coverhtml = '';
                $(this).after('<div class="addto-picturebox-setcover">设为封面</div>');
                $(this).remove();

            });
        },
        addcovertext: function() {
            var that = this;
            var texthtml = '';
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
            //console.log("111")
            var that = this;
            var picturehtml = "";
            var base64 = $('.base').attr('data-base');
            var imgUrlInput = $('.imgUrl').val();
            var dataId = $('.addcover-picture').attr('addval');
            picturehtml += '<div class="addto-picture"  data-id="' + dataId + '">' +
                '<div class="addto-text-h2">' +
                '<i class="addto-text-upicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3dd97d0180887b7c-200w-200h.png"></i>' +
                '<i class="addto-text-downicon fl"><img src="http://i1.dd-img.com/assets/image/1498100345-3b7b4997430f46b7-200w-200h.png"></i>' +
                '<span class="addto-texts fl">调整排序' + dataId + '</span>' +
                '<i class="addto-text-closeicon icon fr">&#xe601;</i>' +
                '</div>' +
                '<div class="addto-picturebox">' +
                '<input type="hidden" id="imgUrl_1" class="imgUrl" name="pics[]" value="' + imgUrlInput + '">' +
                '<img src="' + base64 + '" alt="">' +
                '<div class="addto-picturebox-text">' +
                '<input type="text" placeholder="添加注释" value="添加注释">' +
                '</div>' +
                '<div class="addto-picturebox-setcover">设为封面</div>' +
                '</div>' +
                '</div>';
            $('.addcover-bottom').after(picturehtml);
            that.sort();
        },
        sort: function() {
            var aDiv = document.querySelectorAll(".addto-text,.addto-picture");
            var arr = [];
            for (var i = 0; i < aDiv.length; i++) {
                arr.push(aDiv[i]); //aDiv是元素的集合，并不是数组，所以不能直接用数组的sort进行排序。
            }
            arr.sort(function(a, b) {
                return b.getAttribute('data-id') - a.getAttribute('data-id')
            });

            //console.log(arr);
            for (var i = 0; i < arr.length; i++) {
                $('.addcover-bottom').after(arr[i]); //将排好序的元素重新排列
            }

        },
        UpLoad: function(e) {
            //console.log('1122333444');
            var that = this;
            var f = document.querySelector("#file-input-one").files[0];
            fileType = f.type;
            var baseBox = $('.base');
            var imgUrlInput = $('.imgUrl');
            var Orientation = '';
            if (/image\/\w+/.test(fileType)) {
                var fileReader = new FileReader();
                EXIF.getData(f, function() {
                    // alert(EXIF.pretty(this));  
                    EXIF.getAllTags(this);
                    //alert(EXIF.getTag(this, 'Orientation'));   
                    Orientation = EXIF.getTag(this, 'Orientation');
                });
                fileReader.readAsDataURL(f);
                fileReader.onload = function(event) {
                    var result = event.target.result; //返回的dataURL
                    // var image = new Image();
                    // image.src = result;
                    //若图片大小大于1M，压缩后再上传，否则直接上传
                    var maxW = 1200;
                    var maxH = 1000;
                    var rat = maxW / maxH;
                    var image = new Image();
                    image.src = result; //;e.target.result;  
                    image.onload = function() {
                        var expectWidth = this.naturalWidth;
                        var expectHeight = this.naturalHeight;
                        if (this.naturalWidth > this.naturalHeight && this.naturalWidth > maxW) {
                            expectWidth = maxW;
                            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                        } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > maxH) {
                            expectHeight = maxH;
                            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                        }
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = expectWidth;
                        canvas.height = expectHeight;
                        //console.log(canvas.width+':'+canvas.height);
                        ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                        var base64 = null;
                        //修复ios  
                        if (navigator.userAgent.match(/iphone/i)) {
                            //console.log('iphone');  
                            //alert(expectWidth + ',' + expectHeight);  
                            //如果方向角不为1，都需要进行旋转 added by lzk  
                            if (Orientation != "" && Orientation != 1) {
                                //alert('旋转处理');  
                                switch (Orientation) {
                                    case 6: //需要顺时针（向左）90度旋转  
                                        //alert('需要顺时针（向左）90度旋转');  
                                        that.rotateImg(this, 'left', canvas);
                                        break;
                                    case 8: //需要逆时针（向右）90度旋转  
                                        //alert('需要顺时针（向右）90度旋转');  
                                        that.rotateImg(this, 'right', canvas);
                                        break;
                                    case 3: //需要180度旋转  
                                        //alert('需要180度旋转');  
                                        that.rotateImg(this, 'right', canvas); //转两次  
                                        that.rotateImg(this, 'right', canvas);
                                        break;
                                }
                            }
                            base64 = canvas.toDataURL(fileType, 0.8);
                        } else if (navigator.userAgent.match(/Android/i)) { // 修复android  
                            var canvas = document.getElementById("canvas");
                            canvas.width = this.width;
                            canvas.height = this.height; //计算等比缩小后图片宽高
                            var ctx = canvas.getContext('2d');
                            var expectHeight = this.naturalHeight;
                            console.log(canvas.width + '/' + canvas.height);
                            //等比压缩
                            if (canvas.width / canvas.height > rat) {
                                if (canvas.width > maxW) {
                                    canvas.width = maxW;
                                    canvas.height = parseInt((canvas.height * maxW) / this.width);
                                }
                            } else {
                                if (canvas.height > maxH) {
                                    canvas.height = maxH;
                                    canvas.width = parseInt((canvas.width * maxH) / this.height);
                                } else {}
                            }
                            console.log(canvas.width + '=>' + canvas.height);
                            ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
                            base64 = canvas.toDataURL(fileType, 0.8); //重新生成图片
                            // var encoder = new JPEGEncoder();  
                            // base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);  
                        } else {
                            //alert(Orientation);  
                            if (Orientation != "" && Orientation != 1) {
                                //alert('旋转处理');  
                                switch (Orientation) {
                                    case 6: //需要顺时针（向左）90度旋转  
                                        //alert('需要顺时针（向左）90度旋转');  
                                        that.rotateImg(this, 'left', canvas);
                                        break;
                                    case 8: //需要逆时针（向右）90度旋转  
                                        //alert('需要顺时针（向右）90度旋转');  
                                        that.rotateImg(this, 'right', canvas);
                                        break;
                                    case 3: //需要180度旋转  
                                        //alert('需要180度旋转');  
                                        that.rotateImg(this, 'right', canvas); //转两次  
                                        that.rotateImg(this, 'right', canvas);
                                        break;
                                }
                            }
                            base64 = canvas.toDataURL(fileType, 0.8);
                        }
                        var postData = base64.replace("data:" + fileType + ";base64,", '');
                        // 图片赋值
                        baseBox.attr("data-base", base64);
                        that.addcoverpicture();
                        $.post('/live/ajax/', {
                            opt: 'upload',
                            base64Img: postData,
                            fileType: fileType,
                            rnd: Math.random()
                        }, function(result) {
                            if (result.match("^\{(.+:.+,*){1,}\}$")) {
                                result = $.parseJSON(result);
                                if (result.code == 200) {
                                    imgUrlInput.val(result.data);
                                    //preViewImg.attr('src', result.data);
                                    that.sort();
                                } else {
                                    alert(result.msg);
                                }
                            } else {
                                alert('上传出错, 返回格式不正确');
                            }
                        });
                    };

                }
            } else {
                alert("请选择图片");
            };
        },
        //对图片旋转处理 added by lzk  
        rotateImg: function(img, direction, canvas) {
            //alert(img);  
            //最小与最大旋转方向，图片旋转4次后回到原方向    
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);    
            if (img == null) return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
            var height = img.height;
            var width = img.width;
            //var step = img.getAttribute('step');    
            var step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值    
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //img.setAttribute('step', step);    
            var canvas = document.getElementById('pic_' + pid);
            if (canvas == null) {
                img.style.display = 'none';
                canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'pic_' + pid);
                img.parentNode.appendChild(canvas);
            }
            //旋转角度以弧度值为参数    
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        }



    };

    module.exports = Box;
});