$(function () {
    var listUrl = '/o2o_war_exploded/shopadmin/getproductcategorylist';
    var addUrl = '/o2o_war_exploded/shopadmin/addproductcategorys';
    var deleteUrl = '/o2o_war_exploded/shopadmin/removeproductcategory';
    getList();
    function getList() {
        $.getJSON(listUrl, function (data) {
            if (data.success) {
                var dataList = data.data;
                $('.category-wrap').html('');
                var tempHtml = '';
                dataList.map(function (value) {
                    tempHtml += '' + '<div class="row row-product-category now">'
                        + '<div class="col-33 product-category-name">'
                        + value.productCategoryName + '</div>'
                        + '<div class="col-33">' + value.priority + '</div> '
                        + '<div class="col-33"><a href="#" class="button delete" data-id="'
                        + value.productCategoryId + '">删除</a></div> '+ '</div>';
                });
                $('.category-wrap').append(tempHtml);
            }
        });
    }
});