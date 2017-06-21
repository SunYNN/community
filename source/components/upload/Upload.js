define(function(require, exports, module) {

    var $ = require('jquery');
    require('./upload.css');

    var Upload = function() {
        this.init();
    };

    Upload.prototype = {

        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            var that = this;
            function loadUpload() {
                var ispic = $('input[name="isPic"]:checked').val();
            }
            function addPic() {
                if ($('input[name="pics[]"]').length < 9) {
                    var html = '';
                    html += '<div class="upload-item">';
                    html += '            <input type="file" name="headpic[]" class="headpicinput_1" id="headpicinput_1" style="display: none;" onchange="UpLoad(this)">';
                    html += '            <input type="hidden" id="imgUrl_1" class="imgUrl" name="pics[]" value="">';
                    html += '            <div id="" class="cell cell_1">';
                    html += '                <a href="javascript:void(0);"><img src="http://i1.dd-img.com/assets/image/1495764543-95352fde674ead19-200w-200h.png" id="preViewImg_1" class="preViewImg"></a>';
                    html += '                ';
                    html += '            </div>';
                    html += '        </div>';
                    $('#image_div').append('<input type="text" name="pics[]" id="pics[]" value="" style="width:100%" />');
                } else {
                    alert('最多可以上传9张图片');
                }
            }
            $(function() {
                $('input[name="isPic"]').bind('click', loadUpload);
                $('#addBtn').bind('click', addPic);
                //监听上传
                $('.upload-item a').bind('click', function() {
                    $(this).parent().parent().find('input[name="headpic[]"]').click();
                })
            });

            function UpLoad(e) {
                var f = e.files[0];

                fileType = f.type;
                console.log(f);
                var parent = $(e).parents('.upload-item');

                var imgUrlInput = parent.find('.imgUrl');
                var preViewImg = parent.find('.preViewImg');
                var imgUrl = parent.find('.imgUrl');
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
                                            rotateImg(this, 'left', canvas);
                                            break;
                                        case 8: //需要逆时针（向右）90度旋转  
                                            //alert('需要顺时针（向右）90度旋转');  
                                            rotateImg(this, 'right', canvas);
                                            break;
                                        case 3: //需要180度旋转  
                                            //alert('需要180度旋转');  
                                            rotateImg(this, 'right', canvas); //转两次  
                                            rotateImg(this, 'right', canvas);
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
                                    } else {

                                    }
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
                                            rotateImg(this, 'left', canvas);
                                            break;
                                        case 8: //需要逆时针（向右）90度旋转  
                                            //alert('需要顺时针（向右）90度旋转');  
                                            rotateImg(this, 'right', canvas);
                                            break;
                                        case 3: //需要180度旋转  
                                            //alert('需要180度旋转');  
                                            rotateImg(this, 'right', canvas); //转两次  
                                            rotateImg(this, 'right', canvas);
                                            break;
                                    }
                                }

                                base64 = canvas.toDataURL(fileType, 0.8);

                            }
                            var postData = base64.replace("data:" + fileType + ";base64,", '');
                            // 图片赋值
                            preViewImg.attr("src", base64);

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
                }
            }

        },

    };

    module.exports = Upload;
});