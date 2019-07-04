package o2o.dao;

import o2o.model.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductDao {
    //    List<Product>queryProductList(@Param())

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
}
