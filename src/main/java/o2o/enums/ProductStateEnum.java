package o2o.enums;

public enum ProductStateEnum {
    /**
     * CHECK审核,OFFLINE非法
     */
    CHECK(0,"审核中"), SUCCESS(1, "操作成功"),
    PASS(2,"通过审核"), INNER_ERROR(-1001, "系统内部错误");
    private int state;
    private String stateInfo;

    ProductStateEnum(int state, String stateInfo) {
        this.state = state;
        this.stateInfo = stateInfo;
    }

    /**
     * 根据传入的state返回相应的enum值
     * @param state
     * @return
     */
    public static ProductStateEnum stateOf(int state) {
        for (ProductStateEnum stateEnum:values()) {
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
