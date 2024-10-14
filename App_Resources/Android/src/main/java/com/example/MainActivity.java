package com.example;

public class MainActivity {

    static {
        System.loadLibrary("avcodec");
        System.loadLibrary("avfilter");
        System.loadLibrary("avformat");
        System.loadLibrary("avutil");
        System.loadLibrary("swresample");
        System.loadLibrary("swscale");
        System.loadLibrary("native-lib");
    }

    public native String stringFromJNI();

    public String getString() {
        return stringFromJNI();
    }
}
