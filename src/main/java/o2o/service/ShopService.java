package o2o.service;

import o2o.dto.ShopExecution;
import o2o.model.Shop;
import org.springframework.stereotype.Service;

import java.io.InputStream;

public interface ShopService {
    ShopExecution addShop(Shop shop, InputStream shopImgInputStream, String fileName);
}
