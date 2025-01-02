package com.example;

public class MainActivity {

    static {
        System.loadLibrary("native-lib");
    }

    public native String stringFromJNI();

    public String getString() {
        return stringFromJNI();
    }
}
