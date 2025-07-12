# API接口文档

## 认证相关接口

### login(email, password)
- **功能**: 用户登录
- **方法**: POST
- **路径**: `/user/login`
- **参数**:
  | 字段     | 描述 | 类型   |
  | -------- | ---- | ------ |
  | email    | 邮箱 | string |
  | password | 密码 | string |
- **返回**: 包含token的响应对象

## 视频接口

### getSubscribeVideoList(page)
- **功能**: 获取订阅视频列表
- **方法**: GET
- **路径**: `/videos`
- **参数**:
  | 字段       | 描述 | 类型    |
  | ---------- | ---- | ------- |
  | page       | 页码 | number  |
  | rating     | 类型 | 'all'   |
  | limit      | 分页 | number  |
  | subscribed | 订阅 | boolean |
- **返回**: `VideoItem[]` 数组

### getVideoList(page, sort, year, month, subscribed, tagsArr?）
- **功能**: 获取视频列表
- **方法**: GET
- **路径**: `/videos`
- **参数**:
  | 字段       | 描述     | 类型    | 可选 |
  | ---------- | -------- | ------- | ---- |
  | page       | 页码     | number  |      |
  | rating     | 分级     | 'all'   |      |
  | limit      | 分页     | number  |      |
  | sort       | 排序方式 | string  |      |
  | year/month | 时间筛选 | string  |      |
  | subscribed | 是否订阅 | boolean |      |
  | tagsArr    | 标签数组 |         | ✅    |
- **返回**: `VideoItem[]` 数组

### getVideoData(id)
- **功能**: 获取视频详情
- **方法**: GET
- **路径**: `/video/{id}`
- **返回**: VideoData 对象

### likeVideo(id)
- **功能**: 点赞视频
- **方法**: POST
- **路径**: `/video/{id}/like`

### unLikeVideo(id)
- **功能**: 取消点赞
- **方法**: DELETE
- **路径**: `/video/{id}/like`

## 图片接口

### getSubscribeImageList(page)
- **功能**: 获取订阅图片列表
- **方法**: GET
- **路径**: `/images`
- **参数**: 
  - `page`: 页码
  - `rating=all`, `limit=32`, `subscribed=true`
- **返回**: `ImageItem[]` 数组

### getImageData(id)
- **功能**: 获取图片详情
- **方法**: GET
- **路径**: `/image/{id}`
- **返回**: ImageData 对象

## 评论接口

### getVideoComments(id, page, parent?)
- **功能**: 获取视频评论
- **方法**: GET
- **路径**: `/video/{id}/comments`
- **参数**:
  - `page`: 页码
  - `parent`: 父评论ID(可选)
- **返回**: `Comments[]` 数组

### addCommentForVideo(id, body, parentId?)
- **功能**: 添加视频评论
- **方法**: POST
- **路径**: `/video/{id}/comments`
- **参数**:
  - body: 评论内容
  - parentId: 父评论ID(可选)

## 用户接口

### getMyselfUserData()
- **功能**: 获取当前用户数据
- **方法**: GET
- **路径**: `/user`
- **返回**: MyselfData 对象

### followers(uid)
- **功能**: 关注用户
- **方法**: POST
- **路径**: `/user/{uid}/followers`

### disFollowers(uid)
- **功能**: 取消关注
- **方法**: DELETE
- **路径**: `/user/{uid}/followers`

## 其他接口

### `ariaDownloadVideo(rpc, token, url, name, path)`
- **功能**: 通过aria2下载视频
- **方法**: POST
- **参数**:
  - rpc: aria2 RPC地址
  - token: 认证令牌
  - url: 视频URL
  - name: 保存文件名
  - path: 保存路径

### getRules()
- **功能**: 获取平台规则
- **方法**: GET
- **路径**: `/rules`

---

## 数据结构
### 视频对象 (VideoItem)
```typescript
interface VideoItem {
  id: string
  title: string
  up: string
  numViews: number
  numLikes: number
  duration: number
  createdAt: string
  updatedAt: string
  ecchi: boolean
  img: string
  loss: boolean
}
```
### 图片对象 (ImageItem)
```
interface ImageItem {
  id: string
  title: string
  up: string
  numImages: number
  numViews: number
  numLikes: number
  createdAt: string
  updatedAt: string
  ecchi: boolean
  img: string
}
```