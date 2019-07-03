package o2o.web.controller.shopadmin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
        return "shop/productcategorymanagement";
    }
}
