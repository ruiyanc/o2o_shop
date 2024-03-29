package o2o.web.controller.shopadmin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 转发的路由,转发到html页面
 */
@Controller
@RequestMapping(value = "shopadmin", method = {RequestMethod.GET})
public class ShopAdminController {
    @RequestMapping("/shopoperation")
    public String shopOperation() {
        return "shop/shopoperation";
    }

    @RequestMapping("shoplist")
    public String shopList() {
        return "shop/shoplist";
    }

    @RequestMapping("shopmanagement")
    public String shopManagement() {
        return "shop/shopmanagement";
    }

    @RequestMapping(value = "productcategorymanagement", method = RequestMethod.GET)
    public String productCategoryManage() {
        //转发至商品类别管理页面
        return "shop/productcategorymanagement";
    }

    @RequestMapping("productoperation")
    public String productOperation() {
        //转发至商品添加/编辑页面
        return "shop/productoperation";
    }

    @RequestMapping("productmanagement")
    public String productManagement() {
        return "shop/productmanagement";
    }
}
