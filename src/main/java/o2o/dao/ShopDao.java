package o2o.dao;

import o2o.model.Shop;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ShopDao {
    /**
     * 分页查询店铺,店铺名,店铺状态,店铺类别,区域Id,owner
     * @param shopCondition
     * @param rowIndex 从第几行开始取
     * @param pageSize 返回的条数
     * @return
     */
    List<Shop> queryShopList(@Param("shopCondition") Shop shopCondition,
                             @Param("rowIndex") int rowIndex, @Param("pageSize") int pageSize);

    /**
     * 返回queryShopList的总数
     * @param shopCondition
     * @return
     */
    int queryShopCount(@Param("shopCondition") Shop shopCondition);
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
