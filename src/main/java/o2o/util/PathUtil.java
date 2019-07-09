package o2o.util;

public class PathUtil {
    private static String separator = System.getProperty("file.separator");
    public static String getImageBasePath() {
        String os = System.getProperty("os.name");
        String basePath;
        if (os.toLowerCase().startsWith("win")) {
            basePath = "D:/image/";
        } else {
            basePath = "/home/yanrui/图片/o2o_img/";
        }
        basePath = basePath.replace("/", separator);
        return basePath;
    }

    public static String getShopImagePath(long shopId) {
        String imagePath = "/upload/shop/" + shopId + "/";
        return imagePath.replace("/", separator);
    }
}
