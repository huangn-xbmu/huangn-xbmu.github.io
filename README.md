# 黄楠｜新闻学与视觉叙事作品集

这是一个不依赖构建工具的静态作品集网站，可直接部署到 GitHub Pages、Netlify、Vercel 或任意静态服务器。

## 1. 本地预览

直接双击 `index.html` 即可浏览。推荐用本地服务器获得更稳定的体验：

```bash
python -m http.server 8000
```

然后打开 `http://localhost:8000`。

## 2. 部署到 GitHub Pages

1. 新建 GitHub 仓库。
2. 将本文件夹内的所有内容上传到仓库根目录。
3. 进入 `Settings → Pages`。
4. 在 `Build and deployment` 中选择 `Deploy from a branch`。
5. 选择 `main` 分支与 `/ (root)` 目录并保存。

本项目已包含 `.nojekyll`，GitHub Pages 会按纯静态文件发布。


## 视频剪辑专区

本次更新已将独立网页中的视频展现逻辑融入主作品集：

- 深色编辑台式视频区域
- 个人短视频账号侧栏
- 双列视频封面卡片
- 圆形播放按钮
- MP4、外部 MP4 与 iframe 云播放器兼容
- 视频文件缺失时自动显示补充说明
- 手机端自动切换为单列布局

视频卡片仍然由 `assets/data/projects.js` 自动生成。新增一个
`category: "视频剪辑"` 的项目后，无需修改 HTML。

## 3. 新增作品：只改一个文件

打开：

```text
assets/data/projects.js
```

复制一个项目对象，并修改这些字段：

```js
{
  id: "unique-id",
  category: "视频剪辑",
  year: "2026",
  title: "新作品",
  subtitle: "一句话定位",
  summary: "项目介绍",
  role: "你的职责",
  tools: "使用工具",
  tags: ["标签1", "标签2"],
  cover: "assets/images/your-cover.jpg",
  media: {
    type: "image",
    src: "assets/images/your-image.jpg"
  }
}
```

支持三种媒体类型：

### 单张图片

```js
media: { type: "image", src: "assets/images/work.jpg" }
```

### 本地或外部 MP4

```js
media: {
  type: "video",
  poster: "assets/images/video-cover.jpg",
  src: "https://你的域名/video.mp4",
  embedUrl: ""
}
```

也可以把体积较小的视频放入 `assets/videos/`：

```js
src: "assets/videos/demo.mp4"
```

### B站 / 云点播 iframe

```js
media: {
  type: "video",
  poster: "assets/images/video-cover.jpg",
  src: "",
  embedUrl: "https://player.bilibili.com/player.html?bvid=你的BV号&page=1"
}
```

### 公众号长图文

```js
media: { type: "article", src: "assets/images/article-long.jpg" }
```

## 4. MP4 太大，无法上传 GitHub：推荐方案

### 方案 A：腾讯云点播 / 阿里云视频点播（国内访问更稳定，推荐用于正式求职作品集）

流程：

1. 上传原始 MP4。
2. 在控制台转码为网页适用的 MP4 或 HLS。
3. 获取 HTTPS 播放地址，填入项目的 `media.src`。
4. 需要防盗链、清晰度切换或版权保护时，使用云厂商提供的 Web 播放器 SDK，并把播放器页面地址填入 `embedUrl`。

腾讯云 TCPlayer 和阿里云 Web 播放器都支持接入点播地址。正式使用前请查看当时的价格、域名备案与 License 规则。

### 方案 B：上传 Bilibili，再用 iframe 嵌入（最省事）

适合允许公开视频、希望零服务器维护的作品。

把 BV 号替换到：

```text
https://player.bilibili.com/player.html?bvid=BVxxxxxxxxxx&page=1
```

然后填入 `media.embedUrl`。

### 方案 C：对象存储 + CDN

可使用腾讯云 COS、阿里云 OSS、Cloudflare R2 等存储视频，并配置 CDN 与 CORS。获取公开 HTTPS 地址后，直接填入 `media.src`。

### 不建议：用 Git LFS 给 GitHub Pages 播放视频

截至本项目制作时：

- GitHub 普通仓库会对大于 50 MiB 的文件发出警告，并阻止超过 100 MiB 的单文件。
- Git LFS **不能用于 GitHub Pages 站点**。
- GitHub Pages 发布站点大小上限为 1 GB，月带宽为 100 GB 的软限制。

因此，GitHub 适合存网页代码和图片，不适合充当视频流媒体服务器。

官方参考：

- https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github
- https://docs.github.com/repositories/working-with-files/managing-large-files/about-git-large-file-storage
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://cloud.tencent.com/document/product/881/30818
- https://help.aliyun.com/zh/vod/developer-reference/integration

## 5. 压缩视频后再上传

适合 30–60 秒的作品预览片。先安装 FFmpeg：

```bash
ffmpeg -i input.mp4 \
  -vf "scale=1280:-2" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output-web.mp4
```

生成视频封面：

```bash
ffmpeg -ss 00:00:03 -i input.mp4 -frames:v 1 video-cover.jpg
```

建议保留完整版在云点播平台，网站只展示 30–90 秒精剪版或嵌入播放器。

## 6. 隐私提醒

公开网站默认只展示邮箱，没有展示作品集中出现的手机号。若确实需要公开，可在 `index.html` 的“公开联系方式”区域自行添加。
