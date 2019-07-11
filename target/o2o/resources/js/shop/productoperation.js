$(function () {
    var productId = getQueryString('productId');
    var infoUrl = '/o2o/shopadmin/getproductbyid?productId=' + productId;
    var categoryUrl = '/o2o/shopadmin/getproductcategorylist';
    var productPostUrl = '/o2o/shopadmin/modifyproduct';
    var isEdit = false;
    if (productId) {
        getInfo(productId);
        isEdit = true;
    } else {
        getCategory();
        productPostUrl = '/o2o/shopadmin/addproduct';
    }

    function getInfo(productId) {
        $.getJSON(infoUrl, function (data) {
            if (data.success) {
                var product = data.product;
                $('#product-name').val(product.productName);
                $('#product-desc').val(product.productDesc);
                $('#priority').val(product.priority);
                $('#normal-price').val(product.normalPrice);
                $('#promotion-price').val(product.promotionPrice);
                // 获取原来的商品类别以及该店铺的所有商品类别列表
                var optionHtml = '';
                var optionArr = data.productCategoryList;
                var optionSelected = product.productCategory.productCategoryId;
                // 生成HTML商品类别列表,默认选择编辑前的商品类别
                optionArr.map(function (item, index) {
                    var isSelect = optionSelected === item.productCategoryId ? 'selected' : '';
                    optionHtml += '<option data-value="' + item.productCategoryId + '"' + isSelect + '>'
                        + item.productCategoryName + '</option>';
                });
                $('#category').html(optionHtml);
            }
        });
    }
    // 为商品添加操作提供该店铺下的所有商品类别列表


    function getCategory() {
        $.getJSON(categoryUrl, function (data) {
           if (data.success) {
               var productCategoryList = data.data;
               var optionHtml = '';
               productCategoryList.map(function (item, index) {
                   optionHtml += '<option data-value="' + item.productCategoryId + '">'
                       + item.productCategoryName + '</option>';
               });
               $('#category').html(optionHtml);
           }
        });
    }
    // 控件组最后一个元素上传了图片,且控件总数不足6个则生成一个新文件上传控件
    $('.detail-img-div').on('change', '.detail-img:last-child', function () {
        if ($('.detail-img').length < 6) {
            $('#detail-img').append('<input type="file" class="detail-img">');
        }
    });
    // 提交分别对商品添加和编辑做不同响应
    $('#submit').click(function () {
        var product = {};
        product.productName = $('#product-name').val();
        product.productDesc = $('#product-desc').val();
        product.priority = $('#priority').val();
        product.normalPrice = $('#normal-price').val();
        product.promotionPrice = $('#promotion-price').val();
        product.productCategory = {
            productCategoryId: $('#category').find('option').not(function () {
                return !this.selected;
            }).data('value')
        };
        product.productId = productId;
        //获取缩略图文件流
        var thumbnail = $('#small-img')[0].files[0];
        // 生成表单对象
        var formData = new FormData();
        formData.append('thumbnail', thumbnail);
        //遍历商品详情图控件,获取文件流
        $('.detail-img').map(function (index, item) {
            //判断控件是否已选择文件
            if ($('.detail-img')[index].files.length > 0) {
                formData.append('productImg' + index, $('.detail-img')[index].files[0]);
            }
        });
        // json对象转成字符流保存到表单对象的键值对里
        formData.append('productStr', JSON.stringify(product));
        var verifyCodeActual = $('#j_captcha').val();
        if (!verifyCodeActual) {
            $.toast('请输入验证码!');
            return;
        }
        formData.append("verifyCodeActual", verifyCodeActual);
        // ajax提交到后台
        $.ajax({
            url: productPostUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    $.toast('提交成功!');
                    $('#captcha_img').click();
                } else {
                    $.toast('提交失败!');
                    $('#captcha_img').click();
                }
            }
        })
    });

});