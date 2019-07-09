package o2o.dao;

import o2o.model.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductDao {
    /**
     * 查询商品列表并分页
     * @param productCondition
     * @param rowIndex
     * @param pageSize
     * @return
     */
    List<Product> queryProductList(@Param("productCondition") Product productCondition,
                                   @Param("rowIndex")int rowIndex, @Param("pageSize")int pageSize);

    /**
     * 查询对应的商品总数
     * @param productCondition
     * @return
     */
    int queryProductCount(@Param("productCondition") Product productCondition);
    /**
     * 通过productId查询商品信息
     * @param productId
     * @return
     */
    Product queryProductById(long productId);
    /**
     * 插入商品
     * @param product
     * @return
     */
    int insertProduct(Product product);

    /**
     * 更新商品信息
     * @param product
     * @return
     */
    int updateProduct(Product product);

    /**
     * 删除商品类别前将类别id置空
     * @param productCategoryId
     * @return
     */
    int updateProductCateogryToNull(long productCategoryId);
}
