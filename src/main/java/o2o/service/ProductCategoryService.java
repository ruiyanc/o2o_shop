package o2o.service;

import o2o.model.ProductCategory;

import java.util.List;

public interface ProductCategoryService {
    /**
     * 查询指定店铺下的所有商品类型
     * @param shopId
     * @return
     */
    List<ProductCategory> getProductCategoryList(long shopId);
}
