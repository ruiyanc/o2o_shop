package o2o.dao;

import o2o.model.Shop;

public interface ShopDao {
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
