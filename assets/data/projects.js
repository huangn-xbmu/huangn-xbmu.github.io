
/*
  作品数据接口
  --------------
  新增作品：复制任意一个对象，修改 id、标题、分类、封面和 media 即可。
  支持 media.type:
  - "image"   单张图片
  - "article" 公众号长图文
  - "video"   MP4 或第三方 iframe
*/
window.PORTFOLIO_CATEGORIES = ["全部", "深度报道", "视觉设计", "数据可视化"];

window.PORTFOLIO_PROJECTS = [
  {
    id: "inside-outside",
    category: "深度报道",
    year: "2025",
    title: "围墙内外",
    subtitle: "救助站人物纪实与公共议题报道",
    summary: "围绕兰州“狗爷猫妈”救助医疗站负责人张明展开，在个人坚守、流浪动物救助、社区环境与城市治理之间建立多方叙事。",
    role: "采访、写作、摄影、公众号排版、主题海报",
    tools: "摄影 / 文字编辑 / 微信公众号编辑器 / Photoshop",
    tags: ["人物报道", "多方采访", "公共议题"],
    cover: "assets/images/wechat-teaser.jpg",
    media: { type: "article", src: "assets/images/wechat-long.jpg" }
  },
  {
    id: "palm-world",
    category: "视觉设计",
    year: "2025",
    title: "你的掌心，它的世界",
    subtitle: "“狗爷猫妈”救助站纪实海报",
    summary: "以手掌轮廓、文字肌理和被救助动物形象建立视觉中心，把“托举”转化为关于生命与归处的隐喻。",
    role: "创意构思、文案、版式、图像处理",
    tools: "Photoshop / 版式设计",
    tags: ["公益海报", "纪实视觉", "文字造型"],
    cover: "assets/images/report-poster.jpg",
    media: { type: "image", src: "assets/images/report-poster.jpg" }
  },
  {
    id: "toast-drama",
    category: "视频剪辑",
    year: "2026",
    title: "后宫·吐司传",
    subtitle: "剧情类创意短片",
    summary: "将“后宫”叙事风格与日常吐司产品结合，通过人物关系、节奏变化与字幕包装制造反差与记忆点。",
    role: "素材整理、拍摄协作、道具准备、独立剪辑与后期",
    tools: "Premiere Pro / 字幕包装 / 音画设计",
    tags: ["剧情剪辑", "广告创意", "节奏控制"],
    cover: "assets/images/video-toast.jpg",
    media: { type: "video", poster: "assets/images/video-toast.jpg", src: "assets/videos/toast.mp4", embedUrl: "" }
  },
  {
    id: "learning-imprint",
    category: "视频剪辑",
    year: "2026",
    title: "学习印记",
    subtitle: "课程成果总结短片",
    summary: "以期末作品、实践项目和平时训练为主线串联课程学习成果，强化整体结构、信息节奏与技能展示。",
    role: "素材整理、结构设计、剪辑、字幕包装",
    tools: "Premiere Pro / After Effects",
    tags: ["课程总结", "作品混剪", "结构剪辑"],
    cover: "assets/images/video-learning.jpg",
    media: { type: "video", poster: "assets/images/video-learning.jpg", src: "assets/videos/learning.mp4", embedUrl: "" }
  },

  {
    id: "gansu-grottoes",
    category: "视频剪辑",
    year: "2026",
    title: "AI眼中的甘肃石窟",
    subtitle: "地方文化视觉短片",
    summary: "以AI视角重新组织甘肃石窟的文化意象，强调画面连贯性、地域氛围与传统文化的视觉转译。",
    role: "素材筛选、结构编排、剪辑、包装、导出",
    tools: "Premiere Pro / AI图像素材 / 调色",
    tags: ["地方文化", "AI影像", "氛围剪辑"],
    cover: "assets/images/video-grottoes.jpg",
    media: { type: "video", poster: "assets/images/video-grottoes.jpg", src: "assets/videos/grottoes.mp4", embedUrl: "" }
  },
  {
    id: "first-day-mv",
    category: "视频剪辑",
    year: "2026",
    title: "MV《第一天》",
    subtitle: "音乐字幕与音画同步练习",
    summary: "围绕歌曲节奏安排画面切换和字幕出现时机，强化情绪推进与歌词视觉表现。",
    role: "音画同步、字幕设计、镜头组接",
    tools: "Premiere Pro / 字幕动画",
    tags: ["MV", "音乐字幕", "音画同步"],
    cover: "assets/images/video-mv.jpg",
    media: { type: "video", poster: "assets/images/video-mv.jpg", src: "assets/videos/mv.mp4", embedUrl: "" }
  },

  {
    id: "scroll-animation",
    category: "视频剪辑",
    year: "2026",
    title: "画轴展开",
    subtitle: "关键帧与图像动画练习",
    summary: "通过位置、缩放、遮罩和关键帧建立画轴展开效果，练习图像动画、节奏控制与转场衔接。",
    role: "图像拆分、关键帧动画、转场设计",
    tools: "Premiere Pro / After Effects",
    tags: ["关键帧", "图像动画", "转场"],
    cover: "assets/images/video-scroll.jpg",
    media: { type: "video", poster: "assets/images/video-scroll.jpg", src: "assets/videos/scroll.mp4", embedUrl: "" }
  },
  {
    id: "book-recommendation",
    category: "视频剪辑",
    year: "2026",
    title: "书籍荐读",
    subtitle: "信息类短视频",
    summary: "把书籍信息、人物讲解与视觉素材重新编排，训练信息密度、字幕层级和口播节奏。",
    role: "字幕、节奏、信息包装",
    tools: "Premiere Pro / Photoshop",
    tags: ["知识视频", "信息包装", "口播剪辑"],
    cover: "assets/images/video-reading.jpg",
    media: { type: "video", poster: "assets/images/video-reading.jpg", src: "assets/videos/reading.mp4", embedUrl: "" }
  },
  {
    id: "four-seasons",
    category: "视频剪辑",
    year: "2026",
    title: "春夏秋冬风景片",
    subtitle: "风景类氛围剪辑",
    summary: "通过季节影像、音乐和色彩建立时间流动感，重点练习画面组接、调色与情绪控制。",
    role: "画面组接、调色、音乐选择",
    tools: "Premiere Pro / Lumetri",
    tags: ["风景片", "调色", "氛围"],
    cover: "assets/images/video-seasons.jpg",
    media: { type: "video", poster: "assets/images/video-seasons.jpg", src: "assets/videos/seasons.mp4", embedUrl: "" }
  },
  {
    id: "transition-effects",
    category: "视频剪辑",
    year: "2026",
    title: "转场与视觉效果",
    subtitle: "基础后期技能训练",
    summary: "围绕遮罩、抠像、圆形转场、光效、字幕条与基础合成进行短镜头练习，形成可复用的后期技能库。",
    role: "效果制作、参数调试、练习整合",
    tools: "Premiere Pro / After Effects",
    tags: ["遮罩", "抠像", "视觉效果"],
    cover: "assets/images/video-effects.jpg",
    media: { type: "video", poster: "assets/images/video-effects.jpg", src: "assets/videos/effects.mp4", embedUrl: "" }
  },

  {
    id: "dragon-scroll",
    category: "视觉设计",
    year: "2025",
    title: "龙水如卷·山水如卷",
    subtitle: "端午文化系列海报",
    summary: "借山水长卷之形融入龙舟竞渡、传统建筑与金龙破浪，表现端午文化在山水之间的传承。",
    role: "创意构思、图层蒙版、合成、版式",
    tools: "Photoshop",
    tags: ["文化海报", "图像合成", "系列设计"],
    cover: "assets/images/design-dragon.jpg",
    media: { type: "image", src: "assets/images/design-dragon.jpg" }
  },
  {
    id: "lanzhou-marathon",
    category: "视觉设计",
    year: "2025",
    title: "兰州马拉松",
    subtitle: "城市赛事信息海报",
    summary: "以奔跑瞬间为视觉中心，将赛事日期、城市名称和运动氛围组织为明确的信息层级。",
    role: "海报设计、信息层级、图像处理",
    tools: "Photoshop / Illustrator",
    tags: ["城市传播", "体育视觉", "信息海报"],
    cover: "assets/images/design-marathon.jpg",
    media: { type: "image", src: "assets/images/design-marathon.jpg" }
  },
  {
    id: "grand-canal",
    category: "视觉设计",
    year: "2025",
    title: "大运河文化海报",
    subtitle: "文化遗产主题视觉",
    summary: "以古船、古桥和传统建筑勾勒大运河流域风貌，通过诗句与图像并置呈现历史底蕴与水运活力。",
    role: "视觉构思、图像合成、文案排版",
    tools: "Photoshop",
    tags: ["文化遗产", "海报", "图像叙事"],
    cover: "assets/images/design-canal.jpg",
    media: { type: "image", src: "assets/images/design-canal.jpg" }
  },
  {
    id: "population-data",
    category: "数据可视化",
    year: "2025",
    title: "家乡近十年人口数据",
    subtitle: "信息图表与数据解读",
    summary: "把人口规模、变化趋势与结构信息转化为适合移动端阅读的图表页面，强调数字之间的关系与结论。",
    role: "资料整理、图表设计、版式",
    tools: "Excel / Illustrator / Canva",
    tags: ["信息图", "数据叙事", "移动端"],
    cover: "assets/images/design-population.jpg",
    media: { type: "image", src: "assets/images/design-population.jpg" }
  },
  {
    id: "tcm-data",
    category: "数据可视化",
    year: "2025",
    title: "《中药餐饮》数据可视化",
    subtitle: "获奖作品分析与再设计",
    summary: "以中药餐饮为主题组织图表、流程与消费信息，探索传统文化内容的现代视觉表达。",
    role: "案例分析、信息提炼、图表与版式设计",
    tools: "Illustrator / Photoshop / Canva",
    tags: ["数据可视化", "传统文化", "信息设计"],
    cover: "assets/images/design-tcm.jpg",
    media: { type: "image", src: "assets/images/design-tcm.jpg" }
  }
];
