$(function () {
    getlist();
    function getlist() {
        $.ajax({
            url: "/o2o_war_exploded/shopadmin/getshoplist",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    handleList(data.shopList);
                    handleUser(data.user);
                }
            }
        });
    }
    function handleUser(data) {
        $('#user-name').text(data.name);
    }
    function handleList(data) {
        var html = '';
        data.map(function(value) {
            html += '<div class="row row-shop"><div class="col-40">'
                + value.shopName + '</div><div class="col-40">'
                + shopStatus(value.enableStatus)
                + '</div><div class="col-20">'
                + goShop(value.enableStatus, value.shopId) + '</div></div>';
        });
        $('.shop-wrap').html(html);
    }
    function shopStatus(status) {
        if (status == 0) {
            return "审核中";
        }else if (status == -1) {
            return "店铺非法";
        } else if (status == 1) {
            return "审核通过";
        }
    }
    function goShop(status, shopId) {
        if (status == 1) {
            return '<a href="/o2o_war_exploded/shopadmin/shopmanagement?shopId=' + shopId + '">进入</a>';
        } else {
            return '';
        }
    }
});