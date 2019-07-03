package o2o.enums;

public enum ProductCategoryStateEnum {
    /**
     * CHECK审核,OFFLINE非法
     */
    CHECK(0,"审核中"),OFFLINE(-1,"非法店铺"), SUCCESS(1, "操作成功"),
    PASS(2,"通过审核"), INNER_ERROR(-1001, "系统内部错误"),NULL_SHOPID(-1002,"ShopId为空"),
    NULL_SHOP(-1003, "productCategory信息为空"),;
    private int state;
    private String stateInfo;

    ProductCategoryStateEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    /**
     * 根据传入的state返回相应的enum值
     * @param state
     * @return
     */
    public static ProductCategoryStateEnum stateOf(int state) {
        for (ProductCategoryStateEnum stateEnum:values()) {
            if (stateEnum.getState() == state) {
                return stateEnum;
            }
        }
        return null;
    }

    public int getState() {
        return state;
    }

    public String getStateInfo() {
        return stateInfo;
    }
}
