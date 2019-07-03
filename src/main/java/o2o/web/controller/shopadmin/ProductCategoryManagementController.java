package o2o.web.controller.shopadmin;

import o2o.dto.Result;
import o2o.enums.ProductCategoryStateEnum;
import o2o.model.ProductCategory;
import o2o.model.Shop;
import o2o.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("shopadmin")
public class ProductCategoryManagementController {
    @Autowired
    private ProductCategoryService productCategoryService;

    @RequestMapping(value = "getproductcategorylist", method = RequestMethod.GET)
    @ResponseBody
    private Result<List<ProductCategory>> getProductCategoryList(HttpServletRequest request) {
//        Shop shop = new Shop();
//        shop.setShopId(1L);
//        request.getSession().setAttribute("currentShop", shop);
        Shop currentShop = (Shop) request.getSession().getAttribute("currentShop");
        List<ProductCategory> list;
        if (currentShop != null && currentShop.getShopId() > 0) {
            list = productCategoryService.getProductCategoryList(currentShop.getShopId());
            return new Result<>(true, list);
        } else {
            ProductCategoryStateEnum ps = ProductCategoryStateEnum.INNER_ERROR;
            return new Result<>(false, ps.getStateInfo(), ps.getState());
        }
    }
}
