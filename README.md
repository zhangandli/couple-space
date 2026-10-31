# 我们的小宇宙 · Our Little Universe

一个只属于两个人的恋爱小屋。纯静态网页，没有后端、没有注册、没有追踪，所有内容只保存在浏览器本地。

![首页预览](preview.png)

## 现在就能访问

**GitHub Pages（永久）**：https://zhangandli.github.io/couple-space/

**本机服务**：http://127.0.0.1:4173/

也可以直接双击 `index.html` 打开。建议用本地服务打开，照片相册的 IndexedDB 在 `file://` 下部分浏览器会受限。

> 仓库同时托管在 GitHub 和 Gitee。GitHub Pages 从 `main` 分支根目录发布，更新后自动重建。

## 情侣小功能

- **恋爱计时**：在一起天数、实时时钟、下一个纪念日倒计时、100/520/1000/1314/2000 天里程碑。
- **纪念日**：生日、第一次旅行、任何想记住的日子；支持每年重复、图标、编辑和删除。
- **心愿清单**：一起做的事，分类、筛选、完成度圆环，全部完成时会放一场爱心彩纸。
- **心情天气**：两个人分别记录今天的心情和想说的话，生成这一周的阴晴圆缺。
- **回忆胶卷**：上传照片、写照片配文、灯箱浏览；自动压缩后存进 IndexedDB，不上传服务器。
- **悄悄话信箱**：写信、署名、定时开启、随机读一封；支持写给一年后的「未来信」。
- **双人默契挑战**：一个人先答 6 道题，把手机交给另一个人猜，最后揭晓默契值和逐题结果。
- **命运转盘**：吃什么 / 去哪玩 / 谁来做，选项可自己编辑。
- **恋爱成就**：8 枚小徽章，记录你们一起解锁的瞬间。
- **专属链接**：把名字、纪念日和主题带在 URL 里，发给 TA 就能打开同一间小屋的「设置」。
- **三种主题**：草莓牛奶、暮色玫瑰、薄荷苏打。

所有默认名字、日期都可以在欢迎页或「小屋设置」里改；也可以在网址后加上 `?a=你的名字&b=TA的名字&date=2024-05-20` 直接生成专属链接。

## 本地运行

```bash
npm start
# 打开 http://127.0.0.1:4173
```

没有依赖，Node.js 只用来做静态文件服务。

## 目录

```text
index.html                 页面结构
assets/css/style.css       视觉与响应式
assets/js/app.js           全部交互逻辑
assets/img/icon.svg        图标
manifest.webmanifest       PWA 清单
server.js                  零依赖静态服务器
preview.png                首页截图
```

## 部署

### GitHub Pages（当前使用）

仓库：[github.com/zhangandli/couple-space](https://github.com/zhangandli/couple-space)

GitHub Pages 已开启：`main` 分支根目录，访问 https://zhangandli.github.io/couple-space/。

```bash
git push github master:main
```

### Gitee 镜像仓库

仓库：[gitee.com/bsjdzpy/couple-space](https://gitee.com/bsjdzpy/couple-space)

```bash
git push origin master
```

也可以直接运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy-gitee.ps1
```

### 关于 Gitee Pages

**Gitee Pages 已经在 2024 年停止服务**，仓库页面里的 Pages 入口也被注释掉了，所以现在无法再生成 `*.gitee.io` 的公开链接。相关讨论：

- [Gitee Feedback #I9LOM3](https://gitee.com/oschina/git-osc/issues/I9LOM3)
- [Cocos 论坛：gitee pages 下架了](https://forum.cocos.org/t/topic/157839/7)

因此推荐两种方式：

1. **Gitee 存代码 + 静态托管平台**：在 Cloudflare Pages（Direct Upload）、腾讯云 EdgeOne Pages、Vercel CLI 或 Netlify Drop 里直接上传整个目录，构建命令留空、输出目录填 `/` 即可。
2. **Gitee 存代码 + 自己的服务器**：把整个目录丢到 Nginx 的静态目录即可。

页面本身没有构建步骤，任何静态托管都能直接跑。

## 隐私

- 名字、纪念日、心愿、心情、信件存在 `localStorage`。
- 照片压缩后存在浏览器 `IndexedDB`，不会上传。
- 没有第三方统计、没有广告、没有外部字体和图片请求。
- 「清空所有数据」会同时清除 `localStorage` 和照片库，操作前建议先「导出备份」。

## License

MIT
