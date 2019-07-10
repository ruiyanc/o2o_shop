$(function () {
    var loading = false;
    // 分页允许返回的最大条数
    var maxItems = 999;
    // 每页返回的最大条数
    var pageSize = 3;
    // 店铺列表的url
    var listUrl = '/o2o_war_exploded/frontend/listshops';
    // 获取店铺类别列表以及区域列表的url
    var searchDivUrl = '/o2o_war_exploded/frontend/listshoppageinfo';
    var pageNum = 1;
    var parentId = getQueryString('parentId');
    var areaId = '';
    var shopCategoryId = '';
    var shopName = '';
    // 渲染出店铺类别列表以及区域列表以供搜索
    getSearchDivData();
    // 预先加载10条店铺信息
    addItems(pageSize, pageNum);

    /**
     * 获取店铺类别列表以及区域列表信息
     */
    function getSearchDivData() {
        var url = searchDivUrl + '?' + 'parentId=' + parentId;
        $.getJSON(url, function (data) {
            if (data.success) {
                var shopCategoryList = data.shopCategoryList;
                var html = '';
                html += '<a href="#" class="col-33 button" data-category-id="">全部类别</a>';
                shopCategoryList.map(function (item, index) {
                    html += '<a href="#" class="col-33 button" data-category-id="'
                        + item.shopCategoryId + '">' + item.shopCategoryName + '</a>';
                });
                $('#shoplist-search-div').html(html);
                var selectOptions = '<option value="">全部地址</option>';
                var areaList = data.areaList;
                areaList.map(function (item, index) {
                    selectOptions += '<option value="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                $('#area-search').html(selectOptions);
            }
        });
    }

    /**
     * 获取分页展示的店铺列表信息
     * @param pageSize
     * @param pageIndex
     */
    function addItems(pageSize, pageIndex) {
        var url = listUrl + '?' + 'pageIndex=' + pageIndex + '&pageSize=' + pageSize
            + '&parentId=' + parentId + '&areaId=' + areaId + '&shopCategoryId='
            + shopCategoryId + '&shopName=' + shopName;
        // 设定加载符,若还在后台取数据则不能再次访问后台,避免多次重复加载
        loading = true;
        $.getJSON(url, function (data) {
            if (data.success) {
                maxItems = data.count;
                var html = '';
                data.shopList.map(function (item, index) {
                    html += '' + '<div class="card" data-shop-id="' + item.shopId + '">'
                        + '<div class="card-header">' + item.shopName + '</div>'
                        + '<div class="card-content">' + '<div class="list-block media-list">'
                        + '<ul>' + '<li class="item-content">' + '<div class="item-media">'
                        + '<img src="' + item.shopImg + '" width="44">' + '</div>'
                        + '<div class="item-inner">' + '<div class="item-subtitle">'
                        + item.shopDesc + '</div>' + '</div>' + '</li>' + '</ul>'
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
    // 点击店铺的卡片进入该店铺的详情页
    $('.shop-list').on('click', '.card', function (e) {
        var shopId = e.currentTarget.dataset.shopId;
        window.location.href = '/o2o_war_exploded/frontend/shopdetail?shopId=' + shopId;
    });
    // 选择新的店铺类别后,重置页码,清空原店铺列表,从新查询
    $('#shoplist-search-div').on('click', '.button', function (e) {
        // 如果传递过来的是某父类下的子类
        if (parentId) {
            shopCategoryId = e.target.dataset.categoryId;
            // 若之前选定别的商品类别,则移出效果改成新的
            if ($(e.target).hasClass('button-fill')) {
                $(e.target).removeClass('button-fill');
                shopCategoryId = '';
            } else {
                $(e.target).addClass('button-fill').siblings().removeClass('button-fill');
            }
            // 清空店铺列表再进行查询
            $('.list-div').empty();
            // 重置页码
            pageNum = 1;
            addItems(pageSize, pageNum);
        } else {
            // 传递的父类为空,则按父类查询
            parentId = e.target.dataset.categoryId;
            if ($(e.target).hasClass('button-fill')) {
                $(e.target).removeClass('button-fill');
                parentId = '';
            } else {
                $(e.target).addClass('button-fill').siblings().removeClass('button-fill');
            }
            $('.list-div').empty();
            pageNum = 1;
            addItems(pageSize, pageNum);
            parentId = '';
        }
    });
    // 查询的店铺名字变化时
    $('#search').on('change', function (e) {
        shopName = e.target.value;
        $('.list-div').empty();
        pageNum = 1;
        addItems(pageSize, pageNum);
    });
    // 区域信息改变时
    $('#area-search').on('change', function () {
        areaId = $('#area-search').val();
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