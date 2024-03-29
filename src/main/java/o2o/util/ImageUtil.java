package o2o.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import o2o.dto.ImageHolder;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.Random;


public class ImageUtil {
    private static String basePath = Objects.requireNonNull(Thread.currentThread().getContextClassLoader().getResource("")).getPath();
    private static final SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
    private static final Random random = new Random();

    public static String generateThumbnail(ImageHolder thumbnail, String targetAddr) {
        String realFileName = getRandomFileName();
//        获取文件的扩展名png
        String extension = getFileExtension(thumbnail.getImageName());
//        如果目标路径不存在,则自动创建
        makeDirPath(targetAddr);
//        获取文件存储的相对路径
        String relativeAddr = targetAddr + realFileName + extension;
//        获取文件要保存到的目标路径
        File dest = new File(PathUtil.getImageBasePath() + relativeAddr);
        System.out.println(dest);
//        绝对路径的位置
        System.out.println(dest.getAbsolutePath());
//        调用Thumbnails生成带水印的图片
        try {
            Thumbnails.of(thumbnail.getImage()).size(200, 200)
                    .watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File(basePath + "/watermark.png")), 0.25f)
                    .outputQuality(0.8f).toFile(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return relativeAddr;
    }

    /**
     * 创建目标路径所涉及到的目录,/a/b/a.jpg若没目录则创建
     * @param targetAddr
     */
    private static void makeDirPath(String targetAddr) {
        String realFileParentPath = PathUtil.getImageBasePath() + targetAddr;
        File dirPath = new File(realFileParentPath);
        if (!dirPath.exists()) {
            dirPath.mkdirs();
        }
    }

    /**
     * 获取输入文件流的扩展名
     * @param fileName
     * @return
     */
    private static String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    /**
     * 生成随机文件名,当前时间+五位随机数
     * @return 随机数
     */
    public static String getRandomFileName() {
        //获取随机五位数
        int rannum = random.nextInt(89999) + 10000;
        String nowTimeStr = sDateFormat.format(new Date());
        return nowTimeStr + rannum;
    }

    /**
     * 若为目录则删目录下的所有文件,为文件则删文件
     * @param storePath
     */
    public static void deleteFileOrPath(String storePath) {
        File fileOrPath = new File(PathUtil.getImageBasePath() + storePath);
        if (fileOrPath.exists()) {
            if (fileOrPath.isDirectory()) {
                File[] files = fileOrPath.listFiles();
                for (File file : files) {
                    file.delete();
                }
            }
            fileOrPath.delete();
        }
    }

    /**
     * 处理详情图,并返回新生成图片的相对路径
     * @param thumbnail
     * @param targetAddr
     * @return
     */
    public static String generateNormalImg(ImageHolder thumbnail, String targetAddr) {
        String realFileName = getRandomFileName();
        String extension = getFileExtension(thumbnail.getImageName());
        makeDirPath(targetAddr);
        String relativeAddr = targetAddr + realFileName + extension;
        File dest = new File(PathUtil.getImageBasePath() + relativeAddr);
        try {
            Thumbnails.of(thumbnail.getImage()).size(337, 640)
                    .watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File(basePath + "/watermark.png")), 0.25f)
                    .outputQuality(0.9f).toFile(dest);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return relativeAddr;
    }
//    public static void main(String[] args) throws IOException {
//        System.out.println(basePath);
//        Thumbnails.of(new File("/home/yanrui/图片/o2o_img/watermark.png")).size(200,200)
//                .watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File(basePath + "/watermark.png")), 0.25f)
//                .outputQuality(0.8f).toFile("/home/yanrui/图片/o2o_img/ren.png");
//    }
}
