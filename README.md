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

文章保存在 `src/content/blog/`，可直接用 Markdown 编辑器打开；文章网址沿用原有 `/blog/<路径>/`。项目和友链分别在 `src/content/projects/`、`src/content/friends/`。文章图片位于 `src/content/media/`，正文使用相对路径，因此在本地编辑器和网站里都能显示。
