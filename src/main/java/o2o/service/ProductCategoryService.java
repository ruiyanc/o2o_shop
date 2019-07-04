package o2o.service;

import o2o.dto.ProductCategoryExecution;
import o2o.exceptions.ProductCategoryOperationException;
import o2o.model.ProductCategory;

import java.util.List;

public interface ProductCategoryService {
    /**
     * 查询指定店铺下的所有商品类型
     * @param shopId
     * @return
     */
    List<ProductCategory> getProductCategoryList(long shopId);

    /**
     *批量添加
     * @param productCategoryList
     * @return
     */
    ProductCategoryExecution batchAddProductCategory(List<ProductCategory> productCategoryList) throws ProductCategoryOperationException;

    /**
     * 将类别下的商品类别id值为空,再删掉该商品类别
     * @param productCategoryId
     * @param shopId
     * @return
     */
    ProductCategoryExecution deleteProductCategory(long productCategoryId, long shopId);
}
