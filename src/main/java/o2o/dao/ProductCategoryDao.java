package o2o.dao;

import o2o.model.ProductCategory;

import java.util.List;

public interface ProductCategoryDao {
    /**
     * 通过shopId查询店铺商品类型
     * @param shopId
     * @return
     */
    List<ProductCategory> queryProductCategoryList(long shopId);
}
