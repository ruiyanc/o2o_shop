package o2o.service;

import o2o.dto.ShopExecution;
import o2o.model.Shop;

import java.io.File;

public interface ShopService {
    ShopExecution addShop(Shop shop, File shopImg);
}
