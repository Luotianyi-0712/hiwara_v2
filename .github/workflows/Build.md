# GitHub Actions 配置说明

## 概述

这个工作流文件会自动构建和打包应用，支持以下功能：

- **调试版本构建**: 每次推送到main/master分支时构建Android调试APK
- **发布版本构建**: 创建标签时构建Android和iOS发布版本
- **自动发布**: 创建GitHub Release并上传构建产物

## 触发条件

- 推送到 `main` 或 `master` 分支
- 创建以 `v` 开头的标签（如 `v1.0.0`）
- 创建Pull Request到 `main` 或 `master` 分支

## 构建任务

### 1. Android调试构建
- 触发条件: 所有推送和PR
- 输出: 调试版APK文件
- 产物: `hiwara-android-debug`

### 2. Android发布构建
- 触发条件: 仅标签推送
- 输出: 签名版APK文件
- 产物: `hiwara-android-release`

### 3. iOS发布构建
- 触发条件: 仅标签推送
- 输出: IPA文件
- 产物: `hiwara-ios-release`

### 4. 自动发布
- 触发条件: 仅标签推送
- 功能: 创建GitHub Release并上传构建产物

## 配置GitHub Secrets

要使用发布构建功能，需要在GitHub仓库设置中配置以下Secrets：

### 必需的Secrets

1. **KEY_STORE_PASSWORD**
   - 描述: Android APK签名密钥库密码
   - 类型: 字符串
   - 示例: `your_keystore_password`

2. **KEY_STORE_ALIAS_PASSWORD**
   - 描述: Android APK签名别名密码
   - 类型: 字符串
   - 示例: `your_alias_password`

### 如何设置Secrets

1. 进入GitHub仓库页面
2. 点击 "Settings" 标签
3. 在左侧菜单中点击 "Secrets and variables" → "Actions"
4. 点击 "New repository secret"
5. 添加上述两个Secrets

## 使用方法

### 构建调试版本
```bash
# 推送到main分支即可触发调试版本构建
git push origin main
```

### 构建发布版本
```bash
# 创建标签并推送
git tag v1.0.0
git push origin v1.0.0
```

## 注意事项

1. **iOS构建**: 需要有效的Apple开发者账号和证书
2. **Android签名**: 工作流会自动生成keystore文件，但建议使用自己的签名文件
3. **构建时间**: 首次构建可能需要较长时间来下载依赖
4. **产物下载**: 构建完成后可在Actions页面下载构建产物

## 故障排除

### 常见问题

1. **签名失败**: 确认Secrets配置正确
2. **iOS构建失败**: 检查Xcode版本和证书配置
