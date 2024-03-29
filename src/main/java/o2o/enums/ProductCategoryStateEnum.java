package o2o.enums;

public enum ProductCategoryStateEnum {
    /**
     * CHECK审核,OFFLINE非法
     */
    SUCCESS(1, "创建成功"), INNER_ERROR(-1001, "操作失败"),
    EMPTY_LIST(-1002, "添加数小于1");
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
