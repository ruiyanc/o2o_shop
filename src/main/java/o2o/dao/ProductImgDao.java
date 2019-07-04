package o2o.dao;

import o2o.model.ProductImg;

import java.util.List;

public interface ProductImgDao {
    List<ProductImg> queryProductImgList(long productId);
    /**
     * 批量添加商品详情图
     * @param productImgList
     * @return
     */
    int batchInsertProductImg(List<ProductImg> productImgList);

    /**
     * 删除指定商品的所有图片
     * @param productId
     * @return
     */
    int deleteProductImgByProductId(long productId);
}
