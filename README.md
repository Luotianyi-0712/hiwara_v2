# Hiwara

![GitHub](https://img.shields.io/github/license/shanmaomaoymmm/hiwara_v2)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/shanmaomaoymmm/hiwara_v2?include_prereleases)
![GitHub issues](https://img.shields.io/github/issues/shanmaomaoymmm/hiwara_v2)
![GitHub repo size](https://img.shields.io/github/repo-size/shanmaomaoymmm/hiwara_v2)
![GitHub Repo stars](https://img.shields.io/github/stars/shanmaomaoymmm/hiwara_v2?style=social)

🕹️ Iwara for NativeScript | 基于NativeScript的跨平台Iwara客户端

<img src="./logo.svg" width="200"/>

此应用兼容最新版Iwara网站，支持Android、iOS和鸿蒙系统，使用NativeScript、Vue和Typescript编写。  
This application is compatible with the latest version of the Iwara website, supports Android, iOS, and is written using NativeScript, Vue, and Typescript.  

If you are looking for the v1 version, please refer to the following link.  
如果你在寻找v1版本，请参考以下链接.

[🗿https://github.com/shanmaomaoymmm/hiwara](https://github.com/shanmaomaoymmm/hiwara)

## 📱 支持平台

* Android
* iOS

## 🛠️ Development environment setup | 环境搭建

### Android环境搭建

1. Install Node.js, Android Studio,  
   安装Node.js、Android Studio，  
   If you are using Linux and installed Node.js through a package manager, you will also need to upgrade it to the latest version.   
   如果你使用Linux且是通过包管理工具安装的Node.js，你还需要将其升级至最新版；

2. Open Android Studio and install the following SDK tools:    
   打开Android Studio，安装以下SDK工具：
  * Android SDK
  * Android SDK Platform
  * Android Virtual Device
  
3. If you are using a Windows:  
   如果你使用的是Windows系统：  
   Open the environment variables and add the following environment variables:  
   打开环境变量，添加以下环境变量：
   ```
   Create a new user variable | 新增用户变量
   ANDROID_HOME C:\Users\<Your User Name>\AppData\Local\Android\Sdk
   JAVA_HOME C:\Program Files\Android\Android Studio\jbr
   NDK_HOME C:\Users\<Your User Name>\AppData\Local\Android\Sdk\ndk\<NDK Version>
   
   Path append | Path追加
   C:\Users\Qisato\AppData\Local\Android\Sdk\platform-tools
   ```
   If you are using macOS or Linux：  
   如果你使用的是macOS或Linux： 
   ```
   Edit this file | 编辑以下文件
   ~/.bashrc

   Append the following content | 末尾处追加内容
   export ANDROID_HOME=/path/to/your/android-sdk-linux
   export JAVA_HOME=/path/to/your/java/jdk
   export NDK_HOME=/path/to/your/android-ndk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. Install NativeScript CLI;  
   安装NativeScript CLI；
   ```
    npm install -g nativescript
   ```
   
### iOS环境搭建

Omit | 略

## 📲 Run on the phone | 运行手机

### Android

1. Tap the Android version number on your Android device 5 times to enable Developer options, then turn on USB debugging, and connect the charging cable to your computer.  
   Android手机设备信息点5下版本号打开开发者模式，打开通过USB调试，连接充电线至电脑；

2. Execute command  
   运行命令：
   ```
    ns run android
   ```

3. Some phones will prompt whether to install this app, please select "Yes".  
   部分手机会提示是否安装此应用，请选择是。

### iOS

Omit | 略

## 🧹 Cleaning the Project | 项目清理

```
ns clean
```

## 📦 Packaging App | 打包App

### Android Apk Package | 打包至Android Apk

```
ns build android --release  --clean --key-store-path release-key.keystore --key-store-password <you store password> --key-store-alias hiwara --key-store-alias-password <you store alias password>
```


Note: Before packaging, you need to generate an APK signing file and configure the key and alias properly.  
注意：你在打包之前需要生成Apk签名文件，并配置好密钥和别名。

### iOS IPA Package | 打包至iOS IPA

Omit | 略

## 🗓️ Development progress | 开发进度

### Plan to implement features | 计划实现功能


* ✅Login | 登录
* ✅Subscribe to the list| 订阅列表
* ✅List of videos| 视频列表
* ✅List of images | 图片列表
* ✅Video play | 视频播放
* ✅Image view | 图片查看
* ⬜Search | 搜索
* ✅Follow, subscribe, favorite, comment | 关注、订阅、收藏、评论
* ⬜Share and download external links | 分析及外链下载
* ⬜Playlist | 播放清单
* ⬜History | 历史记录
* ⬜Followers | 关注的人
* ⬜Settings | 设置
* ⬜Adaptation for Pad side | 平板电脑适配
* ⬜Offline caching and downloading | 离线缓存及下载
* ⬜Forum | 论坛
* ⬜Multi-language support | 多语言支持
* ⬜Aria2 support | Aria2支持
* ⬜HarmonyOS support | 鸿蒙系统支持


### Supported features are not considered | 不考虑支持的功能

* ⛔Direct connection to Iwara | 直连到Iwara
* ⛔Contribute | 投稿

## 🌏Multilingual support | 语言支持

* Chinese Simplified | 简体中文

## 📘 Reference document | 参考文档

* <https://docs.nativescript.org/>
* <https://nativescript-vue.org/en/docs/introduction/>

This document was written with the assistance of GLM-4.  
本文档使用GLM-4辅助编写。