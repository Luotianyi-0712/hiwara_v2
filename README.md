# Hiwara

Hiwara is a cross-platform Iwara client based on NativeScript, written in Vue TypeScript, supporting Android, iOS and HarmonyOS systems.  
基于NativeScript的跨平台Iwara客户端，使用Vue TypeScript编写，支持Android、iOS和鸿蒙系统。  

## Running on Android | 运行到Android平台
```
ns run android
```
## Cleaning the Project | 项目清理
```
ns clean
```
## Building an APK | 打包APK
```
ns build android --release  --clean --key-store-path release-key.keystore --key-store-password <you store password> --key-store-alias hiwara --key-store-alias-password <you store alias password>
```