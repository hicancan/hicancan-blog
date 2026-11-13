# hicancan

个人文章与项目网站，基于 Astro 静态构建。

## 本地开发

```powershell
npm ci
npm run dev
```

## 验证

```powershell
npm run lint
npm run type-check
npm run build
npm run test
```

文章由 docstream（与 StuDev 网页、App、AI 共用的 Rust 文档内核）在构建时绘成 HTML：公式按 TeX 规则排版、Mermaid 图表在构建时布局，都是随主题变色的 SVG，浏览器里不再运行任何渲染脚本；代码由 Shiki 着色。

文章保存在 `src/content/blog/`，可直接用 Markdown 编辑器打开；文章网址沿用原有 `/blog/<路径>/`。项目和友链分别在 `src/content/projects/`、`src/content/friends/`。文章图片位于 `src/content/media/`，正文使用相对路径，因此在本地编辑器和网站里都能显示。
