package o2o.dao;

import o2o.model.Shop;

public interface ShopDao {
    /**
     * 通过id查询店铺
     * @param shopId
     * @return shop
     */
    Shop queryByShopId(long shopId);
    /**
     * 新增店铺
     * @param shop
     * @return 成功
     */
    int insertShop(Shop shop);

    /**
     * 更新店铺信息
     * @param shop
     * @return 1
     */
    int updateShop(Shop shop);
}
