package o2o.service;

import o2o.dto.ShopExecution;
import o2o.model.Shop;
import java.io.InputStream;

public interface ShopService {
    /**
     * 根据shopCondition分页返回相应店铺列表
     * @param shopCondition
     * @param pageIndex
     * @param pageSize
     * @return
     */
    ShopExecution getShopList(Shop shopCondition, int pageIndex, int pageSize);
    /**
     * 通过店铺id获取店铺信息
     * @param shopId
     * @return
     */
    Shop getByShopId(long shopId);

    /**
     * 更新店铺信息
     * @param shop
     * @param shopImgInputStream
     * @param fileName
     * @return
     */
    ShopExecution modifyShop(Shop shop, InputStream shopImgInputStream, String fileName);
    /**
     * 注册店铺信息,包括图片处理
     * @param shop
     * @param shopImgInputStream
     * @param fileName
     * @return
     */
    ShopExecution addShop(Shop shop, InputStream shopImgInputStream, String fileName);
}
