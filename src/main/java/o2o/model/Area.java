package o2o.model;

import java.util.Date;

public class Area {
// id
    private Integer areaId;
//  名称
    private String areaName;
//   权重
    private Integer priority;
//  创建时间
    private Date createTime;
//    更新时间
    private Date lastEdittime;

    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getLastEdittime() {
        return lastEdittime;
    }

    public void setLastEdittime(Date lastEdittime) {
        this.lastEdittime = lastEdittime;
    }
}
