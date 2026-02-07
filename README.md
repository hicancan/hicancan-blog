<div align="center">

<img src="./public/favicon.svg" alt="Logo" width="100" height="100">

# Astro Nebula Blog

[![Astro](https://img.shields.io/badge/Astro-5.0-orange?style=flat-square&logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

[English](#english) | [中文](#chinese)

</div>

---

<a id="english"></a>

## 🚀 Introduction

**Astro Nebula Blog** is a modern, high-performance, and visually stunning personal blog template crafted with **Astro 5**, **React 19**, and **Tailwind CSS 4**. 

Designed for developers who value **design aesthetics**, **type safety**, and **cutting-edge performance**. It features a glassmorphic UI, smooth view transitions, and a robust content management system powered by Astro Content Collections.

### ✨ Features

- **⚡️ Blazing Fast Performance**: Built on Astro, shipping zero JavaScript by default (Islands Architecture).
- **🎨 Modern Aesthetics**: Glassmorphism design, dynamic nebula backgrounds, and smooth micro-interactions.
- **🔄 View Transitions**: Native-like navigation experience with Astro's Client Router.
- **🛠️ Type-Safe Content**: Robust content management using Zod schemas for Blogs, Projects, and Friends.
- **📱 Fully Responsive**: Correctly optimized for all devices, including a custom mobile menu.
- **🔌 Rich Integrations**:
  - **React 19**: For complex interactive components (e.g., Comments, Mobile Menu).
  - **Tailwind CSS 4**: Utilizing the latest CSS-first configuration (`@theme`).
  - **Giscus**: GitHub-powered comment system.
  - **KaTeX**: Mathematical typesetting support for technical articles.
- **🔎 SEO Optimized**: Built-in Sitemap, Canonical URLs, Open Graph tags, and JSON-LD.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm / npm / yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hicancan-blog.git
   cd hicancan-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## ⚙️ Configuration

The project is designed to be easily customizable.

### 1. Site Metadata
Edit `src/config.ts` to configure your site details:

```typescript
export const SITE_CONFIG: SiteConfig = {
    title: 'Your Blog Name',
    author: 'Your Name',
    description: 'Your site description...',
    site: 'https://your-site.com',
    social: {
        github: 'https://github.com/yourname',
        bilibili: '...',
    },
    // ...
};
```

### 2. Content Management
- **Blog Posts**: Add `.md` or `.mdx` files in `src/content/blog/`.
- **Projects**: Add `.json` files in `src/content/projects/`.
- **Friends**: Add `.json` files in `src/content/friends/`.

### 3. Deploy
This project is optimized for **GitHub Pages** (via GitHub Actions) or **Cloudflare Pages**.
See `.github/workflows/deploy.yml` for the CI/CD configuration.

## 📂 Project Structure

```text
├── src/
│   ├── components/    # UI Components (Common, Icons, Interactive)
│   ├── content/       # Markdown/JSON Content (Blog, Projects, Friends)
│   ├── layouts/       # Page Layouts
│   ├── lib/           # Utility Functions
│   ├── pages/         # File-based Routing
│   ├── styles/        # Global Styles & Typography
│   └── config.ts      # Global Configuration
├── public/            # Static Assets
└── astro.config.mjs   # Astro Configuration
```

---

<a id="chinese"></a>

## 🚀 简介

**Astro Nebula Blog** 是一个基于 **Astro 5**、**React 19** 和 **Tailwind CSS 4** 打造的现代化、高性能且视觉效果惊艳的个人博客模板。

专为追求**设计美学**、**类型安全**和**极致性能**的开发者设计。它拥有磨砂玻璃质感 (Glassmorphism) 的 UI、流畅的视图过渡动画，以及基于 Astro Content Collections 的强大内容管理系统。

### ✨ 核心特性

- **⚡️ 极致性能**: 基于 Astro 构建，默认零 JavaScript (群岛架构)，秒开体验。
- **🎨 现代美学**: 磨砂玻璃设计风格，动态星云背景，以及细腻的微交互动画。
- **🔄 视图过渡**: 使用 Astro Client Router 提供原生应用般的丝滑导航体验。
- **🛠️ 类型安全**: 使用 Zod Schema 对博客、项目和友链数据进行严格的类型检查。
- **📱 全端响应**: 完美适配各种设备，包含精心设计的移动端菜单。
- **🔌 丰富集成**:
  - **React 19**: 用于处理复杂的交互组件（如评论区、移动端菜单）。
  - **Tailwind CSS 4**: 采用最新的 CSS 优先配置方案 (`@theme`)。
  - **Giscus**: 基于 GitHub Discussions 的评论系统。
  - **KaTeX**: 完美支持数学公式渲染，适合技术博客。
- **🔎 SEO 优化**: 内置 Sitemap、规范 URL、Open Graph 标签和 JSON-LD。

## 🛠️ 快速开始

### 环境要求

- Node.js 18+
- pnpm / npm / yarn

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/hicancan-blog.git
   cd hicancan-blog
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **构建生产版本**
   ```bash
   npm run build
   ```

## ⚙️ 配置指南

本项目旨在让您能够轻松进行自定义配置。

### 1. 站点元数据
修改 `src/config.ts` 文件以配置您的站点信息：

```typescript
export const SITE_CONFIG: SiteConfig = {
    title: '您的博客名称',
    author: '您的昵称',
    description: '站点描述...',
    site: 'https://your-site.com',
    social: {
        github: 'https://github.com/yourname',
        bilibili: '...',
    },
    // ...
};
```

### 2. 内容管理
- **文章**: 在 `src/content/blog/` 目录下添加 `.md` 或 `.mdx` 文件。
- **项目**: 在 `src/content/projects/` 目录下添加 `.json` 文件。
- **友链**: 在 `src/content/friends/` 目录下添加 `.json` 文件。

### 3. 部署
本项目已针对 **GitHub Pages** (通过 GitHub Actions) 或 **Cloudflare Pages** 进行了优化。
查看 `.github/workflows/deploy.yml` 获取 CI/CD 配置详情。

## 📂 项目结构

```text
├── src/
│   ├── components/    # UI 组件 (Common, Icons, Interactive)
│   ├── content/       # 内容数据 (Markdown/JSON)
│   ├── layouts/       # 页面布局
│   ├── lib/           # 工具函数
│   ├── pages/         # 页面路由
│   ├── styles/        # 全局样式 & 排版
│   └── config.ts      # 全局配置
├── public/            # 静态资源
└── astro.config.mjs   # Astro 配置文件
```

---

<div align="center">

Made with ❤️ by [hicancan](https://github.com/hicancan)

</div>
