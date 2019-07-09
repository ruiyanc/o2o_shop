$(function () {
   var url = '/o2o_war_exploded/frontend/listmainpageinfo';
   // 访问后台,获取头条列表以及一级类别列表
   $.getJSON(url, function (data) {
       if (data.success) {
           var headLineList = data.headLineList;
           var swiperHtml = '';
           headLineList.map(function (item, index) {
               swiperHtml += '' + '<div class="swiper-slide img-wrap">'
                   + '<a href="' + item.lineLink + ' external"><img class="banner-img" src="'
                   + item.lineImg + '" alt="' + item.lineName + '"></a>' + '</div>';
           });
           $('.swiper-wrapper').html(swiperHtml);
           $('.swiper-container').swiper({
               autoplay: 3000,
               // 用户对轮播图操作时是否自动停止autoplay
               autoplayDisableOnInteraction: false
           });
           // 获取后台传递过来的大类列表
           var shopCategoryList = data.shopCategoryList;
           var categoryHtml = '';
           shopCategoryList.map(function (item, index) {
               categoryHtml += '' + '<div class="col-50 shop-classify" data-category='
                   + item.shopCategoryId + '>' + '<div class="world">'
                   + '<p class="shop-title">' + item.shopCategoryName + '</p>'
                   + '<p class="shop-desc">' + item.shopCategoryDesc + '</p> ' + '</div>'
                   + '<div class="shop-classify-img-warp">' + '<img class="shop-img" width="40%" height="20%" src="'
                   + '/resources/img' +item.shopCategoryImg + '">' + '</div>' + '</div>';
           });
           $('.row').html(categoryHtml);
       }
   });
   $('.row').on('click', '.shop-classify', function (e) {
       var shopCategoryId = e.currentTarget.dataset.category;
       var newUrl = '/o2o_war_exploded/frontend/shoplist?parentId=' + shopCategoryId;
       window.location.href = newUrl;
   });
    $('#me').click(function () {
        $.openPanel("#panel-right-demo");
    });
    // 初始化页面
    $.init();
});