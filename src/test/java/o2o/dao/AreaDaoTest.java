package o2o.dao;

import o2o.BaseTest;
import o2o.model.Area;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AreaDaoTest extends BaseTest {
    @Autowired
    private AreaDao areaDao;
    @Test
    public void queryArea(){
        List<Area> areaList = areaDao.queryArea();
        Assert.assertEquals(1, areaList.size());
    }
}
