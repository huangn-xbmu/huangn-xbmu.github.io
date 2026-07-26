# 视频文件接口

网页的视频剪辑区域会自动读取 `assets/data/projects.js` 中所有：

```js
category: "视频剪辑"
```

的项目，并生成深色双列视频卡片、封面、播放按钮和弹窗播放器。

## 本地 MP4

将视频放进本目录，并保持数据文件中的文件名一致：

- toast.mp4
- learning.mp4
- grottoes.mp4
- mv.mp4
- scroll.mp4
- reading.mp4
- seasons.mp4
- effects.mp4

数据示例：

```js
media: {
  type: "video",
  poster: "assets/images/video-toast.jpg",
  src: "assets/videos/toast.mp4",
  embedUrl: ""
}
```

文件不存在时，点击播放会显示“视频文件待补充”，不会导致网页报错。

## 云端播放器

大型视频建议上传到 Bilibili、腾讯云点播、阿里云视频点播或对象存储，然后填写：

```js
media: {
  type: "video",
  poster: "assets/images/cover.jpg",
  src: "",
  embedUrl: "云端播放器 iframe 地址"
}
```

也可以把公开 MP4 的 HTTPS 地址直接填入 `src`。
