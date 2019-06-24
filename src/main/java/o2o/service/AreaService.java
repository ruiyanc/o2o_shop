package o2o.service;

import o2o.model.Area;
import org.springframework.stereotype.Service;

import java.util.List;

public interface AreaService {
    List<Area> getAreaList();
}
