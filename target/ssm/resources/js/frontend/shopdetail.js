$(function () {
    var loading = false;
    // 分页允许返回的最大条数
    var maxItems = 20;
    // 每页返回的最大条数
    var pageSize = 3;
    // 列出商品列表的url
    var listUrl = '/o2o_war_exploded/frontend/listproductsbyshop';
    var pageNum = 1;
    var shopId = getQueryString('shopId');
    var productCategoryId = '';
    var productName = '';
    var searchDivUrl = '/o2o_war_exploded/frontend/listshopdetailpageinfo?shopId=' + shopId;
    // 渲染出店铺类别列表以及区域列表以供搜索
    getSearchDivData();
    // 预先加载10条店铺信息
    addItems(pageSize, pageNum);
    // 兑换礼品的url
    // $('#exchangelist').attr('href', '/o2o_war_exploded/frontend/awardlist?shopId=' + shopId);
    function getSearchDivData() {
        var url = searchDivUrl;
        $.getJSON(url, function (data) {
             if (data.success) {
                var shop = data.shop;
                 $('#shop-cover-pic').attr('src', shop.shopImg);
                 $('#shop-update-time').html(Format(new Date(shop.lastEditTime), '-'));
                 $('#shop-name').html(shop.shopName);
                 $('#shop-desc').html(shop.shopDesc);
                 $('#shop-addr').html(shop.shopAddr);
                 $('#shop-phone').html(shop.phone);
                 // 获取后台返回的店铺的商品列表
                 var productCategoryList = data.productCategoryList;
                var html = '';
                productCategoryList.map(function (item, index) {
                    html += '<a href="#" class="col-33 button" data-category-id="'
                        + item.productCategoryId + '">' + item.productCategoryName + '</a>';
                });
                $('#shopdetail-button-div').html(html);
            }
        })
    }
    function addItems(pageSize, pageIndex) {
        var url = listUrl + '?' + 'pageIndex=' + pageIndex + '&pageSize=' + pageSize
            + '&productCategoryId=' + productCategoryId + '&productName=' + productName
            + '&shopId=' + shopId;
        // 设定加载符,若还在后台取数据则不能再次访问后台,避免多次重复加载
        loading = true;
        $.getJSON(url, function (data) {
            if (data.success) {
                maxItems = data.count;
                var html = '';
                data.productList.map(function (item, index) {
                    html += '' + '<div class="card" data-product-id="' + item.productId + '">'
                        + '<div class="card-header">' + item.productName + '</div>'
                        + '<div class="card-content">' + '<div class="list-block media-list">'
                        + '<ul>' + '<li class="item-content">' + '<div class="item-media">'
                        + '<img src="' + item.imgAddr + '" width="44">' + '</div>'
                        + '<div class="item-inner">' + '<div class="item-subtitle">'
                        + item.productDesc + '</div>' + '</div>' + '</li>' + '</ul>'
                        + '</div>' + '</div>' + '<div class="card-footer">' + '<p class="color-gray">'
                        + Format(new Date(item.lastEditTime),'-') + '更新</p>'
                        + '<span>点击查看</span>' + '</div>' + '</div>';
                });
                $('.list-div').append(html);
                // 获取目前为止已显示的卡片总数
                var total = $('.list-div .card').length;
                if (total >= maxItems) {
                    // 隐藏加载提示符
                    $('.infinite-scroll-preloader').hide();
                } else {
                    $('.infinite-scroll-preloader').show();
                }
                // 否则页码加1,继续加载出新的店铺
                pageNum += 1;
                loading = false;
                $.refreshScroller();
            }
        });
    }
    // 下滑屏幕自动进行分页搜索
    $(document).on('infinite', '.infinite-scroll-bottom', function () {
        if (loading) {
            return;
        }
        addItems(pageSize, pageNum);
    });
    // 选择新的店铺类别后,重置页码,清空原店铺列表,从新查询
    $('#shopdetail-button-div').on('click', '.button', function (e) {
        productCategoryId = e.target.dataset.productSearchId;
        if (productCategoryId) {
            // 若之前选定别的商品类别,则移出效果改成新的
            if ($(e.target).hasClass('button-fill')) {
                $(e.target).removeClass('button-fill');
                productCategoryId = '';
            } else {
                $(e.target).addClass('button-fill').siblings().removeClass('button-fill');
            }
            // 清空店铺列表再进行查询
            $('.list-div').empty();
            // 重置页码
            pageNum = 1;
            addItems(pageSize, pageNum);
        }
    });
    // 点击商品的卡片进入该商品的详情页
    $('.list-div').on('click', '.card', function (e) {
        var productId = e.currentTarget.dataset.productId;
        window.location.href = '/o2o_war_exploded/frontend/productdetail?productId=' + productId;
    });
    // 查询的店铺名字变化时
    $('#search').on('change', function (e) {
        productName = e.target.value;
        $('.list-div').empty();
        pageNum = 1;
        addItems(pageSize, pageNum);
    });
    $('#me').click(function () {
        $.openPanel("#panel-right-demo");
    });
    // 初始化页面
    $.init();
});